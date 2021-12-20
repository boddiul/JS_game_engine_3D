Cube = function () {

    this.xRotation = 0;
    this.yRotation = 0;
    this.zRotation = 0;

};

Cube.prototype = Object.create(ENGINE.GameObject.prototype);

Cube.prototype.init = function (params) {


    this.xRotation = params.xRotation;
    this.yRotation = params.yRotation;
    this.zRotation = params.zRotation;

    this.createRendererComponent({
        geometry:
            {
                type:"BoxGeometry",
                size:[200,200,200]
            },
        material:
            {
                type:"MeshBasicMaterial",
                texture:"crate"
            }

    });


}

Cube.prototype.update= function (dt) {

    this.transform.getRotation().x += this.xRotation*dt*60;
    this.transform.getRotation().y += this.yRotation*dt*60;
    this.transform.getRotation().z += this.zRotation*dt*60;


}

Cube.prototype.constructor = Cube;
ENGINE.scripts["Cube"] = Cube;