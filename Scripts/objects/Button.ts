module objects
{
    export class Button extends createjs.Bitmap
    {
        constructor(imagePath:string = './Assets/images/button.png',
            x:number = 0, y:number = 0, isCentered:boolean = false)
            {
                super(imagePath);

                this.image.addEventListener("load", ()=> {

                    if(isCentered)
                    {
                        this.regX = this.getBounds().width*0.5;
                        this.regY = this.getBounds().height*0.5;
                    }

                    this.x = x;
                    this.y = y;
                })
            }
    }
}