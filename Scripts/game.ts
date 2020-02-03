let Game = (function()
{
    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    let playerMoney:number = 1000;
    let jackpot:number = 5000;
    let playerBet:number = 10;
    let betRange:number[] = [10,20,30,40,50,100,150,200,250,300,400,500,600,700,800,900,1000];
    let winnings:number = 0;
    let spinResult1:string = "";
    let spinResult2:string = "";
    let spinResult3:string = "";
    let poop:number = 0;
    let gift:number = 0;
    let money:number = 0;
    let moneyBag:number = 0;
    let bicycle:number = 0;
    let diamond:number = 0;
    let house:number = 0;
    let airplane:number = 0;

    // user interact objects, label and button
    let userMoneyLabel:objects.Label;
    let jackpotLabel:objects.Label;
    let playerBetLable:objects.Label;
    let spinButton:objects.Button;
    let resetButton:objects.Button;
    let quitButton:objects.Button;
    let decreaseBetButton:objects.Button;
    let increaseBetButton:objects.Button;


    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start():void
    {
        console.log(`%c Game Started!`, "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on('tick', Update);
        Main();
    }

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn 
     */
    function Update():void
    {
        
        stage.update();
    }

    function Main():void
    {
        // TODO: include a start screen here


        console.log("enter first stage!");
        defineObjects();
    }

    function defineObjects():void{
        let userMoneyLabel = new objects.Label("1000", "42px", "Consolas", "#FCE98B", 470, 230, true);
        stage.addChild(userMoneyLabel);

        let jackpotLabel = new objects.Label("5000", "42px", "Consolas", "#FCE98B", 300, 230, true);
        stage.addChild(jackpotLabel);

        let playerBetLable = new objects.Label("10", "32px", "Consolas", "#FCE98B", 100, 400, true);
        stage.addChild(playerBetLable);

        let resetButton = new objects.Button("./Assets/images/buttons/reset-button.png", 80, 70, true);
        stage.addChild(resetButton);
        resetButton.on("click", function(){resetAll();});

        let quitButton = new objects.Button("./Assets/images/buttons/close-button.png", 850, 70, true);
        stage.addChild(quitButton);
        quitButton.on("click", ()=>{quit();});

        let increaseBetButton = new objects.Button("./Assets/images/buttons/bet-up-arrow-button.png", 100, 335, true);
        stage.addChild(increaseBetButton);
        increaseBetButton.on("click", function() {
            let betLevel = betRange.indexOf(playerBet);
            if(betLevel + 1 < betRange.length && betRange[betLevel] <= playerMoney){
                betLevel += 1;
                playerBet = betRange[betLevel];
                playerBetLable.setText(playerBet+"");
            }
            else{
                //TODO: tell player the bet is biggest and cannot increase more
            }
            
        });

        let decreaseBetButton = new objects.Button("./Assets/images/buttons/bet-down-arrow-button.png", 100, 465, true);
        stage.addChild(decreaseBetButton);
        decreaseBetButton.on("click", function() {
            let betLevel = betRange.indexOf(playerBet);
            if((betLevel - 1) >= 0 && betRange[betLevel] <= playerMoney){
                betLevel -= 1;
                playerBet = betRange[betLevel];
                playerBetLable.setText(playerBet+"");
            }
            else{
                //TODO: tell player the bet is lowest and cannot decrease more
            }
        });

        let spinButton = new objects.Button("./Assets/images/buttons/spin-button.png", 640, 400, true);
        stage.addChild(spinButton);
        spinButton.on("click", ()=>{spin();});
        
        let button = new objects.Button("./Assets/images/buttons/clickMeButton.png");
        //stage.addChild(button);
    }

    function spin():void{
        console.log("spin!");
        if(playerMoney == 0){
            //TODO: ask if want to play again
            resetAll();
        }
        else if (playerBet > playerMoney){
            // TODO: notify user no more money for this bet
        }
        else{
            //let value = this.Reels();
            //spinResult1 = value[0];
            //spinResult2 = value[1];
            //spinResult3 = value[2];
            // TODO: show the images of results

            //this.determineWinnings();
        }
    }

    function quit():void{
        console.log("quit!");
    }

    /* Utility function to reset the player stats */
    function resetAll():void{
        console.log("reset!");
        let playerMoney = 1000;
        let jackpot = 5000;
        let playerBet = 0;
        // TODO: clean the images on slot
    }

    /* Utility function to reset all fruit tallies */
    function resetMachineTally():void{
        let poop = 0;
        let gift = 0;
        let money= 0;
        let moneyBag = 0;
        let bicycle = 0;
        let diamond = 0;
        let house = 0;
        let airplane = 0;
    }
    
    /* Check to see if the player won the jackpot */
    function checkJackPot():void {
    /* compare two random values */
    let jackPotTry = Math.floor(Math.random() * 51 + 1);
    let jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        // TODO: cheat control to win jackpot & notify player
        console.log("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }

    /* Utility function to show a win message and increase player money */
    function showWinMessage():void {
        playerMoney += winnings;
        // TODO: notify player
        resetMachineTally();
        checkJackPot();
    }

    /* Utility function to show a loss message and reduce player money */
    function showLossMessage():void{
        playerMoney -= playerBet;
        // TODO: notify player
        resetMachineTally();
    }

    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value:number, lowerBounds:number, upperBounds:number) {
        if (value >= lowerBounds && value <= upperBounds)
        {
            return value;
        }
        else {
            return !value;
        }
    }

    /* When this function is called it determines the betLine results. */
    function Reels():string[]{
        let betLine = ["", "", ""];
        let outcome = [0,0,0];

        for(let spin = 0; spin < 3; spin++){
            outcome[spin] = Math.floor((Math.random()*65)+1);
            switch(outcome[spin]){
                case checkRange(outcome[spin], 1, 27):
                    betLine[spin] = "poop";
                    poop++;
                    break;
                case checkRange(outcome[spin], 28, 37):
                    betLine[spin] = "gift";
                    gift++;
                    break;
                case checkRange(outcome[spin], 38, 46):
                    betLine[spin] = "money";
                    money++;
                    break;
                case checkRange(outcome[spin], 47, 54):
                    betLine[spin] = "moneyBag";
                    moneyBag++;
                    break;
                case checkRange(outcome[spin], 55, 59):
                    betLine[spin] = "bicycle";
                    bicycle++;
                    break;
                case checkRange(outcome[spin], 60, 62):
                    betLine[spin] = "diamond";
                    diamond++;
                    break;
                case checkRange(outcome[spin], 63, 64):
                    betLine[spin] = "house";
                    house++;
                    break;
                case checkRange(outcome[spin], 65, 65):
                    betLine[spin] = "airplane";
                    airplane++;
                    break;
            }
        }
        return betLine;
    }

    /* This function calculates the player's winnings, if any */
    function determineWinnings(){
        if(poop == 0){
            if(gift == 3){
                winnings = playerBet * 10;
            }
            else if(money == 3){
                winnings = playerBet * 20;
            }
            else if(moneyBag == 3){
                winnings = playerBet * 30;
            }
            else if(bicycle == 3){
                winnings = playerBet * 40;
            }
            else if(diamond == 3){
                winnings = playerBet * 50;
            }
            else if(house == 3){
                winnings = playerBet * 75;
            }
            else if(airplane == 3){
                winnings = playerBet * 100;
            }
            else if(gift == 2){
                winnings = playerBet * 2;
            }
            else if(money == 2){
                winnings = playerBet * 2;
            }
            else if(moneyBag == 2){
                winnings = playerBet * 3;
            }
            else if(bicycle == 2){
                winnings = playerBet * 4;
            }
            else if(diamond == 2){
                winnings = playerBet * 5;
            }
            else if(house ==2){
                winnings = playerBet * 10;
            }
            else if(airplane == 2){
                winnings = playerBet * 20;
            }
            else if(airplane == 1){
                winnings = playerBet * 10;
            }
            else {
                winnings = playerBet * 1;
            }
            showWinMessage();
        }
        else{
            showLossMessage();
        }
    }
    
}

    window.addEventListener('load', Start);
})();