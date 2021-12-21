
ENGINE.GameObject = function(game,manager,typeId,id) {




    this.game = game;
    this.manager = manager;
    this.typeId = typeId;



    this.id = id;


    this.transform = null;
    this.renderer = null;
    this.collider = null;
    this.rigidbody = null;


    this.toDestroy = false;
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

            if (typeof(components.collider)!=="undefined")
                this.collider = this.createColliderComponent(components.collider);
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

    destroy : function() {

        this.toDestroy = true;
    },


    onDestroy : function() {

        if (this.renderer)
            this.renderer.manager.destroy("renderer",this.renderer);

        if (this.collider)
            this.collider.manager.destroy("collider",this.collider);

        if (this.transform)
            this.transform.manager.destroy("transform",this.transform);

        if (this.rigidbody)
            this.rigidbody.manager.destroy("rigidbody",this.rigidbody);
    },
    createRendererComponent : function (data) {

        this.renderer = this.game.scene.components.add("renderer",this,data);
    },

    createRigidbodyComponent : function (data) {

        this.rigidbody = this.game.scene.components.add("rigidbody",this,data);
    },

    createColliderComponent : function (data) {

        this.collider = this.game.scene.components.add("collider",this,data);
    }

}

ENGINE.GameObject.prototype.constructor = ENGINE.GameObject;
