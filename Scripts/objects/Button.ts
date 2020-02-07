module objects
{
    export class Button extends createjs.Bitmap
    {
        constructor(imagePath:string,
            x:number = 0, y:number = 0, isCentered:boolean = false)
        {
            super(imagePath);
            this.on("mouseover", this.MouseOver);
            this.on("mouseout", this.MouseOut);

            this.image.addEventListener("load", ()=> {

                if(isCentered)
                {
                    this.regX = this.getBounds().width*0.5;
                    this.regY = this.getBounds().height*0.5;
                }

                this.x = x;
                this.y = y;
            });
        }

        MouseOver():void{
            console.log("mouse over");
            this.y += 5;
        }

        MouseOut():void{
            console.log("mouse out");
            this.y -= 5;
        }
        
    }
}