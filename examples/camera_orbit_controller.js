CameraOrbitController = function () {

};

CameraOrbitController.prototype = Object.create(ENGINE.GameObject.prototype);

CameraOrbitController.prototype.init = function (params) {


    this.game.camera.setPerspectiveMode(70,1,10000);
    //this.game.camera.setPosition(0,0,400);


    this.centerPos = new THREE.Vector3(params.centerPosition[0],params.centerPosition[1],params.centerPosition[2]);

    this.posW = 0;
    this.posH = 0;
    this.dist = params.distance;


    this.mouseLeft = false;
    this.mouseLeftStartX = 0;
    this.mouseLeftStartY = 0;
    this.posStartW = 0;
    this.posStartH = 0;



    this.mouseRight = false;
    this.mouseRightStartX = 0;
    this.mouseRightStartY = 0;
    this.posStartX = 0;
    this.posStartZ = 0;

    this.vo = new THREE.Object3D();
}

CameraOrbitController.prototype.update= function (dt) {



    if (this.game.camera.isDebugMode())
        return;

    if (this.game.input.isMouseDown(ENGINE.Input.MOUSE_LEFT_BUTTON))
    {
        if (!this.mouseLeft)
        {
            this.mouseLeftStartX = this.game.input.mouse.relativeX;
            this.mouseLeftStartY = this.game.input.mouse.relativeY;
            this.posStartW = this.posW;
            this.posStartH = this.posH;
            this.mouseLeft = true;
        }
    }
    else
    {
        if (this.mouseLeft)
        {
            this.mouseLeft = false;
        }
    }


    if (this.game.input.isMouseDown(ENGINE.Input.MOUSE_RIGHT_BUTTON))
    {
        if (!this.mouseRight)
        {
            this.mouseRightStartX = this.game.input.mouse.relativeX;
            this.mouseRightStartY = this.game.input.mouse.relativeY;
            this.posStart = this.centerPos.clone();
            this.mouseRight = true;
        }
    }
    else
    {
        if (this.mouseRight)
        {
            this.mouseRight = false;
        }
    }

    if (this.mouseLeft)
    {
        this.posW = this.posStartW-(this.game.input.mouse.relativeX - this.mouseLeftStartX)*5;
        this.posH = Math.min(Math.max(this.posStartH+(this.game.input.mouse.relativeY - this.mouseLeftStartY)*2,-0.95),0.95);
    }
    if (this.mouseRight)
    {


        let yy = (this.game.input.mouse.relativeY - this.mouseRightStartY)*2;
        let xx = (this.game.input.mouse.relativeX - this.mouseRightStartX)*2;

        let dd = (new THREE.Vector3(xx*this.dist,yy*this.dist,0));
        //dd.applyAxisAngle( new THREE.Vector3( 0, 1, 0 ), this.posW*Math.PI/2 );
        dd.applyQuaternion(this.vo.quaternion);
        let kk = this.posStart.clone();
        kk.add(dd);

        this.centerPos = kk.clone();

    }




    [[ENGINE.KeyCode.W,[-1,0,0]],
        [ENGINE.KeyCode.D,[0,0,-1]],
        [ENGINE.KeyCode.A,[0,0,1]],
        [ENGINE.KeyCode.S,[1,0,0]]].forEach(function (p) {

        if (this.game.input.isKeyDown(p[0]))
        {
            let dd = (new THREE.Vector3(p[1][0]*this.dist*dt,p[1][1]*this.dist*dt,p[1][2]*this.dist*dt));
            dd.applyAxisAngle( new THREE.Vector3( 0, 1, 0 ), this.posW*Math.PI/2 );
            this.centerPos.add(dd);
        }
    }.bind(this))



    let v = new THREE.Vector3(this.dist,0,0);


    //this.posW+=0.05*120*dt;
    //this.posH+=0.002*120*dt;


    v.applyAxisAngle( new THREE.Vector3( 0, 0, 1 ), this.posH*Math.PI/2 );

    v.applyAxisAngle( new THREE.Vector3( 0, 1, 0 ), this.posW*Math.PI/2 );

    v.add(this.centerPos);
    this.game.camera.setPosition(v.x,v.y,v.z)


    this.game.camera.lookAt(this.centerPos.x,this.centerPos.y,this.centerPos.z);


    this.vo.position.set(v.x,v.y,v.z);
    this.vo.lookAt(this.centerPos.x,this.centerPos.y,this.centerPos.z)



}

CameraOrbitController.prototype.constructor = CameraOrbitController;
ENGINE.scripts["CameraOrbitController"] = CameraOrbitController;