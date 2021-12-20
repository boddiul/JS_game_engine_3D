Paddle = function () {

};

Paddle.prototype = Object.create(ENGINE.GameObject.prototype);

Paddle.prototype.init = function (params) {

    this.rotationSpeed = params.rotationSpeed;


}

Paddle.prototype.update= function (dt) {



    let r = this.rigidbody.getRotation();


    let changed = false;



    if (this.game.input.isKeyDown(ENGINE.KeyCode.LEFT))
    {
        r.x+=this.rotationSpeed*dt;
        changed = true;

    }
    if (this.game.input.isKeyDown(ENGINE.KeyCode.RIGHT))
    {
        r.x-=this.rotationSpeed*dt;
        changed = true;
    }

    if (this.game.input.isKeyDown(ENGINE.KeyCode.UP))
    {
        r.z+=this.rotationSpeed*dt;
        changed = true;

    }
    if (this.game.input.isKeyDown(ENGINE.KeyCode.DOWN))
    {
        r.z-=this.rotationSpeed*dt;
        changed = true;
    }

    if (changed)
        this.rigidbody.setRotation(r.x,r.y,r.z);
}

Paddle.prototype.constructor = Paddle;
ENGINE.scripts["Paddle"] = Paddle;