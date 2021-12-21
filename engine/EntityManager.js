
ENGINE.EntityManager = function (game,scene)
{

    this.lastEntityId = 0;

    this.game = game;
    this.scene = scene;

    this.objects = [];
}

ENGINE.EntityManager.prototype = {

    add: function(initData) {

        let o = null;

        this.lastEntityId +=1;
        let newId = "o"+this.lastEntityId


        if (initData.type in ENGINE.scripts)
        {

            o = new ENGINE.scripts[initData.type]();
            ENGINE.GameObject.call(o,this.game,this,initData.type,newId);

        }
        else
        {
            o = new ENGINE.GameObject(this.game,this,initData.type,newId);
        }


        ENGINE.GameObject.prototype.init.call(o,initData.components);
        if (o.init !== ENGINE.GameObject.prototype.init)
            o.init(initData.params);

        this.objects.push(o);
        return o;
    },

    update : function (dt) {


        this.objects.forEach(function (o) {
            ENGINE.GameObject.prototype.update.call(o,dt);

            if (o.update !== ENGINE.GameObject.prototype.update)
                o.update(dt);
        });


        let checkObject = this.objects.slice();

        checkObject.forEach(function (o) {

            if (o.toDestroy)
            {
                let index = this.objects.indexOf(o);
                if (index !== -1) {
                    this.objects.splice(index, 1);
                }

                ENGINE.GameObject.prototype.onDestroy.call(o,dt);
            }

        }.bind(this));
    },


    getAll : function()
    {
        return this.objects;
    },

    hotReload : function () {

        for (const [key, obj] of Object.entries(this.objects)) {

            if (obj.getType() in ENGINE.scripts)
            {
                obj.init = (ENGINE.scripts[obj.getType()].prototype.init).bind(obj);
                obj.update = (ENGINE.scripts[obj.getType()].prototype.update).bind(obj);
            }
        }

    }
}

ENGINE.EntityManager.prototype.constructor = ENGINE.EntityManager;
