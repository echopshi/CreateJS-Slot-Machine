"use strict";
var Game = (function () {
    // variable declarations
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var slotMachineExample;
    var userMoneyLabel;
    var jackpotLabel;
    var currentBetLable;
    var spinButton;
    var resetButton;
    var quitButton;
    var decreaseBetButton;
    var increaseBetButton;
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log("%c Game Started!", "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on('tick', Update);
        Main();
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        stage.update();
    }
    function Main() {
        slotMachineExample = new createjs.Bitmap("/Assets/images/winning-slots.jpg");
        stage.addChild(slotMachineExample);
    }
    window.addEventListener('load', Start);
})();
//# sourceMappingURL=game.js.map