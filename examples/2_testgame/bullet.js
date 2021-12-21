Bullet = function () {


};

Bullet.prototype = Object.create(ENGINE.GameObject.prototype);

Bullet.prototype.init = function (params) {


    this.createRendererComponent({
        geometry:
            {
                type:"SphereGeometry",
                size:3
            },
        material:
            {
                type:"MeshBasicMaterial",
                color:"white"
            }
    });


    this.direction = new THREE.Vector3(params.direction[0],params.direction[1],params.direction[2])

    this.speed = params.speed;
    this.destroyTime = 2;

}

Bullet.prototype.update= function (dt) {



    let p = this.transform.getPosition();


    let m = new THREE.Vector3().copy(this.direction).multiplyScalar(this.speed*dt);
    p.add(m);

    this.transform.setPosition(p.x,p.y,p.z);



    this.destroyTime-=dt;
    if (this.destroyTime<0)
        this.destroy();
}

Bullet.prototype.constructor = Bullet;
ENGINE.scripts["Bullet"] = Bullet;