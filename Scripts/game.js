"use strict";
var Game = (function () {
    // variable declarations
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var playerMoney = 1000;
    var jackpot = 5000;
    var playerBet = 0;
    var spinResult = "";
    var machines = "";
    var poop = 0;
    var gift = 0;
    var money = 0;
    var moneyBag = 0;
    var bicycle = 0;
    var diamond = 0;
    var house = 0;
    var airplane = 0;
    // user interact objects, label and button
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
        var userMoneyLabel = new objects.Label("$1000", "42px", "Consolas", "#FCE98B", 470, 230, true);
        stage.addChild(userMoneyLabel);
        var jackpotLabel = new objects.Label("$5000", "42px", "Consolas", "#FCE98B", 300, 230, true);
        stage.addChild(jackpotLabel);
        var currentBetLable = new objects.Label("10", "32px", "Consolas", "#FCE98B", 100, 400, true);
        stage.addChild(currentBetLable);
        var resetButton = new objects.Button("./Assets/images/buttons/reset-button.png", 80, 70, true);
        stage.addChild(resetButton);
        var quitButton = new objects.Button("./Assets/images/buttons/close-button.png", 850, 70, true);
        stage.addChild(quitButton);
        var increaseBetButton = new objects.Button("./Assets/images/buttons/bet-up-arrow-button.png", 100, 335, true);
        stage.addChild(increaseBetButton);
        var decreaseBetButton = new objects.Button("./Assets/images/buttons/bet-down-arrow-button.png", 100, 465, true);
        stage.addChild(decreaseBetButton);
        var spinButton = new objects.Button("./Assets/images/buttons/spin-button.png", 640, 400, true);
        stage.addChild(spinButton);
        var button = new objects.Button("./Assets/images/buttons/clickMeButton.png");
        //stage.addChild(button);
    }
    window.addEventListener('load', Start);
})();
//# sourceMappingURL=game.js.map