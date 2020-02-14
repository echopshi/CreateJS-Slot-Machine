"use strict";
/**
 * Author: Hang Li
 * Student Number: 300993981
 * Creation Date: Feb 14, 2020
 * Game App Description: CreateJS Slot Machine
 * Revision History: available in GitHub
 */
var Game = (function () {
    // variable declarations
    var canvas = document.getElementsByTagName("canvas")[0];
    var stage;
    var currentSceneState;
    var currentScene;
    var playScene;
    var startSound = "Start_sound";
    var backgroundSound = "Background_sound";
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log("%c Game Started!", "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        currentSceneState = scenes.State.NO_SCENE;
        config.GameConfig.SCENE_STATE = scenes.State.START;
        createjs.Sound.registerSound("./Assets/sounds/start.mp3", startSound);
        createjs.Sound.registerSound("./Assets/sounds/background.mp3", backgroundSound);
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        if (currentSceneState != config.GameConfig.SCENE_STATE) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    /**
     * This function is the main function which handles all the functionalities
     * In this case, it is switching the scenes based on the scene state defined in config file
     */
    function Main() {
        console.log("Switching Scenes!");
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.removeAllChildren();
            stage.removeAllChildren();
        }
        switch (config.GameConfig.SCENE_STATE) {
            case scenes.State.START:
                createjs.Sound.stop();
                currentScene = new scenes.Start();
                break;
            case scenes.State.PLAY:
                // play background music
                createjs.Sound.play(backgroundSound, { loop: -1, volume: 0.5 });
                playScene = new scenes.Play();
                currentScene = playScene;
                createjs.Sound.play(startSound);
                break;
            case scenes.State.END:
                createjs.Sound.stop();
                currentScene = new scenes.End();
                createjs.Sound.play(startSound);
                break;
        }
        stage.addChild(currentScene);
        currentSceneState = config.GameConfig.SCENE_STATE;
    }
    /**
     * add key event handler to make cheat code for jackpot
     * if player pressed "J" key, next time player wins, it will give Jackpot for sure
     */
    window.addEventListener("keydown", function (event) {
        if (currentSceneState == scenes.State.PLAY &&
            playScene &&
            event.keyCode == 74) {
            playScene.jackpotCheat = true;
        }
    });
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=game.js.map