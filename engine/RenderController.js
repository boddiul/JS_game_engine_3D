import * as THREE from './min_libs/three.module.min.js';


import { DDSLoader } from './three/DDSLoader.js';
import { MTLLoader } from './three/MTLLoader.js';
import { OBJLoader } from './three/OBJLoader.js';




function RenderController() {


    this.isWorker = true;
    this.game = null;
    this.stopping = false;

    this.texture = {};
    this.OBJ = {};

    this.path = null;

    this.loadOBJ = function (args) {

        let l = new OBJLoader();
        l.setPath(this.path);

        l.load(args.url ,function (object) {
            this.OBJ[args.id] = object;
            this.mainSend({action:"signalRendererResourceLoaded"});
        }.bind(this) );
    }

    this.loadTexture = function (args) {

        let l = this.isWorker ? new THREE.ImageBitmapLoader() : new THREE.TextureLoader();
        l.setPath(this.path);

        l.load(args.url ,function (texture) {

            console.log(args.url)
            this.texture[args.id] = this.isWorker ?  new THREE.CanvasTexture( texture) :texture ;
            this.mainSend({action:"signalRendererResourceLoaded"});
        }.bind(this) );
    }

    var camera, scene, renderer, group;


    this.object = {};

    this.boot = function(data){


        if (typeof(data.game) !== "undefined")
        {
            this.game = data.game;
            this.isWorker = false;
        }



        this.canvas = data.drawingSurface;

        this.width = data.width;

        this.height = data.height;

        this.pixelRatio = data.pixelRatio;

        this.path = data.path;



        this.init();


        this.renderer = new THREE.WebGLRenderer( { antialias: true, canvas: this.canvas } );
        this.renderer.setPixelRatio( this.pixelRatio );
        this.renderer.setSize( this.width, this.height, false );



        this.mainSend({action:"signalRendererBootComplete"})

    }

    this.init = function () {

        this.object = {};
        this.scene = new THREE.Scene();
        this.object["camera"] = new THREE.PerspectiveCamera( 40, this.width / this.height, 1, 1000 );

    }


    this.setPerspectiveCamera = function (args) {

        this.object["camera"] = new THREE.PerspectiveCamera(args.fov, args.aspect,args.near, args.far);


    }


    this.stop = function () {
        this.stopping = true;
    }

    this.objectLookAt = function (args) {


        this.object[args.id].lookAt(args.x,args.y,args.z);
    }

    this.setObjectPosition = function (args) {


        this.object[args.id].position.set(args.x,args.y,args.z);
    }

    this.setObjectQuaternion = function (args) {


        this.object[args.id].quaternion.set(args.x,args.y,args.z,args.w);
    }

    this.setObjectScale = function (args) {


        this.object[args.id].scale.set(args.x,args.y,args.z);
    }


    this.setAspectCamera = function (args) {

        this.object["camera"].aspect = args.aspect;
        this.object["camera"].updateProjectionMatrix();


    }

    this.addObject = function (args) {


        let material = null;
        switch(args.data.material.type)
        {
            case "MeshBasicMaterial":

                let params = {};
                if (typeof(args.data.material.texture)!=="undefined")
                {
                    params.map = this.texture[args.data.material.texture];
                }

                if (typeof(args.data.material.color)!=="undefined")
                {
                    params.color = new THREE.Color(args.data.material.color);
                }




                material = new THREE.MeshBasicMaterial( params);
                break;

        }


        if (args.data.geometry.type==="OBJGeometry")
        {

            let newObj = this.OBJ[args.data.geometry.OBJ];

            newObj.traverse( function ( child ) {

                if ( child.isMesh ) child.material = material;

            } );


            this.object[args.id] = newObj;
        }
        else
        {
            let geometry = null;
            switch(args.data.geometry.type)
            {
                case "BoxGeometry":
                    geometry = new THREE.BoxGeometry( args.data.geometry.size[0], args.data.geometry.size[1], args.data.geometry.size[2] );
                    break;
                case "SphereGeometry":
                    geometry = new THREE.SphereGeometry( args.data.geometry.size ,32,32);
                    break;
            }
            this.object[args.id] = new THREE.Mesh( geometry, material );

        }





        this.scene.add(this.object[args.id]);
    }


    this.removeObject = function (args) {



        this.scene.remove(this.object[args.id]);
        delete this.object[args.id];
    }


    this.render = function () {



        this.renderer.render( this.scene, this.object["camera"] );


        /*
        let number  =0;
        for (let i = 0; i < 2000000; i ++ ) {
            number += Math.random();
        }*/

        requestAnimationFrame(function () {


            if (this.stopping)
            {
                this.stopping = false;
            }
            else
                this.mainSend({action:"signalRenderComplete"})
        }.bind(this))
    }


    this.setRendererSize = function(args)
    {

        //this.renderer.setPixelRatio( args.width/args.height*0.5 );
        this.renderer.setSize(args.width, args.height,false);
    }

    this.setBackgroundColor = function(args) {

        this.scene.background = new THREE.Color(args.color);
    }

    this.mainSend = function (message) {

        if (this.isWorker)
        {
           self.postMessage(message);
        }
        else
        {

            this.game.rendererReceive(message)
        }
    }

    this.mainReceive = function (message) {
        this[message.action](message.args);
    }


}



export default RenderController;
