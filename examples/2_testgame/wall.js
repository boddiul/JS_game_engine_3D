Wall = function () {


};

Wall.prototype = Object.create(ENGINE.GameObject.prototype);

Wall.prototype.init = function (params) {


    this.createRendererComponent({
        geometry:
            {
                type:"BoxGeometry",
                size:[params.size,params.size,params.size]
            },
        material:
            {
                type:"MeshBasicMaterial",
                texture:"wall"
            }
    });


    /*

    this.createRigidbodyComponent({
        "move": false,
        "type": "box",
        "size":[params.size,params.size,params.size]

    })*/
}

Wall.prototype.update= function (dt) {




}

Wall.prototype.constructor = Wall;
ENGINE.scripts["Wall"] = Wall;