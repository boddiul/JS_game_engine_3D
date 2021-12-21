Box = function () {


};

Box.prototype = Object.create(ENGINE.GameObject.prototype);

Box.prototype.init = function (params) {


    this.createRendererComponent({
        geometry:
            {
                type:"BoxGeometry",
                size:[params.size,params.size,params.size]
            },
        material:
            {
                type:"MeshBasicMaterial",
                texture:"crate"
            }
    });

    this.createColliderComponent({size:params.size})


}

Box.prototype.update= function (dt) {


    if (this.collider.collidesObjectByType("Bullet"))
        this.destroy();


}

Box.prototype.constructor = Box;
ENGINE.scripts["Box"] = Box;