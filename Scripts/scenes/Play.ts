module scenes 
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMEBERS
        playerMoney: number = 1000;
        jackpot: number = 5000;
        playerBet: number = 10;
        betRange: number[] = [10, 20, 30, 40, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000];
        winnings: number = 0;
        spinResult1: string = "";
        spinResult2: string = "";
        spinResult3: string = "";
        spinImage1: objects.Button;
        spinImage2: objects.Button;
        spinImage3: objects.Button;
        poop: number = 0;
        gift: number = 0;
        money: number = 0;
        moneyBag: number = 0;
        bicycle: number = 0;
        diamond: number = 0;
        house: number = 0;
        airplane: number = 0;
        background: objects.Button;

        // user interact objects, label and button
        playerMoneyLabel: objects.Label;
        jackpotLabel: objects.Label;
        playerBetLable: objects.Label;
        noticeLable: objects.Label;
        spinButton: objects.Button;
        resetButton: objects.Button;
        quitButton: objects.Button;
        decreaseBetButton: objects.Button;
        increaseBetButton: objects.Button;

        // PUBLIC PROPERTIES

        // CONTRUCTOR
        constructor(){
            super();

            this.spinImage1 = new objects.Button();
            this.spinImage2 = new objects.Button();
            this.spinImage3 = new objects.Button();
            this.background = new objects.Button("./Assets/images/playing-background.png", 0, 0, false);

            // initialize user interact objects
            this.playerMoneyLabel = new objects.Label("1000", "42px", "Consolas", "Red", 460, 230, true);
            this.jackpotLabel = new objects.Label("5000", "42px", "Consolas", "Red", 300, 230, true);
            this.playerBetLable = new objects.Label("10", "32px", "Consolas", "Red", 90, 400, true);
            this.noticeLable = new objects.Label(" ", "28px", "Consolas", "#FCE98B", 200, 60, true);
            this.resetButton = new objects.Button("./Assets/images/buttons/reset-button.png", 80, 70, true);
            this.quitButton = new objects.Button("./Assets/images/buttons/close-button.png", 850, 70, true);
            this.increaseBetButton = new objects.Button("./Assets/images/buttons/bet-up-arrow-button.png", 100, 335, true);
            this.decreaseBetButton = new objects.Button("./Assets/images/buttons/bet-down-arrow-button.png", 100, 465, true);
            this.spinButton = new objects.Button("./Assets/images/buttons/spin-button.png", 640, 400, true);
        

            this.Start();
        }

        // PUBLIC METHODS
        public Start(): void 
        {
            // add all interact objects to scene
            this.addChild(this.background);
            this.addChild(this.playerMoneyLabel);
            this.addChild(this.jackpotLabel);
            this.addChild(this.playerBetLable);
            this.addChild(this.noticeLable);
            this.addChild(this.resetButton);
            this.addChild(this.quitButton);
            this.addChild(this.increaseBetButton);
            this.addChild(this.decreaseBetButton);
            this.addChild(this.spinButton);

            this.Main();
        }

        public Update(): void {
            
        }

        public Main(): void {
            // main functions for interact buttons
            this.resetButton.HoverOn();
            this.resetButton.on("click", this.resetAll);
            
            this.quitButton.HoverOn();
            this.quitButton.on("click", function(){
                config.GameConfig.SCENE_STATE = scenes.State.END;
            });
            
            this.increaseBetButton.HoverOn();
            this.increaseBetButton.on("click", this.increaseBet);
            
            this.decreaseBetButton.HoverOn();
            this.decreaseBetButton.on("click", this.decreaseBet);
            
            this.spinButton.HoverOn();
            this.spinButton.on("click", this.spin);
        }

        resetAll(): void {
            // TODO: add sound effects
            this.noticeLable.setText(" ");
            this.playerMoney = 1000;
            this.jackpot = 5000;
            this.playerBet = 10;
            this.playerBetLable.setText(this.playerBet + "");
            this.playerMoneyLabel.setText(this.playerMoney + "");
            this.jackpotLabel.setText(this.jackpot + "");
            if (this.spinImage1 && this.spinImage2 && this.spinImage3) {
                this.removeChild(this.spinImage1);
                this.removeChild(this.spinImage2);
                this.removeChild(this.spinImage3);
            }
        }

        increaseBet(): void {
            this.noticeLable.setText(" ");
            let betLevel = this.betRange.indexOf(this.playerBet);
            if (betLevel + 1 < this.betRange.length 
                && this.betRange[betLevel + 1] <= this.playerMoney) {
                betLevel += 1;
                this.playerBet = this.betRange[betLevel];
                this.playerBetLable.setText(this.playerBet + "");
            }
            else {
                this.noticeLable.setText("Reached Max Bet!");
            }
        }

        decreaseBet(): void {
            this.noticeLable.setText(" ");
            let betLevel = this.betRange.indexOf(this.playerBet);
            if ((betLevel - 1) >= 0) {
                betLevel -= 1;
                this.playerBet = this.betRange[betLevel];
                this.playerBetLable.setText(this.playerBet + "");
            }
            else {
                this.noticeLable.setText("Reach Min Bet!");
            }
        }

        spin(): void {
            this.noticeLable.setText(" ");
            if (this.spinImage1 && this.spinImage2 && this.spinImage3) {
                this.removeChild(this.spinImage1);
                this.removeChild(this.spinImage2);
                this.removeChild(this.spinImage3);
            }
            // TODO: animation to show spin
            if (this.playerMoney == 0 || this.playerBet > this.playerMoney) {
                this.noticeLable.setText("No more Money, Reset to play again?");
            }
            else {
                let value = this.Reels();
                this.spinResult1 = "./Assets/images/symbols/" + value[0] + ".png";
                this.spinResult2 = "./Assets/images/symbols/" + value[1] + ".png";
                this.spinResult3 = "./Assets/images/symbols/" + value[2] + ".png";
    
                this.spinImage1 = new objects.Button(this.spinResult1, 240, 430, true);
                this.addChild(this.spinImage1);
                this.spinImage2 = new objects.Button(this.spinResult2, 370, 430, true);
                this.addChild(this.spinImage2);
                this.spinImage3 = new objects.Button(this.spinResult3, 490, 430, true);
                this.addChild(this.spinImage3);
    
                this.determineWinnings();
                this.playerMoneyLabel.setText(this.playerMoney + "");
            }
        }

        resetMachineTally(): void {
            this.poop = 0;
            this.gift = 0;
            this.money = 0;
            this.moneyBag = 0;
            this.bicycle = 0;
            this.diamond = 0;
            this.house = 0;
            this.airplane = 0;
        }

        checkJackPot(): void {
            /* compare two random values */
            let jackPotTry = Math.floor(Math.random() * 51 + 1);
            let jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (jackPotTry == jackPotWin) {
                // TODO: cheat control to win jackpot & notify player
                this.playerMoney += this.jackpot;
                // TODO: add sound effects
                this.noticeLable.setText("You Won the $" + this.jackpot + " Jackpot!!");
                this.jackpot = 1000;
                this.jackpotLabel.setText(this.jackpot + "");
            }
        }

        showWinMessage(): void {
            this.playerMoney += this.winnings;
            // TODO: add sound effects
            this.noticeLable.setText("Win!! Keep Doing!");
            this.resetMachineTally();
            this.checkJackPot();
        }

        showLossMessage(): void {
            this.playerMoney -= this.playerBet;
            // TODO: add sound effects
            this.noticeLable.setText("Loss! Try Again!");
            this.resetMachineTally();
        }

        checkRange(value: number, lowerBounds: number, upperBounds: number) {
            if (value >= lowerBounds && value <= upperBounds) {
                return value;
            }
            else {
                return !value;
            }
        }

        Reels(): string[] {
            let betLine = ["", "", ""];
            let outcome = [0, 0, 0];
            // TODO: add sound effects
            for (let spin = 0; spin < 3; spin++) {
                outcome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outcome[spin]) {
                    case this.checkRange(outcome[spin], 1, 27):
                        betLine[spin] = "poop";
                        this.poop++;
                        break;
                    case this.checkRange(outcome[spin], 28, 37):
                        betLine[spin] = "gift";
                        this.gift++;
                        break;
                    case this.checkRange(outcome[spin], 38, 46):
                        betLine[spin] = "money";
                        this.money++;
                        break;
                    case this.checkRange(outcome[spin], 47, 54):
                        betLine[spin] = "moneyBag";
                        this.moneyBag++;
                        break;
                    case this.checkRange(outcome[spin], 55, 59):
                        betLine[spin] = "bicycle";
                        this.bicycle++;
                        break;
                    case this.checkRange(outcome[spin], 60, 62):
                        betLine[spin] = "diamond";
                        this.diamond++;
                        break;
                    case this.checkRange(outcome[spin], 63, 64):
                        betLine[spin] = "house";
                        this.house++;
                        break;
                    case this.checkRange(outcome[spin], 65, 65):
                        betLine[spin] = "airplane";
                        this.airplane++;
                        break;
                }
            }
            return betLine;
        }

        determineWinnings() {
            if (this.poop == 0) {
                if (this.gift == 3) {
                    this.winnings = this.playerBet * 10;
                }
                else if (this.money == 3) {
                    this.winnings = this.playerBet * 20;
                }
                else if (this.moneyBag == 3) {
                    this.winnings = this.playerBet * 30;
                }
                else if (this.bicycle == 3) {
                    this.winnings = this.playerBet * 40;
                }
                else if (this.diamond == 3) {
                    this.winnings = this.playerBet * 50;
                }
                else if (this.house == 3) {
                    this.winnings = this.playerBet * 75;
                }
                else if (this.airplane == 3) {
                    this.winnings = this.playerBet * 100;
                }
                else if (this.gift == 2) {
                    this.winnings = this.playerBet * 2;
                }
                else if (this.money == 2) {
                    this.winnings = this.playerBet * 2;
                }
                else if (this.moneyBag == 2) {
                    this.winnings = this.playerBet * 3;
                }
                else if (this.bicycle == 2) {
                    this.winnings = this.playerBet * 4;
                }
                else if (this.diamond == 2) {
                    this.winnings = this.playerBet * 5;
                }
                else if (this.house == 2) {
                    this.winnings = this.playerBet * 10;
                }
                else if (this.airplane == 2) {
                    this.winnings = this.playerBet * 20;
                }
                else if (this.airplane == 1) {
                    this.winnings = this.playerBet * 10;
                }
                else {
                    this.winnings = this.playerBet * 1;
                }
                this.showWinMessage();
            }
            else {
                this.showLossMessage();
            }
        }
    }
}