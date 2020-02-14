/**
 * Author: Hang Li
 * Student Number: 300993981
 * Creation Date: Feb 14, 2020
 * Game App Description: CreateJS Slot Machine
 * Revision History: available in GitHub
 */
module objects {
  export class Button extends createjs.Bitmap {
    constructor(
      imagePath: string = "./Assets/images/buttons/start-button.png",
      x: number = 0,
      y: number = 0,
      isCentered: boolean = false
    ) {
      super(imagePath);
      this.image.addEventListener("load", () => {
        if (isCentered) {
          this.regX = this.getBounds().width * 0.5;
          this.regY = this.getBounds().height * 0.5;
        }

        this.x = x;
        this.y = y;
      });
    }

    MouseOver(): void {
      this.alpha = 0.7;
    }

    MouseOut(): void {
      this.alpha = 1;
    }

    HoverOn(): void {
      this.on("mouseover", this.MouseOver);
      this.on("mouseout", this.MouseOut);
    }
  }
}
