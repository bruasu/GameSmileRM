class Fruit{
    constructor(canvas, jump){
        this.canvas = canvas;
        this.jump = jump;
        this.x;
        this.y;
        this.width;
        this.height;
        this.collision;
        this.points = 1;

        this.img = new Image();
        
        if(!this.x && !this.y){               
            this.generatePosition();
        }
    }
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    generatePosition(){
        this.randomImage();     

        this.x = Math.random() * (this.canvas.width - this.width);
        this.y = Math.random() * (this.canvas.height - this.height);

        this.collision = new Collision();
        this.collision.update(this.x, this.y, this.width, this.height);
    }
    play(){
        this.jump.play();
    }
    randomImage(){
        let number = Math.ceil(Math.random() * 3);
        switch(number){
            case 1:
                this.img.src = 'img/sindria.png';
                this.width = 58;
                this.height = 50;
                this.points = 1;
                break;
            case 2:
                this.img.src = 'img/apple.png';
                this.width = 50;
                this.height = 55;
                this.points = 1.5;
                break;
            case 3:
                this.img.src = 'img/pear.png';
                this.width = 50;
                this.height = 50;
                this.points = 2;
                break;
        }
    }
}