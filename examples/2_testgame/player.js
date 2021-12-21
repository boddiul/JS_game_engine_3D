Player = function () {

};

Player.prototype = Object.create(ENGINE.GameObject.prototype);

Player.prototype.init = function (params) {


    /*
    this.createRigidbodyComponent({
        "kinematic":true,
        "move":true,
        "density":1,
        "type": "sphere",
        "size":[10]
    });


    this.createRendererComponent({
        geometry:
            {
                type:"BoxGeometry",
                size:[10,50,20]
            },
        material:
            {
                type:"MeshBasicMaterial",
                color:"blue"
            }
    })*/

    this.direction = 90;
    this.rotationSpeed = 180;
    this.moveSpeed = 5;
    this.reload = 0;
}

Player.prototype.update= function (dt) {




    let p = this.transform.getPosition();
    let v = new THREE.Vector3(p.x,p.y,p.z);



    if (this.game.input.isKeyDown(ENGINE.KeyCode.LEFT))
    {
        this.direction+=this.rotationSpeed*dt;
    }
    if (this.game.input.isKeyDown(ENGINE.KeyCode.RIGHT))
    {
        this.direction-=this.rotationSpeed*dt;
    }


    [[ENGINE.KeyCode.UP,[1,0,0]],
        //[ENGINE.KeyCode.RIGHT,[0,0,-1]],
        //[ENGINE.KeyCode.LEFT,[0,0,1]],
        [ENGINE.KeyCode.DOWN,[-1,0,0]]].forEach(function (p) {

        if (this.game.input.isKeyDown(p[0]))
        {
            /*let dd = (new THREE.Vector3(p[1][0]*this.dist*dt,p[1][1]*this.dist*dt,p[1][2]*this.dist*dt));
            dd.applyAxisAngle( new THREE.Vector3( 0, 1, 0 ), this.posW*Math.PI/2 );
            this.centerPos.add(dd);*/

            let dd = (new THREE.Vector3(p[1][0]*this.moveSpeed,p[1][1]*this.moveSpeed,p[1][2]*this.moveSpeed));
            dd.applyAxisAngle( new THREE.Vector3( 0, 1, 0 ), this.direction/180*Math.PI );
            v.add(dd);
        }
    }.bind(this))



    this.transform.setPosition(v.x,v.y,v.z);


    this.game.camera.setPosition(v.x,v.y,v.z);



    let l = new THREE.Vector3(1,0,0);
    l.applyAxisAngle( new THREE.Vector3( 0, 1, 0 ), this.direction/180*Math.PI );

    let dir = new THREE.Vector3().copy(l).normalize();
    l.add(v);
    this.game.camera.lookAt(l.x,l.y,l.z);


    this.reload -= dt;
    if (this.game.input.isKeyDown(ENGINE.KeyCode.SPACEBAR) && this.reload<0)
    {
        this.game.scene.entities.add({
            type:"Bullet",
            params:{
                direction:[dir.x,dir.y,dir.z],
                speed : 200
            },
            components:{
                transform:{position:[v.x,v.y-10,v.z]}
            }
        });

        this.reload = 0.3;
    }





    this.game.ui.setOverlayText("ARROWS - MOVE, SPACE - SHOOT"+"\n"+"\n"+"DIR: "+Math.round(this.direction))
}

Player.prototype.constructor = Player;
ENGINE.scripts["Player"] = Player;