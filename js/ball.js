class Ball{

    constructor(x,y){

        this.x=x;
        this.y=y;

        this.radius=15;

        this.dx=0;
        this.dy=0;

        this.friction=0.98;

    }

    update(){

        this.x+=this.dx;
        this.y+=this.dy;

        this.dx*=this.friction;
        this.dy*=this.friction;

    }

    draw(ctx){

        ctx.beginPath();
        ctx.fillStyle="white";
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();

    }

}