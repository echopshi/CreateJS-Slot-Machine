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
    private _startBackground: objects.Button;
    private _slotMachineGraphic: objects.Button;
    private _startButton: objects.Button;

    // PUBLIC PROPERTIES

    // CONTRUCTOR
    constructor() {
      super();

      this._startBackground = new objects.Button(
        "./Assets/images/start-background.png",
        0,
        0,
        false
      );
      this._slotMachineGraphic = new objects.Button(
        "./Assets/images/slotMachineHolder.png",
        280,
        200,
        false
      );
      this._startButton = new objects.Button(
        "./Assets/images/buttons/start-button.png",
        380,
        450,
        true
      );

      this.Start();
    }

    // PUBLIC METHODS
    public Start(): void {
      this.addChild(this._startBackground);
      this.addChild(this._slotMachineGraphic);
      this.addChild(this._startButton);

      this.Main();
    }

    public Update(): void {}

    public Main(): void {
      this._startButton.HoverOn();
      this._startButton.on("click", function() {
        config.GameConfig.SCENE_STATE = scenes.State.PLAY;
      });
    }
  }
}
