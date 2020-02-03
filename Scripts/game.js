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
    var playerBetLable;
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
        var userMoneyLabel = new objects.Label("1000", "42px", "Consolas", "#FCE98B", 470, 230, true);
        stage.addChild(userMoneyLabel);
        var jackpotLabel = new objects.Label("5000", "42px", "Consolas", "#FCE98B", 300, 230, true);
        stage.addChild(jackpotLabel);
        var playerBetLable = new objects.Label("10", "32px", "Consolas", "#FCE98B", 100, 400, true);
        stage.addChild(playerBetLable);
        var resetButton = new objects.Button("./Assets/images/buttons/reset-button.png", 80, 70, true);
        stage.addChild(resetButton);
        resetButton.on("click", function () { resetAll(); });
        var quitButton = new objects.Button("./Assets/images/buttons/close-button.png", 850, 70, true);
        stage.addChild(quitButton);
        quitButton.on("click", function () { quit(); });
        var increaseBetButton = new objects.Button("./Assets/images/buttons/bet-up-arrow-button.png", 100, 335, true);
        stage.addChild(increaseBetButton);
        increaseBetButton.on("click", function () { increaseBet(); });
        var decreaseBetButton = new objects.Button("./Assets/images/buttons/bet-down-arrow-button.png", 100, 465, true);
        stage.addChild(decreaseBetButton);
        decreaseBetButton.on("click", function () { decreaseBet(); });
        var spinButton = new objects.Button("./Assets/images/buttons/spin-button.png", 640, 400, true);
        stage.addChild(spinButton);
        spinButton.on("click", function () { spin(); });
        var button = new objects.Button("./Assets/images/buttons/clickMeButton.png");
        //stage.addChild(button);
    }
    function spin() {
        console.log("spin!");
        if (playerMoney == 0) {
            //TODO: ask if want to play again
            resetAll();
        }
        else if (playerBet > playerMoney) {
            // TODO: notify user no more money for this bet
        }
        else {
            //let value = this.Reels();
            //spinResult1 = value[0];
            //spinResult2 = value[1];
            //spinResult3 = value[2];
            // TODO: show the images of results
            //this.determineWinnings();
        }
    }
    function decreaseBet() {
        console.log("decrease bet");
        var betLevel = betRange.indexOf(playerBet);
        if ((betLevel - 1) >= 0 && betRange[betLevel] <= playerMoney) {
            betLevel -= 1;
            playerBet = betRange[betLevel];
            console.log(playerBet);
            //playerBetLable.setText(playerBet+"");
        }
        else {
            //TODO: tell player the bet is lowest and cannot decrease more
        }
    }
    function increaseBet() {
        console.log("increase bet");
        var betLevel = betRange.indexOf(playerBet);
        if (betLevel + 1 < betRange.length && betRange[betLevel] <= playerMoney) {
            betLevel += 1;
            playerBet = betRange[betLevel];
            console.log(playerBet);
            //playerBetLable.setText(playerBet+"");
        }
        else {
            //TODO: tell player the bet is biggest and cannot increase more
        }
    }
    function quit() {
        console.log("quit!");
    }
    /* Utility function to reset the player stats */
    function resetAll() {
        console.log("reset!");
        var playerMoney = 1000;
        var jackpot = 5000;
        var playerBet = 0;
        // TODO: clean the images on slot
    }
    /* Utility function to reset all fruit tallies */
    function resetMachineTally() {
        var poop = 0;
        var gift = 0;
        var money = 0;
        var moneyBag = 0;
        var bicycle = 0;
        var diamond = 0;
        var house = 0;
        var airplane = 0;
    }
    /* Check to see if the player won the jackpot */
    function checkJackPot() {
        /* compare two random values */
        var jackPotTry = Math.floor(Math.random() * 51 + 1);
        var jackPotWin = Math.floor(Math.random() * 51 + 1);
        if (jackPotTry == jackPotWin) {
            // TODO: cheat control to win jackpot & notify player
            console.log("You Won the $" + jackpot + " Jackpot!!");
            playerMoney += jackpot;
            jackpot = 1000;
        }
        /* Utility function to show a win message and increase player money */
        function showWinMessage() {
            playerMoney += winnings;
            // TODO: notify player
            resetMachineTally();
            checkJackPot();
        }
        /* Utility function to show a loss message and reduce player money */
        function showLossMessage() {
            playerMoney -= playerBet;
            // TODO: notify player
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
    }
    window.addEventListener('load', Start);
})();
//# sourceMappingURL=game.js.map