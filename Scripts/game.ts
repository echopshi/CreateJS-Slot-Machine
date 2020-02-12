let Game = (function() {
  // variable declarations
  let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
  let stage: createjs.Stage;

  let currentSceneState: scenes.State;
  let currentScene: objects.Scene;

  /**
   * This method initializes the CreateJS (EaselJS) Library
   * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
   */
  function Start(): void {
    console.log(
      `%c Game Started!`,
      "color: blue; font-size: 20px; font-weight: bold;"
    );
    stage = new createjs.Stage(canvas);
    createjs.Ticker.framerate = 60; // 60 FPS
    createjs.Ticker.on("tick", Update);
    stage.enableMouseOver(20);

    currentSceneState = scenes.State.NO_SCENE;
    config.GameConfig.SCENE_STATE = scenes.State.START;
  }

  /**
   * This function is triggered every frame (16ms)
   * The stage is then erased and redrawn
   */
  function Update(): void {
    if (currentSceneState != config.GameConfig.SCENE_STATE) {
      Main();
    }
    currentScene.Update();
    stage.update();
  }

  function Main(): void {
    console.log("Switching Scenes!");

    if (currentSceneState != scenes.State.NO_SCENE) {
      currentScene.removeAllChildren();
      stage.removeAllChildren();
    }

    switch (config.GameConfig.SCENE_STATE) {
      case scenes.State.START:
        currentScene = new scenes.Start();
        break;
      case scenes.State.PLAY:
        currentScene = new scenes.Play();
        break;
      case scenes.State.END:
        currentScene = new scenes.End();
        break;
    }

    stage.addChild(currentScene);
    currentSceneState = config.GameConfig.SCENE_STATE;
  }

  window.addEventListener("load", Start);
})();
