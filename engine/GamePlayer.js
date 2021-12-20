ENGINE.GamePlayer = function ()
{
    this.game = null;
}


ENGINE.GamePlayer.prototype = {

    boot : function(resourcesDataURL,loopType,onComplete) {
        this.game = new ENGINE.Game(loopType);

        this.game.boot(function () {

            this.game.resources.loadPackage(resourcesDataURL,onComplete);

        }.bind(this));


    },

    play : function (sceneId) {

        this.game.init(sceneId);

        this.game.start();
    }
}



ENGINE.GamePlayer.prototype.constructor = ENGINE.GamePlayer;

