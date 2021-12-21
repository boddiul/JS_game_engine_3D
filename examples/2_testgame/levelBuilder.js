LevelBuilder = function () {


};

LevelBuilder.prototype = Object.create(ENGINE.GameObject.prototype);

LevelBuilder.prototype.init = function (params) {




    for (let i=0;i<params.map.length;i++)
    {

        for (let j=0;j<params.map[i].length;j++)
        {


            console.log(params.map[i][j])
            switch (params.map[i][j]) {
                case "W":
                    this.game.scene.entities.add({
                        type:"Wall",
                        params:{size:params.blockSize},
                        components:
                            {
                                transform: {position:
                                        [params.startPosition[0]+j*params.blockSize,
                                            params.startPosition[1],
                                            params.startPosition[2]+i*params.blockSize]}
                            }
                    })
                    break;
                case "b":
                    this.game.scene.entities.add({
                        type:"Box",
                        params:{size:params.blockSize*0.6},
                        components:
                            {
                                transform: {position:
                                        [params.startPosition[0]+j*params.blockSize,
                                            params.startPosition[1]-params.blockSize*0.2,
                                            params.startPosition[2]+i*params.blockSize]}
                            }
                    })
            }
        }
    }

}

LevelBuilder.prototype.update= function (dt) {



}

LevelBuilder.prototype.constructor = LevelBuilder;
ENGINE.scripts["LevelBuilder"] = LevelBuilder;