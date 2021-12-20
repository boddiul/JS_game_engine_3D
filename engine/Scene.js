
ENGINE.Scene = function (game)
{

    this.id = null;

    this.game = game;


    //this.gameObjects = null;


    this.entities = null;
    this.components = null;

    this.physics = null;


}

ENGINE.Scene.prototype = {


    init : function (sceneId) {




        this.id = sceneId;
        this.entities = new ENGINE.EntityManager(this.game,this);
        this.components = new ENGINE.ComponentManager(this.game,this);


        let data = this.game.resources.getSceneData(sceneId);



        if (typeof (data.settings.backgroundColor) !=="undefined")
            this.setBackgroundColor(data.settings.backgroundColor);


        let p = {
            timeStep: 1/60,
            iterations: 8,
            broadphase: 2, // 1: brute force, 2: sweep & prune, 3: volume tree
            worldscale: 1,
            random: true,
        }

        if (typeof (data.settings.physics) !=="undefined")
        {
            p.gravity = data.settings.physics.gravity;
        }

        this.physics = new OIMO.World(p);


        data["objects"].forEach(function (oData) {

            this.entities.add(oData);

        }.bind(this))


    },


    setBackgroundColor : function(color) {

        this.game.rendererSend({action:"setBackgroundColor",args:{color:color}})
    },



    update : function (dt) {

        //console.log(dt);
        this.physics.step(dt);


        this.entities.update(dt);
        this.components.update(dt);


    }



}
ENGINE.Scene.prototype.constructor = ENGINE.Scene;



