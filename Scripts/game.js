"use strict";
var Game = (function () {
    // variable declarations
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var playerMoney = 1000;
    var jackpot = 5000;
    var playerBet = 10;
    var betRange = [10, 20, 30, 40, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000];
    var winnings = 0;
    var spinResult1 = "";
    var spinResult2 = "";
    var spinResult3 = "";
    var spinImage1;
    var spinImage2;
    var spinImage3;
    var poop = 0;
    var gift = 0;
    var money = 0;
    var moneyBag = 0;
    var bicycle = 0;
    var diamond = 0;
    var house = 0;
    var airplane = 0;
    // user interact objects, label and button
    var playerMoneyLabel;
    var jackpotLabel;
    var playerBetLable;
    var noticeLable;
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
        console.log("Game Start Screen!");
        startScreen();
    }
    function startScreen() {
        var startBackground = new objects.Button("./Assets/images/start-background.png", 0, 0, false);
        stage.addChild(startBackground);
        var startButton = new objects.Button("./Assets/images/buttons/start-button.png", 380, 450, true);
        stage.addChild(startButton);
        startButton.on("click", function () {
            stage.removeAllChildren();
            console.log("Main Game Screen!");
            defineObjects();
        });
    }
    function defineObjects() {
        var background = new objects.Button("./Assets/images/playing-background.png", 0, 0, false);
        stage.addChild(background);
        playerMoneyLabel = new objects.Label("1000", "42px", "Consolas", "#FCE98B", 470, 230, true);
        stage.addChild(playerMoneyLabel);
        jackpotLabel = new objects.Label("5000", "42px", "Consolas", "#FCE98B", 300, 230, true);
        stage.addChild(jackpotLabel);
        playerBetLable = new objects.Label("10", "32px", "Consolas", "#FCE98B", 90, 400, true);
        stage.addChild(playerBetLable);
        noticeLable = new objects.Label(" ", "28px", "Consolas", "#FCE98B", 200, 60, true);
        stage.addChild(noticeLable);
        resetButton = new objects.Button("./Assets/images/buttons/reset-button.png", 80, 70, true);
        stage.addChild(resetButton);
        resetButton.on("click", resetAll);
        quitButton = new objects.Button("./Assets/images/buttons/close-button.png", 850, 70, true);
        stage.addChild(quitButton);
        quitButton.on("click", quit);
        increaseBetButton = new objects.Button("./Assets/images/buttons/bet-up-arrow-button.png", 100, 335, true);
        stage.addChild(increaseBetButton);
        increaseBetButton.on("click", increaseBet);
        decreaseBetButton = new objects.Button("./Assets/images/buttons/bet-down-arrow-button.png", 100, 465, true);
        stage.addChild(decreaseBetButton);
        decreaseBetButton.on("click", decreaseBet);
        spinButton = new objects.Button("./Assets/images/buttons/spin-button.png", 640, 400, true);
        stage.addChild(spinButton);
        spinButton.on("click", spin);
    }
    function resetAll() {
        noticeLable.setText(" ");
        playerMoney = 1000;
        jackpot = 5000;
        playerBet = 10;
        playerBetLable.setText(playerBet + "");
        playerMoneyLabel.setText(playerMoney + "");
        jackpotLabel.setText(jackpot + "");
        if (spinImage1 && spinImage2 && spinImage3) {
            stage.removeChild(spinImage1);
            stage.removeChild(spinImage2);
            stage.removeChild(spinImage3);
        }
    }
    function quit() {
        // TODO: go to the start screen
        stage.removeAllChildren();
        startScreen();
    }
    function increaseBet() {
        noticeLable.setText(" ");
        var betLevel = betRange.indexOf(playerBet);
        if (betLevel + 1 < betRange.length && betRange[betLevel + 1] <= playerMoney) {
            betLevel += 1;
            playerBet = betRange[betLevel];
            playerBetLable.setText(playerBet + "");
        }
        else {
            noticeLable.setText("Reached Max Bet!");
        }
    }
    function decreaseBet() {
        noticeLable.setText(" ");
        var betLevel = betRange.indexOf(playerBet);
        if ((betLevel - 1) >= 0) {
            betLevel -= 1;
            playerBet = betRange[betLevel];
            playerBetLable.setText(playerBet + "");
        }
        else {
            noticeLable.setText("Reach Min Bet!");
        }
    }
    function spin() {
        noticeLable.setText(" ");
        if (spinImage1 && spinImage2 && spinImage3) {
            stage.removeChild(spinImage1);
            stage.removeChild(spinImage2);
            stage.removeChild(spinImage3);
        }
        // TODO: animation to show spin
        if (playerMoney == 0 || playerBet > playerMoney) {
            noticeLable.setText("No more Money, Reset to play again?");
        }
        else {
            var value = Reels();
            spinResult1 = "./Assets/images/symbols/" + value[0] + ".png";
            spinResult2 = "./Assets/images/symbols/" + value[1] + ".png";
            spinResult3 = "./Assets/images/symbols/" + value[2] + ".png";
            spinImage1 = new objects.Button(spinResult1, 240, 430, true);
            stage.addChild(spinImage1);
            spinImage2 = new objects.Button(spinResult2, 370, 430, true);
            stage.addChild(spinImage2);
            spinImage3 = new objects.Button(spinResult3, 490, 430, true);
            stage.addChild(spinImage3);
            determineWinnings();
            playerMoneyLabel.setText(playerMoney + "");
        }
    }
    /* Utility function to reset all fruit tallies */
    function resetMachineTally() {
        poop = 0;
        gift = 0;
        money = 0;
        moneyBag = 0;
        bicycle = 0;
        diamond = 0;
        house = 0;
        airplane = 0;
    }
    /* Check to see if the player won the jackpot */
    function checkJackPot() {
        /* compare two random values */
        var jackPotTry = Math.floor(Math.random() * 51 + 1);
        var jackPotWin = Math.floor(Math.random() * 51 + 1);
        if (jackPotTry == jackPotWin) {
            // TODO: cheat control to win jackpot & notify player
            noticeLable.setText("You Won the $" + jackpot + " Jackpot!!");
            playerMoney += jackpot;
            jackpot = 1000;
            jackpotLabel.setText(jackpot + "");
        }
    }
    /* Utility function to show a win message and increase player money */
    function showWinMessage() {
        playerMoney += winnings;
        noticeLable.setText("Win!! Keep Doing!");
        resetMachineTally();
        checkJackPot();
    }
    /* Utility function to show a loss message and reduce player money */
    function showLossMessage() {
        playerMoney -= playerBet;
        noticeLable.setText("Loss! Try Again!");
        resetMachineTally();
    }
    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }
    /* When this function is called it determines the betLine results. */
    function Reels() {
        var betLine = ["", "", ""];
        var outcome = [0, 0, 0];
        for (var spin_1 = 0; spin_1 < 3; spin_1++) {
            outcome[spin_1] = Math.floor((Math.random() * 65) + 1);
            switch (outcome[spin_1]) {
                case checkRange(outcome[spin_1], 1, 27):
                    betLine[spin_1] = "poop";
                    poop++;
                    break;
                case checkRange(outcome[spin_1], 28, 37):
                    betLine[spin_1] = "gift";
                    gift++;
                    break;
                case checkRange(outcome[spin_1], 38, 46):
                    betLine[spin_1] = "money";
                    money++;
                    break;
                case checkRange(outcome[spin_1], 47, 54):
                    betLine[spin_1] = "moneyBag";
                    moneyBag++;
                    break;
                case checkRange(outcome[spin_1], 55, 59):
                    betLine[spin_1] = "bicycle";
                    bicycle++;
                    break;
                case checkRange(outcome[spin_1], 60, 62):
                    betLine[spin_1] = "diamond";
                    diamond++;
                    break;
                case checkRange(outcome[spin_1], 63, 64):
                    betLine[spin_1] = "house";
                    house++;
                    break;
                case checkRange(outcome[spin_1], 65, 65):
                    betLine[spin_1] = "airplane";
                    airplane++;
                    break;
            }
        }
        return betLine;
    }
    /* This function calculates the player's winnings, if any */
    function determineWinnings() {
        if (poop == 0) {
            if (gift == 3) {
                winnings = playerBet * 10;
            }
            else if (money == 3) {
                winnings = playerBet * 20;
            }
            else if (moneyBag == 3) {
                winnings = playerBet * 30;
            }
            else if (bicycle == 3) {
                winnings = playerBet * 40;
            }
            else if (diamond == 3) {
                winnings = playerBet * 50;
            }
            else if (house == 3) {
                winnings = playerBet * 75;
            }
            else if (airplane == 3) {
                winnings = playerBet * 100;
            }
            else if (gift == 2) {
                winnings = playerBet * 2;
            }
            else if (money == 2) {
                winnings = playerBet * 2;
            }
            else if (moneyBag == 2) {
                winnings = playerBet * 3;
            }
            else if (bicycle == 2) {
                winnings = playerBet * 4;
            }
            else if (diamond == 2) {
                winnings = playerBet * 5;
            }
            else if (house == 2) {
                winnings = playerBet * 10;
            }
            else if (airplane == 2) {
                winnings = playerBet * 20;
            }
            else if (airplane == 1) {
                winnings = playerBet * 10;
            }
            else {
                winnings = playerBet * 1;
            }
            showWinMessage();
        }
        else {
            showLossMessage();
        }
    }
    window.addEventListener('load', Start);
})();
//# sourceMappingURL=game.js.map