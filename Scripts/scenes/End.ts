/**
 * Author: Hang Li
 * Student Number: 300993981
 * Creation Date: Feb 14, 2020
 * Game App Description: CreateJS Slot Machine
 * Revision History: available in GitHub
 */
module scenes {
  export class End extends objects.Scene {
    // PRIVATE INSTANCE MEMEBERS
    endBackground: objects.Button;
    thankyouLabel: objects.Label;
    restartButton: objects.Button;

    // PUBLIC PROPERTIES

    // CONTRUCTOR
    constructor() {
      super();

      this.endBackground = new objects.Button(
        "./Assets/images/start-background.png",
        0,
        0,
        false
      );
      this.thankyouLabel = new objects.Label(
        "Thank You for playing!",
        "42px",
        "Consolas",
        "Red",
        380,
        230,
        true
      );
      this.restartButton = new objects.Button(
        "./Assets/images/buttons/restart-button.png",
        380,
        450,
        true
      );

      this.Start();
    }

    // PUBLIC METHODS
    public Start(): void {
      this.addChild(this.endBackground);
      this.addChild(this.thankyouLabel);
      this.addChild(this.restartButton);
      this.Main();
    }
    public Update(): void {}
    public Main(): void {
      this.restartButton.HoverOn();
      this.restartButton.on("click", function() {
        config.GameConfig.SCENE_STATE = scenes.State.PLAY;
      });
    }
  }
}
