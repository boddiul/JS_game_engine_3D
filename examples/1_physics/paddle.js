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
        this.rigidbody.setRotation(r.x-this.rotationSpeed*dt,r.y,r.z);
    }

    if (this.game.input.isKeyDown(ENGINE.KeyCode.UP))
    {
        this.rigidbody.setRotation(r.x,r.y,r.z+this.rotationSpeed*dt);

    }
    if (this.game.input.isKeyDown(ENGINE.KeyCode.DOWN))
    {
        this.rigidbody.setRotation(r.x,r.y,r.z-this.rotationSpeed*dt);
    }
}

Paddle.prototype.constructor = Paddle;
ENGINE.scripts["Paddle"] = Paddle;