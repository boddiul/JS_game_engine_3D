import RenderController from "./RenderController.js";

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

ENGINE.Game = function(loopType) {
    this.resources = null;
    this.scene = null;
    this.camera = null;

    this.input = null;

    this.ui = null;

    this.renderer = null;
    this.worker = null;

    this.debug = {
        isActive : false,
        isCamera : false
    }

    this.window = {
        x:0,y:0,w:330,h:330
    }



    this.domElement = document.getElementsByClassName("game")[0];

    this.canvas = document.createElement("canvas");
    this.canvas.className = 'canvas3d';
    this.canvas.oncontextmenu = function(e){ e.preventDefault(); };
    this.canvas.ondrop = function(e) { e.preventDefault(); };
    this.domElement.appendChild( this.canvas );

    this.stats = new Stats();
    this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    this.stats.domElement.style.left = null;
    this.stats.domElement.style.right = '0';
    this.domElement.appendChild( this.stats.dom );


    //this._threeRenderer = null;



    if (navigator.userAgent.indexOf("Firefox") > 0 || typeof OffscreenCanvasRenderingContext2D !== "function")
        loopType = ENGINE.Game.SIMPLE_LOOP;

    this.loopType = loopType;

    this.clock = null;

    this.lastId = 0;

    this.updating = false;

    this.renderActive = false;

}

ENGINE.Game.SIMPLE_LOOP = 0;
ENGINE.Game.ADVANCED_LOOP = 1;


ENGINE.Game.prototype = {

    boot : function (onComplete) {

        this.lastId = 0;

        this.updating = false;

        this.onBootComplete = onComplete;


        let firstLoad = this.resources===null;


        if (this.resources===null)
            this.resources = new ENGINE.ResourcesManager(this);

        if (this.camera===null)
            this.camera = new ENGINE.Camera(this);

        if (this.scene===null)
            this.scene = new ENGINE.Scene(this);

        if (this.input===null)
            this.input = new ENGINE.Input(this);
        if (this.ui===null)
            this.ui = new ENGINE.UI(this);


        this.updateWindowSize();

        if (this.loopType===ENGINE.Game.SIMPLE_LOOP)
        {

            if (this.renderer == null)
            {
                this.renderer = new RenderController();


                this.rendererSend( {
                    action:"boot",
                    args: {
                        game:this,
                        drawingSurface: this.canvas,
                        width: this.window.w,
                        height: this.window.h,
                        pixelRatio: this.window.devicePixelRatio,
                        path: './'}
                });
            }
            else
                this.stopRender();




        }
        else if (this.loopType===ENGINE.Game.ADVANCED_LOOP)
        {
            if (this.worker == null)
            {
                this.worker = new Worker( 'engine/WorkerRender.js', { type: 'module' });
                this.worker.addEventListener("message",this.rendererReceive.bind(this));

                const offscreen = this.canvas.transferControlToOffscreen();

                this.rendererSend( {
                    action:"boot",
                    args: {
                        drawingSurface: offscreen,
                        width: this.window.w,
                        height: this.window.h,
                        pixelRatio: this.window.devicePixelRatio,
                        path: '../'}
                }, [ offscreen ] );
            }
            else
                this.stopRender();


        }


        if (this.input===null)
        {

        }


        if (firstLoad)
        {
            window.addEventListener( 'resize', this.onWindowResize.bind(this) );

        }
        else
        {
            this.onBootComplete();

        }



    },

    setDebugActive : function(d){
        this.debug.isActive = d;
    },

    setDebugCameraActive : function(d){
        this.debug.isCamera = d;

        this.camera.setDebugMode(d);

    },

    resetDebugCamera : function() {
        if (this.debug.isCamera)
            this.camera.initDebug();
    },



    init : function (sceneId) {



        if (this.renderActive)
            this.stopRender();

        this.updating = false;
        this.rendererSend({action:"init"});



        if (this.debug.isCamera)
            this.camera.initDebug();
        else
            this.camera.init();

        this.scene.init(sceneId);



        this.clock = new THREE.Clock();



        this.scene.update(0);

        //this.rendererSend({action:"render"})



        if (this.loopType===ENGINE.Game.SIMPLE_LOOP)
        {
            this.rendererSend({action:"render"});
        }
        else if (this.loopType===ENGINE.Game.ADVANCED_LOOP)
        {


            this.renderComplete = true;
            this.updateComplete = false;
            this.update();


        }

        this.renderActive = true;
    },

    start : function () {



        this.updating = true;

        console.log(ENGINE.scripts);


    },


    pause : function() {

        this.updating = false;

    },
    stopRender : function() {


        console.log("STOPPING RENDER")
        this.rendererSend({action:"stop"})
        this.renderActive = false;
    },
    hotReload : function() {


        let initUpdating = this.updating;
        this.updating = false;

        this.resources.reloadScripts(function () {

            this.scene.entities.hotReload();

            if (initUpdating)
                this.updating = true;
        }.bind(this));
    },

    update : function () {

        this.stats.end();
        this.stats.begin();

        let dt = this.clock.getDelta();

        this.input.update(dt);


        this.camera.update(dt);
        if (this.updating)
            this.scene.update(dt);


        this.ui.update(dt);
        /*
        let number  =0;
        for (let i = 0; i < 2000000; i ++ ) {
            number += Math.random();
        }*/


        if (this.loopType===ENGINE.Game.SIMPLE_LOOP)
        {
            this.rendererSend({action:"render"});
        }
        else if (this.loopType===ENGINE.Game.ADVANCED_LOOP)
        {



            if (this.renderComplete)
            {

                this.renderComplete = false;
                this.updateComplete = false;
                this.rendererSend({action:"render"});
                this.update();
            }
            else
            {
                this.updateComplete = true;
            }


        }

    },


    updateWindowSize : function() {

        let b = this.canvas.getBoundingClientRect();

        this.window.x = b.left;
        this.window.y = b.top;

        this.window.h = b.height;
        this.window.w = b.width;
    },

    onWindowResize : function() {

        this.updateWindowSize();


        this.camera.onWindowResize(this.window.w,this.window.h);
        this.rendererSend( {
            action:"setRendererSize",
            args: {
                width: this.window.w,
                height: this.window.h}
        } );

    },

    rendererSend : function (message,transfer) {

        if (this.loopType===ENGINE.Game.SIMPLE_LOOP)
        {

            this.renderer.mainReceive(message);
        }
        else if (this.loopType===ENGINE.Game.ADVANCED_LOOP)
        {

            this.worker.postMessage(message,transfer);
        }


    },
    rendererReceive : function (messageEvent) {


        let message;
        if (this.loopType===ENGINE.Game.SIMPLE_LOOP)
        {
            message = messageEvent;
        }
        else if (this.loopType===ENGINE.Game.ADVANCED_LOOP)
        {
            message = messageEvent.data;
        }




        switch (message.action)
        {
            case "signalRendererResourceLoaded":
                this.resources.updateProgress();
                break;
            case "signalRendererBootComplete":

                this.onBootComplete();
                break;
            case "signalRenderComplete":

                if (this.loopType===ENGINE.Game.SIMPLE_LOOP)
                {
                    this.update();
                }
                else if (this.loopType===ENGINE.Game.ADVANCED_LOOP)
                {
                    if (this.updateComplete)
                    {

                        this.renderComplete = false;
                        this.updateComplete = false;
                        this.rendererSend({action:"render"});
                        this.update();
                    }
                    else
                    {
                        this.updateComplete = true;
                    }
                }


                break;


        }


    }



}

ENGINE.Game.prototype.constructor = ENGINE.Game;
