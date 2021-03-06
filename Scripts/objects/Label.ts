/**
 * Author: Hang Li
 * Student Number: 300993981
 * Creation Date: Feb 14, 2020
 * Game App Description: CreateJS Slot Machine
 * Revision History: available in GitHub
 */
module objects {
  export class Label extends createjs.Text {
    constructor(
      public labelString: string = "empty label",
      public fontSize: string = "12px",
      public fontFamily: string = "Consolas",
      public fontColour: string = "#000000",
      x: number = 0,
      y: number = 0,
      public isCentered: boolean = false
    ) {
      super(labelString, fontSize + " " + fontFamily, fontColour);

      if (isCentered) {
        this.regX = this.getBounds().width * 0.5;
        this.regY = this.getMeasuredLineHeight() * 0.5;
      }

      this.x = x;
      this.y = y;
    }

    public setText(newText: string) {
      this.text = newText;
    }
  }
}
