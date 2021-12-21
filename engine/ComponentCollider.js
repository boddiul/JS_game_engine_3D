ENGINE.ComponentCollider= function (game,manager,gameObject,data) {
    ENGINE.Component.call(this,game,manager,gameObject);


    this.box = new THREE.Box3();

    this.size = data.size;

    this.collisions = [];

    this.collidesType = {};

    this.collidesObjectByType = function (typeId) {

        return (typeId in this.collidesType);
    }

    this.updateCollisions = function () {


        this.collidesType = {};
        this.collisions = [];

        this.manager.components["collider"].forEach(function (o) {

            if (this.box.intersectsBox(o.box))
            {
                this.collisions.push(o.gameObject);
                this.collidesType[o.gameObject.typeId] = true;
            }
        }.bind(this))
    }

    this.getCollisions = function () {

        return this.collisions;
    }
};

ENGINE.ComponentCollider.prototype = Object.create(ENGINE.Component.prototype);


ENGINE.ComponentCollider.prototype.update= function (dt) {


    let p = this.gameObject.transform.getPosition();
    this.box = new THREE.Box3(new THREE.Vector3(p.x-this.size/2,p.y-this.size/2,p.z-this.size/2),new THREE.Vector3(p.x+this.size/2,p.y+this.size/2,p.z+this.size/2))

}

ENGINE.ComponentCollider.prototype.onDestroy= function () {

}
ENGINE.ComponentCollider.prototype.constructor = ENGINE.ComponentTransform;
