console.log("WOOOORK1");


let game = null;

onmessage = function(event) {


    let message = event.data;

    if (message.type==="init")
    {
        /*game = message.game;


        game.scene.update(10);*/

        console.log("RECEIVED");
    }




    //postMessage(primes);
};