module scenes {
  export class Play extends objects.Scene {
    // PRIVATE INSTANCE MEMEBERS
    playerMoney: number = 500;
    jackpot: number = 5000;
    playerBet: number = 10;
    betRange: number[] = [
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
    winnings: number = 0;
    spinResult1: string = "";
    spinResult2: string = "";
    spinResult3: string = "";
    spinResult4: string = "";
    spinResult5: string = "";
    spinImage1: objects.Button;
    spinImage2: objects.Button;
    spinImage3: objects.Button;
    spinImage4: objects.Button;
    spinImage5: objects.Button;
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
    playerBetLabel: objects.Label;
    winningLabel: objects.Label;
    spinButton: objects.Button;
    resetButton: objects.Button;
    quitButton: objects.Button;
    decreaseBetButton: objects.Button;
    increaseBetButton: objects.Button;

    // PUBLIC PROPERTIES

    // CONTRUCTOR
    constructor() {
      super();

      this.spinImage1 = new objects.Button();
      this.spinImage2 = new objects.Button();
      this.spinImage3 = new objects.Button();
      this.spinImage4 = new objects.Button();
      this.spinImage5 = new objects.Button();
      this.background = new objects.Button(
        "./Assets/images/playing-background.png",
        0,
        0,
        false
      );

      // initialize user interact objects
      this.playerMoneyLabel = new objects.Label(
        this.playerMoney + "",
        "42px",
        "Consolas",
        "Red",
        560,
        210,
        true
      );
      this.jackpotLabel = new objects.Label(
        this.jackpot + "",
        "42px",
        "Consolas",
        "Red",
        170,
        210,
        true
      );
      this.playerBetLabel = new objects.Label(
        "10",
        "36px",
        "Consolas",
        "Red",
        200,
        450,
        true
      );
      this.winningLabel = new objects.Label(
        " ",
        "42px",
        "Consolas",
        "Red",
        370,
        210,
        true
      );
      this.resetButton = new objects.Button(
        "./Assets/images/buttons/reset-button.png",
        770,
        40,
        true
      );
      this.quitButton = new objects.Button(
        "./Assets/images/buttons/close-button.png",
        870,
        40,
        true
      );
      this.increaseBetButton = new objects.Button(
        "./Assets/images/buttons/bet-up-arrow-button.png",
        120,
        450,
        true
      );
      this.decreaseBetButton = new objects.Button(
        "./Assets/images/buttons/bet-down-arrow-button.png",
        300,
        450,
        true
      );
      this.spinButton = new objects.Button(
        "./Assets/images/buttons/spin-button.png",
        600,
        450,
        true
      );

      this.Start();
    }

    // PUBLIC METHODS
    public Start(): void {
      // add all interact objects to scene
      this.addChild(this.background);
      this.addChild(this.playerMoneyLabel);
      this.addChild(this.jackpotLabel);
      this.addChild(this.playerBetLabel);
      this.addChild(this.winningLabel);
      this.addChild(this.resetButton);
      this.addChild(this.quitButton);
      this.addChild(this.increaseBetButton);
      this.addChild(this.decreaseBetButton);
      this.addChild(this.spinButton);

      this.Main();
    }

    public Update(): void {}

    public Main(): void {
      // main functions for interact buttons
      this.resetButton.HoverOn();
      this.resetButton.on("click", () => {
        this.resetAll();
      });

      this.quitButton.HoverOn();
      this.quitButton.on("click", function() {
        config.GameConfig.SCENE_STATE = scenes.State.END;
      });

      this.increaseBetButton.HoverOn();
      this.increaseBetButton.on("click", () => {
        this.increaseBet();
      });

      this.decreaseBetButton.HoverOn();
      this.decreaseBetButton.on("click", () => {
        this.decreaseBet();
      });

      this.spinButton.HoverOn();
      this.spinButton.on("click", () => {
        this.spin();
      });
    }

    // set all labels and objects to default status
    resetAll(): void {
      // TODO: add sound effects
      this.winningLabel.setText(" ");
      this.playerMoney = 1000;
      this.jackpot = 5000;
      this.playerBet = 10;
      this.playerBetLabel.setText(this.playerBet + "");
      this.playerMoneyLabel.setText(this.playerMoney + "");
      this.jackpotLabel.setText(this.jackpot + "");
      this.cleanImages();
    }

    // increase player's current bet when they click on button
    // checks the current bet level in bet range, and increase the bet amount by level
    increaseBet(): void {
      this.winningLabel.setText(" ");
      let betLevel = this.betRange.indexOf(this.playerBet);
      if (
        betLevel + 1 < this.betRange.length &&
        this.betRange[betLevel + 1] <= this.playerMoney
      ) {
        betLevel += 1;
        this.playerBet = this.betRange[betLevel];
        this.playerBetLabel.setText(this.playerBet + "");
      } else {
        // TODO: add sound effects
      }
    }

    // decrease player's current bet when they click on button
    // checks the current bet level in bet range, and decrease the bet amount by level
    decreaseBet(): void {
      this.winningLabel.setText(" ");
      let betLevel = this.betRange.indexOf(this.playerBet);
      if (betLevel - 1 >= 0) {
        betLevel -= 1;
        this.playerBet = this.betRange[betLevel];
        this.playerBetLabel.setText(this.playerBet + "");
      } else {
        // TODO: add sound effects
      }
    }

    // actual spin function, calls Reels() function, display the slot images
    // and then determine win or loss
    spin(): void {
      this.winningLabel.setText(" ");
      this.cleanImages();
      if (this.playerMoney == 0 || this.playerBet > this.playerMoney) {
        // TODO: add disabled effect
      } else {
        let value = this.Reels();

        this.spinResult1 = "./Assets/images/symbols/" + value[0] + ".png";
        this.spinResult2 = "./Assets/images/symbols/" + value[1] + ".png";
        this.spinResult3 = "./Assets/images/symbols/" + value[2] + ".png";
        this.spinResult4 = "./Assets/images/symbols/" + value[3] + ".png";
        this.spinResult5 = "./Assets/images/symbols/" + value[4] + ".png";

        this.spinImage1 = new objects.Button(this.spinResult1, 140, 310, true);
        this.addChild(this.spinImage1);
        this.spinImage2 = new objects.Button(this.spinResult2, 255, 310, true);
        this.addChild(this.spinImage2);
        this.spinImage3 = new objects.Button(this.spinResult3, 370, 310, true);
        this.addChild(this.spinImage3);
        this.spinImage4 = new objects.Button(this.spinResult4, 485, 310, true);
        this.addChild(this.spinImage4);
        this.spinImage5 = new objects.Button(this.spinResult5, 600, 310, true);
        this.addChild(this.spinImage5);

        this.determineWinnings();
        this.playerMoneyLabel.setText(this.playerMoney + "");
      }
    }

    // clean the slot images if has any
    cleanImages(): void {
      if (
        this.spinImage1 &&
        this.spinImage2 &&
        this.spinImage3 &&
        this.spinImage4 &&
        this.spinImage5
      ) {
        this.removeChild(this.spinImage1);
        this.removeChild(this.spinImage2);
        this.removeChild(this.spinImage3);
        this.removeChild(this.spinImage4);
        this.removeChild(this.spinImage5);
      }
    }

    // rest the number of symbol after each win or loss
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
        this.jackpot = 1000;
        this.jackpotLabel.setText(this.jackpot + "");
      }
    }

    // display winning, add winning amount to player's balance
    showWinMessage(): void {
      this.playerMoney += this.winnings;
      // TODO: add sound effects
      this.winningLabel.setText(this.winnings + "");
      this.resetMachineTally();
      this.checkJackPot();
    }

    // subtract player's bet amount from player's balance
    showLossMessage(): void {
      this.playerMoney -= this.playerBet;
      // TODO: add sound effects
      this.resetMachineTally();
    }

    // use to check the range of reels when using random number
    checkRange(value: number, lowerBounds: number, upperBounds: number) {
      if (value >= lowerBounds && value <= upperBounds) {
        return value;
      } else {
        return !value;
      }
    }

    // actual Reel functions
    // iteration 5 times to get the reel result
    // each time check the random result and match to the symbol
    Reels(): string[] {
      let betLine = ["", "", "", "", ""];
      let outcome = [0, 0, 0, 0, 0];
      // TODO: add sound effects
      for (let spin = 0; spin < 5; spin++) {
        outcome[spin] = Math.floor(Math.random() * 77 + 1);
        switch (outcome[spin]) {
          case this.checkRange(outcome[spin], 1, 40):
            betLine[spin] = "poop";
            this.poop++;
            break;
          case this.checkRange(outcome[spin], 41, 53):
            betLine[spin] = "gift";
            this.gift++;
            break;
          case this.checkRange(outcome[spin], 54, 60):
            betLine[spin] = "money";
            this.money++;
            break;
          case this.checkRange(outcome[spin], 61, 66):
            betLine[spin] = "moneyBag";
            this.moneyBag++;
            break;
          case this.checkRange(outcome[spin], 67, 71):
            betLine[spin] = "bicycle";
            this.bicycle++;
            break;
          case this.checkRange(outcome[spin], 72, 74):
            betLine[spin] = "diamond";
            this.diamond++;
            break;
          case this.checkRange(outcome[spin], 75, 76):
            betLine[spin] = "house";
            this.house++;
            break;
          case this.checkRange(outcome[spin], 77, 77):
            betLine[spin] = "airplane";
            this.airplane++;
            break;
        }
      }
      return betLine;
    }

    // defines the winning stage
    // if poop bigger than or equals to 2, player will lose their bet amount
    // else, will check the winning stage for occurance of specific symbols
    // the biggest winning will be exact 5 airplanes to win 2000 times player's bet
    determineWinnings() {
      if (this.poop < 2) {
        if (this.gift == 5) {
          this.winnings = this.playerBet * 80;
        } else if (this.money == 5) {
          this.winnings = this.playerBet * 160;
        } else if (this.moneyBag == 5) {
          this.winnings = this.playerBet * 320;
        } else if (this.bicycle == 5) {
          this.winnings = this.playerBet * 480;
        } else if (this.diamond == 5) {
          this.winnings = this.playerBet * 560;
        } else if (this.house == 5) {
          this.winnings = this.playerBet * 640;
        } else if (this.airplane == 5) {
          this.winnings = this.playerBet * 2000;
        } else if (this.gift == 4) {
          this.winnings = this.playerBet * 20;
        } else if (this.money == 4) {
          this.winnings = this.playerBet * 40;
        } else if (this.moneyBag == 4) {
          this.winnings = this.playerBet * 80;
        } else if (this.bicycle == 4) {
          this.winnings = this.playerBet * 120;
        } else if (this.diamond == 4) {
          this.winnings = this.playerBet * 140;
        } else if (this.house == 4) {
          this.winnings = this.playerBet * 160;
        } else if (this.airplane == 4) {
          this.winnings = this.playerBet * 200;
        } else if (this.gift == 3) {
          this.winnings = this.playerBet * 5;
        } else if (this.money == 3) {
          this.winnings = this.playerBet * 10;
        } else if (this.moneyBag == 3) {
          this.winnings = this.playerBet * 20;
        } else if (this.bicycle == 3) {
          this.winnings = this.playerBet * 30;
        } else if (this.diamond == 3) {
          this.winnings = this.playerBet * 35;
        } else if (this.house == 3) {
          this.winnings = this.playerBet * 40;
        } else if (this.airplane == 3) {
          this.winnings = this.playerBet * 50;
        } else if (this.gift == 2) {
          this.winnings = this.playerBet * 2;
        } else if (this.money == 2) {
          this.winnings = this.playerBet * 2;
        } else if (this.moneyBag == 2) {
          this.winnings = this.playerBet * 3;
        } else if (this.bicycle == 2) {
          this.winnings = this.playerBet * 4;
        } else if (this.diamond == 2) {
          this.winnings = this.playerBet * 5;
        } else if (this.house == 2) {
          this.winnings = this.playerBet * 10;
        } else if (this.airplane == 2) {
          this.winnings = this.playerBet * 20;
        } else if (this.airplane == 1) {
          this.winnings = this.playerBet * 10;
        } else {
          this.winnings = this.playerBet * 1;
        }
        this.showWinMessage();
      } else {
        this.showLossMessage();
      }
    }
  }
}
