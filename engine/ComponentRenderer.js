ENGINE.ComponentRenderer = function (game,manager,gameObject,data) {
    ENGINE.Component.call(this,game,manager,gameObject);



    if (data!==undefined)
    {


        this.game.rendererSend({action:"addObject",args:{id:this.gameObject.id,data:data}})

    }

};

ENGINE.ComponentRenderer.prototype = Object.create(ENGINE.Component.prototype);

ENGINE.ComponentRenderer.prototype.update= function (dt) {

}

ENGINE.ComponentRenderer.prototype.update = function (dt) {


    let p = this.gameObject.transform.getPosition();
    let q = this.gameObject.transform.getQuaternion();
    let s = this.gameObject.transform.getScale();
    this.game.rendererSend({action:"setObjectPosition",args: {id:this.gameObject.id,x:p.x,y:p.y,z:p.z}})
    this.game.rendererSend({action:"setObjectQuaternion",args: {id:this.gameObject.id,x:q.x,y:q.y,z:q.z,w:q.w}})
    this.game.rendererSend({action:"setObjectScale",args: {id:this.gameObject.id,x:s.x,y:s.y,z:s.z}})


}

ENGINE.ComponentRenderer.prototype.constructor = ENGINE.ComponentRenderer;
