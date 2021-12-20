Controller = function () {

};

Controller.prototype = Object.create(ENGINE.GameObject.prototype);

Controller.prototype.init = function (params) {


    //this.game.camera.setPerspectiveMode(70,1,1000);
    //this.game.camera.setPosition(0,0,400);

}

Controller.prototype.update= function (dt) {


    this.game.ui.setOverlayText("MOUSE\n"+
        this.game.input.mouse.x+"\n"+
        this.game.input.mouse.y+"\n"+
        this.game.input.mouse.relativeX.toFixed(2)+"\n"+
        this.game.input.mouse.relativeY.toFixed(2)+"\n"+
        this.game.input.isMouseDown(0)+"\n"+
        this.game.input.isMouseDown(1)+"\n"+
        this.game.input.isMouseDown(2)+"\n"+
        this.game.input.isMouseDown(3)+"\n"+
        this.game.input.isMouseDown(4))
}

Controller.prototype.constructor = Controller;
ENGINE.scripts["Controller"] = Controller;