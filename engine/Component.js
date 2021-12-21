
ENGINE.Component = function(game,manager,gameObject) {



    this.game = game;
    this.manager = manager;

    this.gameObject = gameObject;


}


ENGINE.Component.prototype = {


    init : function () {

    },

    update : function (dt) {

    },

    onDestroy : function () {

    }
}

ENGINE.Component.prototype.constructor = ENGINE.Component;
