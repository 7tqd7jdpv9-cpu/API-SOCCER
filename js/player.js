class Player{

    constructor(x,y){

        this.x=x;
        this.y=y;

        this.radius=25;

        this.speed=5;

        this.color="#0066ff";

    }

    draw(ctx){

        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();

    }

}