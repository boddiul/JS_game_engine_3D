Controller = function () {

};

Controller.prototype = Object.create(ENGINE.GameObject.prototype);

Controller.prototype.init = function (params) {



    this.delay = 0;
}

Controller.prototype.update= function (dt) {

    this.delay-=dt;

    if (this.game.input.isKeyDown(ENGINE.KeyCode.SPACEBAR) && this.delay<0)
    {

        let data = {
            "type": "Rigid",
            "components" : {
                "transform" : {
                    "position" : [-100+Math.random()*200,600,-100+Math.random()*200]
                }

            }


        };


        if (Math.random()<0.5)
        {
            data.components.renderer = {
                "geometry":
                    {
                        "type":"SphereGeometry",
                        "size":100
                    },
                "material":
                    {
                        "type":"MeshBasicMaterial",
                        "texture":"marble"
                    }
            }

            data.components.rigidbody = {
                "move": true,
                "type": "sphere",
                "size":[100],
                "restitution": 1.1
            }

        }
        else
        {
            data.components.renderer = {
                "geometry":
                    {
                        "type":"BoxGeometry",
                        "size":[200,200,200]
                    },
                "material":
                    {
                        "type":"MeshBasicMaterial",
                        "texture":"marble"
                    }
            }

            data.components.rigidbody = {
                "move": true,
                "type": "box",
                "size":[200,200,200],
                "restitution": 1.1
            }
        }


        this.game.scene.entities.add(data)

        this.delay = 0.3;
    }


    this.game.ui.setOverlayText("PRESS SPACE TO SPAWN OBJECT")
}

Controller.prototype.constructor = Controller;
ENGINE.scripts["Controller"] = Controller;