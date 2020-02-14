/**
 * Author: Hang Li
 * Student Number: 300993981
 * Creation Date: Feb 14, 2020
 * Game App Description: CreateJS Slot Machine
 * Revision History: available in GitHub
 */
module scenes {
  export class Start extends objects.Scene {
    // PRIVATE INSTANCE MEMEBERS
    startBackground: objects.Button;
    slotMachineGraphic: objects.Button;
    startButton: objects.Button;

    // PUBLIC PROPERTIES

    // CONTRUCTOR
    constructor() {
      super();

      this.startBackground = new objects.Button(
        "./Assets/images/start-background.png",
        0,
        0,
        false
      );
      this.slotMachineGraphic = new objects.Button(
        "./Assets/images/slotMachineHolder.PNG",
        280,
        200,
        false
      );
      this.startButton = new objects.Button(
        "./Assets/images/buttons/start-button.png",
        380,
        450,
        true
      );

      this.Start();
    }

    // PUBLIC METHODS
    public Start(): void {
      this.addChild(this.startBackground);
      this.addChild(this.slotMachineGraphic);
      this.addChild(this.startButton);

      this.Main();
    }

    public Update(): void {}

    public Main(): void {
      this.startButton.HoverOn();
      this.startButton.on("click", function() {
        config.GameConfig.SCENE_STATE = scenes.State.PLAY;
      });
    }
  }
}
