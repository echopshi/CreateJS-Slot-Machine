let Game = (function()
{
    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    let playerMoney:number = 1000;
    let jackpot:number = 5000;
    let playerBet:number = 0;
    let spinResult:string = "";
    let machines:string = "";
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
    let currentBetLable:objects.Label;
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
        let userMoneyLabel = new objects.Label("$1000", "42px", "Consolas", "#FCE98B", 470, 230, true);
        stage.addChild(userMoneyLabel);

        let jackpotLabel = new objects.Label("$5000", "42px", "Consolas", "#FCE98B", 300, 230, true);
        stage.addChild(jackpotLabel);

        let currentBetLable = new objects.Label("10", "32px", "Consolas", "#FCE98B", 100, 400, true);
        stage.addChild(currentBetLable);

        let resetButton = new objects.Button("./Assets/images/buttons/reset-button.png", 80, 70, true);
        stage.addChild(resetButton);

        let quitButton = new objects.Button("./Assets/images/buttons/close-button.png", 850, 70, true);
        stage.addChild(quitButton);

        let increaseBetButton = new objects.Button("./Assets/images/buttons/bet-up-arrow-button.png", 100, 335, true);
        stage.addChild(increaseBetButton);

        let decreaseBetButton = new objects.Button("./Assets/images/buttons/bet-down-arrow-button.png", 100, 465, true);
        stage.addChild(decreaseBetButton);

        let spinButton = new objects.Button("./Assets/images/buttons/spin-button.png", 640, 400, true);
        stage.addChild(spinButton);
        
        let button = new objects.Button("./Assets/images/buttons/clickMeButton.png");
        //stage.addChild(button);
        
    }

    
    
    window.addEventListener('load', Start);
})();