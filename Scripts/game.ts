let Game = (function()
{
    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;

    let slotMachineExample:createjs.Bitmap;
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
        slotMachineExample = new createjs.Bitmap("/Assets/images/winning-slots.jpg");
        stage.addChild(slotMachineExample);

        
    }
    
    window.addEventListener('load', Start);
})();