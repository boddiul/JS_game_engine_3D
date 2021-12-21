
ENGINE.ComponentManager = function (game,scene)
{


    this.game = game;
    this.scene = scene;


    this.components = {
        "transform":[],
        "renderer":[],
        "rigidbody":[],
        "collider":[]
    };



}

ENGINE.ComponentManager.prototype = {

    add: function(componentType,gameObject,initData) {



        let c = null;
        switch (componentType) {

            case "transform":
                c = new ENGINE.ComponentTransform(this.game,this,gameObject,initData);
                break;
            case "renderer":

                c = new ENGINE.ComponentRenderer(this.game,this,gameObject,initData);
                break;
            case "rigidbody":

                c = new ENGINE.ComponentRigidbody(this.game,this,gameObject,initData);
                break;
            case "collider":

                c = new ENGINE.ComponentCollider(this.game,this,gameObject,initData);
                break;
        }


        this.components[componentType].push(c);

        return c;
    },


    update: function (dt) {


        this.components["transform"].forEach(function (c) {
            c.update(dt)
        })


        this.components["renderer"].forEach(function (c) {
            c.update(dt)
        })


        this.components["rigidbody"].forEach(function (c) {
            c.update(dt)
        })

        this.components["collider"].forEach(function (c) {
            c.update(dt)
        })

        this.components["collider"].forEach(function (c) {
            c.updateCollisions()
        })
    },

    destroy : function (componentType,component) {
        let index = this.components[componentType].indexOf(component);
        if (index !== -1) {
            this.components[componentType].splice(index, 1);
            component.onDestroy();
        }
    }

}

ENGINE.ComponentManager.prototype.constructor = ENGINE.EntityManager;
