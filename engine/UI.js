

ENGINE.UI = function (game)
{

    this.game = game;



    this.overlay = document.createElement( 'div' );
    this.overlay.className = 'overlayText';
    this.game.domElement.appendChild( this.overlay );

}

ENGINE.UI.prototype = {


    update : function (dt) {



    },

    setOverlayText : function (text) {


        let htmlText = "";
        let txts = text.split(/\r?\n/);
        txts.forEach(function (t) {
            htmlText+= t+ "<br>"
        })

        this.overlay.innerHTML = htmlText;
    }



}
ENGINE.UI.prototype.constructor = ENGINE.UI;



