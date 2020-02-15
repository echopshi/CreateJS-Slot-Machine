/**
 * Author: Hang Li
 * Student Number: 300993981
 * Creation Date: Feb 14, 2020
 * Game App Description: CreateJS Slot Machine
 * Revision History: available in GitHub
 */
module scenes {
  export class Play extends objects.Scene {
    // PRIVATE INSTANCE MEMEBERS
    private _playerMoney: number = 1000;
    private _jackpot: number = 5000;
    private _jackpotCheat: boolean = false;
    private _winnings: number = 0;
    private _playerBet: number = 10;
    private _betRange: number[] = [
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
    private _spinResult1: string = "";
    private _spinResult2: string = "";
    private _spinResult3: string = "";
    private _spinResult4: string = "";
    private _spinResult5: string = "";
    private _spinImage1: objects.Button;
    private _spinImage2: objects.Button;
    private _spinImage3: objects.Button;
    private _spinImage4: objects.Button;
    private _spinImage5: objects.Button;
    // count of symbols
    private _poop: number = 0;
    private _gift: number = 0;
    private _money: number = 0;
    private _moneyBag: number = 0;
    private _bicycle: number = 0;
    private _diamond: number = 0;
    private _house: number = 0;
    private _airplane: number = 0;
    // background image
    private _background: objects.Button;
    // button sound effects
    private _endSound: string = "Stop_sound";
    private _resetSound: string = "Reset_sound";
    private _betSound: string = "Bet_sound";
    private _winSound: string = "Win_sound";
    private _lossSound: string = "Loss_sound";
    private _jackpotSound: string = "Jackpot_sound";
    // user interact objects, label and button
    private _playerMoneyLabel: objects.Label;
    private _jackpotLabel: objects.Label;
    private _playerBetLabel: objects.Label;
    private _winningLabel: objects.Label;
    private _spinButton: objects.Button;
    private _resetButton: objects.Button;
    private _quitButton: objects.Button;
    private _decreaseBetButton: objects.Button;
    private _increaseBetButton: objects.Button;

    // PUBLIC PROPERTIES
    get jackpotCheat(): boolean {
      return this._jackpotCheat;
    }

    set jackpotCheat(newBoolean: boolean) {
      this._jackpotCheat = newBoolean;
    }

    // CONTRUCTOR
    constructor() {
      super();

      this._spinImage1 = new objects.Button();
      this._spinImage2 = new objects.Button();
      this._spinImage3 = new objects.Button();
      this._spinImage4 = new objects.Button();
      this._spinImage5 = new objects.Button();
      this._background = new objects.Button(
        "./Assets/images/playing-background.png",
        0,
        0,
        false
      );

      // initialize user interact objects
      this._playerMoneyLabel = new objects.Label(
        this._playerMoney + "",
        "42px",
        "Consolas",
        "Red",
        560,
        210,
        true
      );
      this._jackpotLabel = new objects.Label(
        this._jackpot + "",
        "42px",
        "Consolas",
        "Red",
        170,
        210,
        true
      );
      this._playerBetLabel = new objects.Label(
        "10",
        "36px",
        "Consolas",
        "Red",
        200,
        450,
        true
      );
      this._winningLabel = new objects.Label(
        " ",
        "42px",
        "Consolas",
        "Red",
        370,
        210,
        true
      );
      this._resetButton = new objects.Button(
        "./Assets/images/buttons/reset-button.png",
        770,
        40,
        true
      );
      this._quitButton = new objects.Button(
        "./Assets/images/buttons/close-button.png",
        870,
        40,
        true
      );
      this._increaseBetButton = new objects.Button(
        "./Assets/images/buttons/bet-up-arrow-button.png",
        120,
        450,
        true
      );
      this._decreaseBetButton = new objects.Button(
        "./Assets/images/buttons/bet-down-arrow-button.png",
        300,
        450,
        true
      );
      this._spinButton = new objects.Button(
        "./Assets/images/buttons/spin-button.png",
        600,
        450,
        true
      );

      this.Start();
    }

    // PRIVATE METHODS
    /**
     * set all labels and objects to default status
     */
    private resetAll(): void {
      createjs.Sound.play(this._resetSound);
      this._winningLabel.setText(" ");
      this._playerMoney = 1000;
      this._jackpot = 5000;
      this._playerBet = 10;
      this._playerBetLabel.setText(this._playerBet + "");
      this._playerMoneyLabel.setText(this._playerMoney + "");
      this._jackpotLabel.setText(this._jackpot + "");
      this.cleanImages();
    }

    /**
     * increase player's current bet when they click on button
     * checks the current bet level in bet range, and increase the bet amount by level
     */
    private increaseBet(): void {
      this._winningLabel.setText(" ");
      let betLevel = this._betRange.indexOf(this._playerBet);
      if (
        betLevel + 1 < this._betRange.length &&
        this._betRange[betLevel + 1] <= this._playerMoney
      ) {
        createjs.Sound.play(this._betSound);
        betLevel += 1;
        this._playerBet = this._betRange[betLevel];
        this._playerBetLabel.setText(this._playerBet + "");
      } else {
        createjs.Sound.play(this._endSound);
      }
    }

    /**
     * decrease player's current bet when they click on button
     * checks the current bet level in bet range, and decrease the bet amount by level
     */
    private decreaseBet(): void {
      this._winningLabel.setText(" ");
      let betLevel = this._betRange.indexOf(this._playerBet);
      if (betLevel - 1 >= 0) {
        createjs.Sound.play(this._betSound);
        betLevel -= 1;
        this._playerBet = this._betRange[betLevel];
        this._playerBetLabel.setText(this._playerBet + "");
      } else {
        createjs.Sound.play(this._endSound);
      }
    }

    /**
     * actual spin function, calls Reels() function
     * display the slot images
     * then determine win or loss
     */
    private spin(): void {
      // clean the previous winning label and images
      this._winningLabel.setText(" ");
      this.cleanImages();
      // check if player have enough money to bet
      if (this._playerMoney == 0 || this._playerBet > this._playerMoney) {
        createjs.Sound.play(this._endSound);
      } else {
        // get the result from Reels function
        let value = this.Reels();

        this._spinResult1 = "./Assets/images/symbols/" + value[0] + ".png";
        this._spinResult2 = "./Assets/images/symbols/" + value[1] + ".png";
        this._spinResult3 = "./Assets/images/symbols/" + value[2] + ".png";
        this._spinResult4 = "./Assets/images/symbols/" + value[3] + ".png";
        this._spinResult5 = "./Assets/images/symbols/" + value[4] + ".png";

        this._spinImage1 = new objects.Button(
          this._spinResult1,
          140,
          310,
          true
        );
        this.addChild(this._spinImage1);
        this._spinImage2 = new objects.Button(
          this._spinResult2,
          255,
          310,
          true
        );
        this.addChild(this._spinImage2);
        this._spinImage3 = new objects.Button(
          this._spinResult3,
          370,
          310,
          true
        );
        this.addChild(this._spinImage3);
        this._spinImage4 = new objects.Button(
          this._spinResult4,
          485,
          310,
          true
        );
        this.addChild(this._spinImage4);
        this._spinImage5 = new objects.Button(
          this._spinResult5,
          600,
          310,
          true
        );
        this.addChild(this._spinImage5);

        this.determineWinnings();
        this._playerMoneyLabel.setText(this._playerMoney + "");
      }
    }

    // clean the slot images if has any
    private cleanImages(): void {
      if (
        this._spinImage1 &&
        this._spinImage2 &&
        this._spinImage3 &&
        this._spinImage4 &&
        this._spinImage5
      ) {
        this.removeChild(this._spinImage1);
        this.removeChild(this._spinImage2);
        this.removeChild(this._spinImage3);
        this.removeChild(this._spinImage4);
        this.removeChild(this._spinImage5);
      }
    }

    // rest the number of symbol after each win or loss
    private resetMachineTally(): void {
      this._poop = 0;
      this._gift = 0;
      this._money = 0;
      this._moneyBag = 0;
      this._bicycle = 0;
      this._diamond = 0;
      this._house = 0;
      this._airplane = 0;
    }

    private checkJackPot(): void {
      /* compare two random values, if they are the same then got jackpot */
      let jackPotTry = Math.floor(Math.random() * 51 + 1);
      let jackPotWin = Math.floor(Math.random() * 51 + 1);
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
    }

    // display winning, add winning amount to player's balance
    private showWinMessage(): void {
      this._playerMoney += this._winnings;
      createjs.Sound.play(this._winSound);
      this._winningLabel.setText(this._winnings + "");
      this.resetMachineTally();
      this.checkJackPot();
    }

    // subtract player's bet amount from player's balance
    private showLossMessage(): void {
      this._playerMoney -= this._playerBet;
      createjs.Sound.play(this._lossSound);
      this.resetMachineTally();
    }

    // use to check the range of reels when using random number
    private checkRange(
      value: number,
      lowerBounds: number,
      upperBounds: number
    ) {
      if (value >= lowerBounds && value <= upperBounds) {
        return value;
      } else {
        return !value;
      }
    }

    /**
     * actual Reel functions
     * run 5 iterations to get the reel result
     * each time check the random result and match to the symbol
     */
    private Reels(): string[] {
      let betLine = ["", "", "", "", ""];
      let outcome = [0, 0, 0, 0, 0];
      for (let spin = 0; spin < 5; spin++) {
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
    }

    /**
     * defines the winning stage
     * if poop larger than or equals to 2, player will lose their bet amount
     * else, will check the winning stage for occurance of specific symbols
     * the biggest winning will be exact 5 airplanes to win 2000 times player's bet
     */
    private determineWinnings() {
      if (this._poop < 2) {
        if (this._gift == 5) {
          this._winnings = this._playerBet * 80;
        } else if (this._money == 5) {
          this._winnings = this._playerBet * 160;
        } else if (this._moneyBag == 5) {
          this._winnings = this._playerBet * 320;
        } else if (this._bicycle == 5) {
          this._winnings = this._playerBet * 480;
        } else if (this._diamond == 5) {
          this._winnings = this._playerBet * 560;
        } else if (this._house == 5) {
          this._winnings = this._playerBet * 640;
        } else if (this._airplane == 5) {
          this._winnings = this._playerBet * 2000;
        } else if (this._gift == 4) {
          this._winnings = this._playerBet * 20;
        } else if (this._money == 4) {
          this._winnings = this._playerBet * 40;
        } else if (this._moneyBag == 4) {
          this._winnings = this._playerBet * 80;
        } else if (this._bicycle == 4) {
          this._winnings = this._playerBet * 120;
        } else if (this._diamond == 4) {
          this._winnings = this._playerBet * 140;
        } else if (this._house == 4) {
          this._winnings = this._playerBet * 160;
        } else if (this._airplane == 4) {
          this._winnings = this._playerBet * 200;
        } else if (this._gift == 3) {
          this._winnings = this._playerBet * 5;
        } else if (this._money == 3) {
          this._winnings = this._playerBet * 10;
        } else if (this._moneyBag == 3) {
          this._winnings = this._playerBet * 20;
        } else if (this._bicycle == 3) {
          this._winnings = this._playerBet * 30;
        } else if (this._diamond == 3) {
          this._winnings = this._playerBet * 35;
        } else if (this._house == 3) {
          this._winnings = this._playerBet * 40;
        } else if (this._airplane == 3) {
          this._winnings = this._playerBet * 50;
        } else if (this._gift == 2) {
          this._winnings = this._playerBet * 2;
        } else if (this._money == 2) {
          this._winnings = this._playerBet * 2;
        } else if (this._moneyBag == 2) {
          this._winnings = this._playerBet * 3;
        } else if (this._bicycle == 2) {
          this._winnings = this._playerBet * 4;
        } else if (this._diamond == 2) {
          this._winnings = this._playerBet * 5;
        } else if (this._house == 2) {
          this._winnings = this._playerBet * 5;
        } else if (this._airplane == 2) {
          this._winnings = this._playerBet * 10;
        } else if (this._airplane == 1) {
          this._winnings = this._playerBet * 5;
        } else {
          this._winnings = this._playerBet * 1;
        }
        this.showWinMessage();
      } else {
        this.showLossMessage();
      }
    }

    // PUBLIC METHODS
    public Start(): void {
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
      createjs.Sound.registerSound(
        "./Assets/sounds/reset.mp3",
        this._resetSound
      );
      createjs.Sound.registerSound("./Assets/sounds/bet.mp3", this._betSound);
      createjs.Sound.registerSound("./Assets/sounds/win.mp3", this._winSound);
      createjs.Sound.registerSound("./Assets/sounds/loss.wav", this._lossSound);
      createjs.Sound.registerSound(
        "./Assets/sounds/jackpot.mp3",
        this._jackpotSound
      );

      this.Main();
    }

    public Update(): void {}

    // main functions for interact buttons
    public Main(): void {
      this._resetButton.HoverOn();
      this._resetButton.on("click", () => {
        this.resetAll();
      });

      this._quitButton.HoverOn();
      this._quitButton.on("click", function() {
        config.GameConfig.SCENE_STATE = scenes.State.END;
      });

      this._increaseBetButton.HoverOn();
      this._increaseBetButton.on("click", () => {
        this.increaseBet();
      });

      this._decreaseBetButton.HoverOn();
      this._decreaseBetButton.on("click", () => {
        this.decreaseBet();
      });

      this._spinButton.HoverOn();
      this._spinButton.on("click", () => {
        this.spin();
      });
    }
  }
}
