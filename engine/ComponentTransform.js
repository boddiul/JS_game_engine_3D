ENGINE.ComponentTransform = function (game,manager,gameObject,data) {
    ENGINE.Component.call(this,game,manager,gameObject);



    this._threeTransform = new THREE.Object3D();

    if (data!==undefined)
    {
        if (data.position!==undefined)
        {
            this._threeTransform.position.set(data.position[0],data.position[1],data.position[2]);
        }
        if (data.rotation!==undefined)
        {
            this._threeTransform.rotation.set(data.rotation[0],data.rotation[1],data.rotation[2]);
        }
        if (data.scale!==undefined)
        {
            this._threeTransform.scale.set(data.scale[0],data.scale[1],data.scale[2]);
        }
    }

    //this.game.scene._threeScene.add( this._threeTransform );


    this.getRotation = function () {
        return this._threeTransform.rotation;
    }

    this.setRotation = function (x,y,z) {
        this._threeTransform.rotation.set(x,y,z);


        /*
        if (this.gameObject.rigidbody)
            this.gameObject.rigidbody.copy();*/
    }

    this.getPosition = function () {
        return this._threeTransform.position;
    }

    this.getQuaternion = function () {
        return this._threeTransform.quaternion;
    }

    this.setQuaternion = function (x,y,z,w) {
        this._threeTransform.quaternion.set(x,y,z,w);

/*
        if (this.gameObject.rigidbody)
            this.gameObject.rigidbody.copy();*/
    }

    this.setPosition = function (x,y,z) {
        this._threeTransform.position.set(x,y,z);

/*
        if (this.gameObject.rigidbody)
            this.gameObject.rigidbody.copy();*/
    }


    this.getScale = function () {
        return this._threeTransform.scale;
    }

    this.setScale = function (x,y,z) {
        this._threeTransform.scale.set(x,y,z);
    }
};

ENGINE.ComponentTransform.prototype = Object.create(ENGINE.Component.prototype);


ENGINE.ComponentTransform.prototype.update= function (dt) {

}

ENGINE.ComponentTransform.prototype.postUpdate= function () {

}

ENGINE.ComponentTransform.prototype.constructor = ENGINE.ComponentTransform;
