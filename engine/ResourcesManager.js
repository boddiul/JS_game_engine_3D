ENGINE.ResourcesManager = function (game)
{

    this.game = game;

    this.mesh = {};
    this.sound = {};
    this.obj = {};

    this.scene = {};
    this.script = {};


    this.package = null;

    this.totalToLoad = 0;
    this.loaded = 0;
    this.onLoadComplete = null;


    this.editorFiles = {};
}

ENGINE.ResourcesManager.prototype = {


    loadOBJ : function(id,url) {

        this.game.rendererSend({action:"loadOBJ",args:{id:id,url:url}});

    },




    loadTexture : function(id,url) {


        this.game.rendererSend({action:"loadTexture",args:{id:id,url:url}});

    },


    setEditorFiles : function(editorFiles)
    {
        this.editorFiles = editorFiles;

    },

    reloadScripts : function(onComplete)
    {
        this.onLoadComplete = onComplete;
        this.totalToLoad = this.package["scripts"].length;
        this.loaded = 0;

        this.package["scripts"].forEach(function (s) {
            this.loadScript(s["id"],s["url"])
        }.bind(this));
    },

    loadSceneData : function(id,url) {


        let fileName = url.substring(url.lastIndexOf("/")+1, url.length);


        if (fileName in this.editorFiles)
        {

            this.scene[id] = JSON.parse(this.editorFiles[fileName]);

            console.log(this.scene[id])

            this.updateProgress();
        }
        else
        {

            $.getJSON(url, function(data) {

                this.scene[id] = data;
                this.updateProgress();

            }.bind(this)).fail(function(){
                console.log("Scene "+id+" loading failed");
            });
        }

    },

    getSceneData : function(id)
    {
        return this.scene[id];
    },


    loadSound : function(id,url) {

    },

    loadScript : function(id,url) {


        let fileName = url.substring(url.lastIndexOf("/")+1, url.length);


        if (fileName in this.editorFiles)
        {

            if (id in this.script)
                this.script[id].remove();

            this.script[id] = document.createElement('script');
            this.script[id].type = 'text/javascript';
            this.script[id].text = this.editorFiles[fileName];
            document.head.appendChild(this.script[id]);

            this.updateProgress();

        }
        else
        {

            this.script[id] = document.createElement('script');

            this.script[id].type = 'text/javascript';
            this.script[id].src = url;


            document.head.appendChild(this.script[id]);

            /*this.script[id].onreadystatechange =*/ this.script[id].onload = this.updateProgress.bind(this);

        }


    },

    updateProgress:function () {

        this.loaded+=1;
        console.log("LOADING RESOURCES "+this.loaded + "/" + this.totalToLoad)
        if (this.loaded>=this.totalToLoad)
        {
            this.onLoadComplete();

        }
    },

    loadPackage : function (url,onComplete) {


        $.getJSON(url, function(data){


            if (! ("OBJ" in data))
                data["OBJ"] = [];

            if (! ("textures" in data))
                data["textures"] = [];

            if (! ("scenes" in data))
                data["scenes"] = [];

            if (! ("scripts" in data))
                data["scripts"] = [];

            this.package = data;


            this.totalToLoad = data["OBJ"].length+data["textures"].length+data["scenes"].length+data["scripts"].length;
            this.loaded = 0;
            this.onLoadComplete = onComplete;


            data["OBJ"].forEach(function (t) {
                this.loadOBJ(t["id"],t["url"])
            }.bind(this));

            data["textures"].forEach(function (t) {
                this.loadTexture(t["id"],t["url"])
            }.bind(this));


            data["scenes"].forEach(function (s) {
                this.loadSceneData(s["id"],s["url"])
            }.bind(this));

            data["scripts"].forEach(function (s) {
                this.loadScript(s["id"],s["url"])
            }.bind(this));


        }.bind(this)).fail(function(){
            console.log("Package "+url+" loading failed");
        });

    }
}
ENGINE.ResourcesManager.prototype.constructor = ENGINE.ResourcesManager;


