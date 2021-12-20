ENGINE.ComponentRigidbody = function (game,manager,gameObject,data) {
    ENGINE.Component.call(this,game,manager,gameObject);



    console.log("RIGID")

    /*
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
    }*/

    //this.game.scene._threeScene.add( this._threeTransform );

    let t  = this.gameObject.transform.getPosition();

    data.pos = [t.x, t.y, t.z];

    let r  = this.gameObject.transform.getRotation();

    data.rot = [r.x/Math.PI*180, r.y/Math.PI*180, r.z/Math.PI*180];

    console.log(data);


    this.phys = this.game.scene.physics.add(data);


    this.setRotation = function (x,y,z) {


        this.phys.resetRotation(x*180/Math.PI,y*180/Math.PI,z*180/Math.PI);


        /*
        let r = (new THREE.Euler(x,y,z))
        let q = (new THREE.Quaternion()).setFromEuler(r);
        this.phys.setQuaternion({x:q.x, y:q.y, z:q.z, w:q.w})*/

    }
    this.getRotation = function () {



        let q = new THREE.Quaternion(this.phys.quaternion.x,this.phys.quaternion.y,this.phys.quaternion.z,this.phys.quaternion.w);

        let r = (new THREE.Euler()).setFromQuaternion(q);


        return r;
    }
};

ENGINE.ComponentRigidbody.prototype = Object.create(ENGINE.Component.prototype);


ENGINE.ComponentRigidbody.prototype.update= function (dt) {



    let t = this.phys.position;

    this.gameObject.transform.setPosition(t.x,t.y,t.z);


    let q = this.phys.quaternion;

    this.gameObject.transform.setQuaternion(q.x,q.y,q.z,q.w);
}


ENGINE.ComponentRigidbody.prototype.postUpdate= function () {

}

ENGINE.ComponentRigidbody.prototype.constructor = ENGINE.ComponentRigidbody;
