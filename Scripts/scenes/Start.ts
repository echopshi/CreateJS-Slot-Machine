module scenes {
  export class Start extends objects.Scene {
    // PRIVATE INSTANCE MEMEBERS
    startBackground: objects.Button;
    weclomeLabel: objects.Label;
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
      this.weclomeLabel = new objects.Label(
        "Weclome!",
        "42px",
        "Consolas",
        "Red",
        300,
        230,
        true
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
      this.addChild(this.weclomeLabel);
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
