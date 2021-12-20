import RenderController from './RenderController.js';


const renderer = new RenderController();

self.onmessage = function ( messageEvent ) {


    renderer.mainReceive(messageEvent.data)



};


