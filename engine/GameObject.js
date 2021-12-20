
ENGINE.GameObject = function(game,manager,typeId,id) {




    this.game = game;
    this.manager = manager;
    this.typeId = typeId;



    this.id = id;


    this.transform = null;
    this.renderer = null;
    this.collider = null;
    this.rigidbody = null;


}


ENGINE.GameObject.prototype = {



    init : function (components) {



        if (components!==undefined)
        {




            this.transform = this.game.scene.components.add("transform",this,components.transform);



            if (typeof(components.renderer)!=="undefined")
                this.renderer = this.createRendererComponent(components.renderer);

            if (typeof(components.rigidbody)!=="undefined")
                this.renderer = this.createRigidbodyComponent(components.rigidbody);
        }
        else
        {
            this.transform = this.game.scene.components.add("transform",this, {});
        }




    },

    getType : function() {
        return this.typeId;
    },

    update : function (dt) {

    },


    createRendererComponent : function (data) {

        this.renderer = this.game.scene.components.add("renderer",this,data);
    },

    createRigidbodyComponent : function (data) {

        this.rigidbody = this.game.scene.components.add("rigidbody",this,data);
    }

}

ENGINE.GameObject.prototype.constructor = ENGINE.GameObject;
