class Fruit{
    constructor(canvas, jump){
        this.canvas = canvas;
        this.jump = jump;
        this.x;
        this.y;
        this.width = 58;
        this.height = 50;
        this.collision;

        this.img = new Image();
        this.img.src = 'img/sindria.png';

        if(!this.x && !this.y){
            this.generatePosition();
        }
    }
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    generatePosition(){
        this.x = Math.random() * (this.canvas.width - this.width);
        this.y = Math.random() * (this.canvas.height - this.height);

        this.collision = new Collision();
        this.collision.update(this.x, this.y, this.width, this.height);
    }
    play(){
        this.jump.play();
    }
}