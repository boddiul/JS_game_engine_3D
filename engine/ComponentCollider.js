ENGINE.ComponentCollider= function (game,manager,gameObject,data) {
    ENGINE.Component.call(this,game,manager,gameObject);



    this.box = new THREE.Box3();

    this.collisions = [];

    this.updateCollisions = function () {

    }

    this.getCollisions = function () {

        return this.collisions;
    }
};

ENGINE.ComponentCollider.prototype = Object.create(ENGINE.Component.prototype);


ENGINE.ComponentCollider.prototype.update= function (dt) {

    

}

ENGINE.ComponentCollider.prototype.onDestroy= function () {

}
ENGINE.ComponentCollider.prototype.constructor = ENGINE.ComponentTransform;
