
ENGINE.Component = function(game,manager,gameObject) {



    this.game = game;
    this.manager = manager;

    this.gameObject = gameObject;


}


ENGINE.Component.prototype = {


    init : function () {

    },

    update : function (dt) {

    }
}

ENGINE.Component.prototype.constructor = ENGINE.Component;
