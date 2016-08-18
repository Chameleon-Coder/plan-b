import Data from './app-state'
import initialState from './initial-state'
import {draw} from './draw'
import runSteps from './steps/steps'


//Cache references to canvas and context
var canvas = document.getElementById("js-canvas");
var ctx = canvas.getContext("2d");

//Init the app. (Does the first draw)
Data.init(initialState, canvas, ctx);

const state = Data.getState();
console.log('1', state.bullets);


Data.mergeNodeInCollection("bullets", "a", {
   color: "red"
});

console.log(Data.getState().bullets);


//Draw Loop
var step = function() {

    const state = Data.getState();

    //Draw the scene
    draw(canvas, ctx, state)

    //Run Steps
    runSteps(state);



    //BULLET
    const currentX = Data.getState().bulletX;
    const newX = (currentX < 0) ? 400 : currentX - 4;

    Data.mergeState({
        bulletX: newX
    });



    requestAnimationFrame(step)
};

requestAnimationFrame(step);