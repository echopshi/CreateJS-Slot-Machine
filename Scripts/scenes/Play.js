"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Author: Hang Li
 * Student Number: 300993981
 * Creation Date: Feb 14, 2020
 * Game App Description: CreateJS Slot Machine
 * Revision History: available in GitHub
 */
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // CONTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            // PRIVATE INSTANCE MEMEBERS
            _this._playerMoney = 1000;
            _this._jackpot = 5000;
            _this._jackpotCheat = false;
            _this._winnings = 0;
            _this._playerBet = 10;
            _this._betRange = [
                10,
                20,
                30,
                40,
                50,
                100,
                150,
                200,
                250,
                300,
                400,
                500,
                600,
                700,
                800,
                900,
                1000
            ];
            // spin result variables
            _this._spinResult1 = "";
            _this._spinResult2 = "";
            _this._spinResult3 = "";
            _this._spinResult4 = "";
            _this._spinResult5 = "";
            // count of symbols
            _this._poop = 0;
            _this._gift = 0;
            _this._money = 0;
            _this._moneyBag = 0;
            _this._bicycle = 0;
            _this._diamond = 0;
            _this._house = 0;
            _this._airplane = 0;
            // button sound effects
            _this._endSound = "Stop_sound";
            _this._resetSound = "Reset_sound";
            _this._betSound = "Bet_sound";
            _this._winSound = "Win_sound";
            _this._lossSound = "Loss_sound";
            _this._jackpotSound = "Jackpot_sound";
            _this._spinImage1 = new objects.Button();
            _this._spinImage2 = new objects.Button();
            _this._spinImage3 = new objects.Button();
            _this._spinImage4 = new objects.Button();
            _this._spinImage5 = new objects.Button();
            _this._background = new objects.Button("./Assets/images/playing-background.png", 0, 0, false);
            // initialize user interact objects
            _this._playerMoneyLabel = new objects.Label(_this._playerMoney + "", "42px", "Consolas", "Red", 560, 210, true);
            _this._jackpotLabel = new objects.Label(_this._jackpot + "", "42px", "Consolas", "Red", 170, 210, true);
            _this._playerBetLabel = new objects.Label("10", "36px", "Consolas", "Red", 200, 450, true);
            _this._winningLabel = new objects.Label(" ", "42px", "Consolas", "Red", 370, 210, true);
            _this._resetButton = new objects.Button("./Assets/images/buttons/reset-button.png", 770, 40, true);
            _this._quitButton = new objects.Button("./Assets/images/buttons/close-button.png", 870, 40, true);
            _this._increaseBetButton = new objects.Button("./Assets/images/buttons/bet-up-arrow-button.png", 120, 450, true);
            _this._decreaseBetButton = new objects.Button("./Assets/images/buttons/bet-down-arrow-button.png", 300, 450, true);
            _this._spinButton = new objects.Button("./Assets/images/buttons/spin-button.png", 600, 450, true);
            _this.Start();
            return _this;
        }
        Object.defineProperty(Play.prototype, "jackpotCheat", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._jackpotCheat;
            },
            set: function (newBoolean) {
                this._jackpotCheat = newBoolean;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        /**
         * set all labels and objects to default status
         */
        Play.prototype.resetAll = function () {
            createjs.Sound.play(this._resetSound);
            this._winningLabel.setText(" ");
            this._playerMoney = 1000;
            this._jackpot = 5000;
            this._playerBet = 10;
            this._playerBetLabel.setText(this._playerBet + "");
            this._playerMoneyLabel.setText(this._playerMoney + "");
            this._jackpotLabel.setText(this._jackpot + "");
            this.cleanImages();
        };
        /**
         * increase player's current bet when they click on button
         * checks the current bet level in bet range, and increase the bet amount by level
         */
        Play.prototype.increaseBet = function () {
            this._winningLabel.setText(" ");
            var betLevel = this._betRange.indexOf(this._playerBet);
            if (betLevel + 1 < this._betRange.length &&
                this._betRange[betLevel + 1] <= this._playerMoney) {
                createjs.Sound.play(this._betSound);
                betLevel += 1;
                this._playerBet = this._betRange[betLevel];
                this._playerBetLabel.setText(this._playerBet + "");
            }
            else {
                createjs.Sound.play(this._endSound);
            }
        };
        /**
         * decrease player's current bet when they click on button
         * checks the current bet level in bet range, and decrease the bet amount by level
         */
        Play.prototype.decreaseBet = function () {
            this._winningLabel.setText(" ");
            var betLevel = this._betRange.indexOf(this._playerBet);
            if (betLevel - 1 >= 0) {
                createjs.Sound.play(this._betSound);
                betLevel -= 1;
                this._playerBet = this._betRange[betLevel];
                this._playerBetLabel.setText(this._playerBet + "");
            }
            else {
                createjs.Sound.play(this._endSound);
            }
        };
        /**
         * actual spin function, calls Reels() function
         * display the slot images
         * then determine win or loss
         */
        Play.prototype.spin = function () {
            // clean the previous winning label and images
            this._winningLabel.setText(" ");
            this.cleanImages();
            // check if player have enough money to bet
            if (this._playerMoney == 0 || this._playerBet > this._playerMoney) {
                createjs.Sound.play(this._endSound);
            }
            else {
                // get the result from Reels function
                var value = this.Reels();
                this._spinResult1 = "./Assets/images/symbols/" + value[0] + ".png";
                this._spinResult2 = "./Assets/images/symbols/" + value[1] + ".png";
                this._spinResult3 = "./Assets/images/symbols/" + value[2] + ".png";
                this._spinResult4 = "./Assets/images/symbols/" + value[3] + ".png";
                this._spinResult5 = "./Assets/images/symbols/" + value[4] + ".png";
                this._spinImage1 = new objects.Button(this._spinResult1, 140, 310, true);
                this.addChild(this._spinImage1);
                this._spinImage2 = new objects.Button(this._spinResult2, 255, 310, true);
                this.addChild(this._spinImage2);
                this._spinImage3 = new objects.Button(this._spinResult3, 370, 310, true);
                this.addChild(this._spinImage3);
                this._spinImage4 = new objects.Button(this._spinResult4, 485, 310, true);
                this.addChild(this._spinImage4);
                this._spinImage5 = new objects.Button(this._spinResult5, 600, 310, true);
                this.addChild(this._spinImage5);
                this.determineWinnings();
                this._playerMoneyLabel.setText(this._playerMoney + "");
            }
        };
        // clean the slot images if has any
        Play.prototype.cleanImages = function () {
            if (this._spinImage1 &&
                this._spinImage2 &&
                this._spinImage3 &&
                this._spinImage4 &&
                this._spinImage5) {
                this.removeChild(this._spinImage1);
                this.removeChild(this._spinImage2);
                this.removeChild(this._spinImage3);
                this.removeChild(this._spinImage4);
                this.removeChild(this._spinImage5);
            }
        };
        // rest the number of symbol after each win or loss
        Play.prototype.resetMachineTally = function () {
            this._poop = 0;
            this._gift = 0;
            this._money = 0;
            this._moneyBag = 0;
            this._bicycle = 0;
            this._diamond = 0;
            this._house = 0;
            this._airplane = 0;
        };
        Play.prototype.checkJackPot = function () {
            /* compare two random values, if they are the same then got jackpot */
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            // cheat control to win jackpot, control based on key event
            // when user pressed key "J", game.ts will set jackpotCheat variable to true
            // player will win jackpot either the randome numbers is same, or used the cheat code
            // set cheat code back to false after got jackpot
            if (jackPotTry == jackPotWin || this._jackpotCheat) {
                createjs.Sound.play(this._jackpotSound);
                this._playerMoney += this._jackpot;
                this._jackpot = 1000;
                this._jackpotLabel.setText(this._jackpot + "");
                this._jackpotCheat = false;
            }
        };
        // display winning, add winning amount to player's balance
        Play.prototype.showWinMessage = function () {
            this._playerMoney += this._winnings;
            createjs.Sound.play(this._winSound);
            this._winningLabel.setText(this._winnings + "");
            this.resetMachineTally();
            this.checkJackPot();
        };
        // subtract player's bet amount from player's balance
        Play.prototype.showLossMessage = function () {
            this._playerMoney -= this._playerBet;
            createjs.Sound.play(this._lossSound);
            this.resetMachineTally();
        };
        // use to check the range of reels when using random number
        Play.prototype.checkRange = function (value, lowerBounds, upperBounds) {
            if (value >= lowerBounds && value <= upperBounds) {
                return value;
            }
            else {
                return !value;
            }
        };
        /**
         * actual Reel functions
         * run 5 iterations to get the reel result
         * each time check the random result and match to the symbol
         */
        Play.prototype.Reels = function () {
            var betLine = ["", "", "", "", ""];
            var outcome = [0, 0, 0, 0, 0];
            for (var spin = 0; spin < 5; spin++) {
                outcome[spin] = Math.floor(Math.random() * 77 + 1);
                switch (outcome[spin]) {
                    case this.checkRange(outcome[spin], 1, 40):
                        betLine[spin] = "poop";
                        this._poop++;
                        break;
                    case this.checkRange(outcome[spin], 41, 53):
                        betLine[spin] = "gift";
                        this._gift++;
                        break;
                    case this.checkRange(outcome[spin], 54, 60):
                        betLine[spin] = "money";
                        this._money++;
                        break;
                    case this.checkRange(outcome[spin], 61, 66):
                        betLine[spin] = "moneyBag";
                        this._moneyBag++;
                        break;
                    case this.checkRange(outcome[spin], 67, 71):
                        betLine[spin] = "bicycle";
                        this._bicycle++;
                        break;
                    case this.checkRange(outcome[spin], 72, 74):
                        betLine[spin] = "diamond";
                        this._diamond++;
                        break;
                    case this.checkRange(outcome[spin], 75, 76):
                        betLine[spin] = "house";
                        this._house++;
                        break;
                    case this.checkRange(outcome[spin], 77, 77):
                        betLine[spin] = "airplane";
                        this._airplane++;
                        break;
                }
            }
            return betLine;
        };
        /**
         * defines the winning stage
         * if poop larger than or equals to 2, player will lose their bet amount
         * else, will check the winning stage for occurance of specific symbols
         * the biggest winning will be exact 5 airplanes to win 2000 times player's bet
         */
        Play.prototype.determineWinnings = function () {
            if (this._poop < 2) {
                if (this._gift == 5) {
                    this._winnings = this._playerBet * 80;
                }
                else if (this._money == 5) {
                    this._winnings = this._playerBet * 160;
                }
                else if (this._moneyBag == 5) {
                    this._winnings = this._playerBet * 320;
                }
                else if (this._bicycle == 5) {
                    this._winnings = this._playerBet * 480;
                }
                else if (this._diamond == 5) {
                    this._winnings = this._playerBet * 560;
                }
                else if (this._house == 5) {
                    this._winnings = this._playerBet * 640;
                }
                else if (this._airplane == 5) {
                    this._winnings = this._playerBet * 2000;
                }
                else if (this._gift == 4) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._money == 4) {
                    this._winnings = this._playerBet * 40;
                }
                else if (this._moneyBag == 4) {
                    this._winnings = this._playerBet * 80;
                }
                else if (this._bicycle == 4) {
                    this._winnings = this._playerBet * 120;
                }
                else if (this._diamond == 4) {
                    this._winnings = this._playerBet * 140;
                }
                else if (this._house == 4) {
                    this._winnings = this._playerBet * 160;
                }
                else if (this._airplane == 4) {
                    this._winnings = this._playerBet * 200;
                }
                else if (this._gift == 3) {
                    this._winnings = this._playerBet * 5;
                }
                else if (this._money == 3) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._moneyBag == 3) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._bicycle == 3) {
                    this._winnings = this._playerBet * 30;
                }
                else if (this._diamond == 3) {
                    this._winnings = this._playerBet * 35;
                }
                else if (this._house == 3) {
                    this._winnings = this._playerBet * 40;
                }
                else if (this._airplane == 3) {
                    this._winnings = this._playerBet * 50;
                }
                else if (this._gift == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._money == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._moneyBag == 2) {
                    this._winnings = this._playerBet * 3;
                }
                else if (this._bicycle == 2) {
                    this._winnings = this._playerBet * 4;
                }
                else if (this._diamond == 2) {
                    this._winnings = this._playerBet * 5;
                }
                else if (this._house == 2) {
                    this._winnings = this._playerBet * 5;
                }
                else if (this._airplane == 2) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._airplane == 1) {
                    this._winnings = this._playerBet * 5;
                }
                else {
                    this._winnings = this._playerBet * 1;
                }
                this.showWinMessage();
            }
            else {
                this.showLossMessage();
            }
        };
        // PUBLIC METHODS
        Play.prototype.Start = function () {
            // add all interact objects to scene
            this.addChild(this._background);
            this.addChild(this._playerMoneyLabel);
            this.addChild(this._jackpotLabel);
            this.addChild(this._playerBetLabel);
            this.addChild(this._winningLabel);
            this.addChild(this._resetButton);
            this.addChild(this._quitButton);
            this.addChild(this._increaseBetButton);
            this.addChild(this._decreaseBetButton);
            this.addChild(this._spinButton);
            // load the sound effects
            createjs.Sound.registerSound("./Assets/sounds/stop.wav", this._endSound);
            createjs.Sound.registerSound("./Assets/sounds/reset.mp3", this._resetSound);
            createjs.Sound.registerSound("./Assets/sounds/bet.mp3", this._betSound);
            createjs.Sound.registerSound("./Assets/sounds/win.mp3", this._winSound);
            createjs.Sound.registerSound("./Assets/sounds/loss.wav", this._lossSound);
            createjs.Sound.registerSound("./Assets/sounds/jackpot.mp3", this._jackpotSound);
            this.Main();
        };
        Play.prototype.Update = function () { };
        // main functions for interact buttons
        Play.prototype.Main = function () {
            var _this = this;
            this._resetButton.HoverOn();
            this._resetButton.on("click", function () {
                _this.resetAll();
            });
            this._quitButton.HoverOn();
            this._quitButton.on("click", function () {
                config.GameConfig.SCENE_STATE = scenes.State.END;
            });
            this._increaseBetButton.HoverOn();
            this._increaseBetButton.on("click", function () {
                _this.increaseBet();
            });
            this._decreaseBetButton.HoverOn();
            this._decreaseBetButton.on("click", function () {
                _this.decreaseBet();
            });
            this._spinButton.HoverOn();
            this._spinButton.on("click", function () {
                _this.spin();
            });
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map