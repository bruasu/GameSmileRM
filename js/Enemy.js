class Enemy{
    constructor(canvas){
        this.canvas = canvas;
        this.x;
        this.y;
        this.width = 30;
        this.height = 30;
        this.limitX = null;
        this.limitY = null;
        this.color;
        this.speed = 2;
        this.direction = null;
        this.collision = false;

        this.generatePosition();
        this.color();       
        this.movePosition();

    }
    draw(ctx){   
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
        this.limits();
        this.move();
    }
    generatePosition(){
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;     
        
        this.limits(); 

        if(this.limitX == 'left'){
            this.x = this.canvas.width - this.width;
        }
        if(this.limitX == 'right'){
            this.x = this.width;
        }
        if(this.limitY == 'top'){
            this.y = this.height;
        }
        if(this.limitY == 'botton'){
            this.y = this.canvas.height - this.height;
        }
    }
    color(){
        let number = [];
    
        for (var i = 0; i < 3; i++) {
            number[i] = Math.floor(Math.random() * 255);
        }
    
        this.color = 'rgb('+number[0]+','+number[1]+','+number[2]+')';
    }
    limits(){
        if(this.x > this.canvas.width - this.width){
            this.limitX = 'left';
        }
        else if(this.x < this.width){
            this.limitX = 'right';
        }
        if(this.y > this.canvas.height - this.height){
            this.limitY = 'botton';
        }
        else if(this.y < this.height){
            this.limitY = 'top';
        }

        if(this.x > this.canvas.width){
            this.collision = true;
        }
        else if(this.x < 0){
            this.collision = true;
        }
        if(this.y > this.canvas.height){
            this.collision = true;
        }
        else if(this.y < 0){
            this.collision = true;
        }
    }
    movePosition(){
        if(this.y > this.canvas.height / 2){
            this.direction = 'top';
        }
        if(this.y < this.canvas.height / 2){
            this.direction = 'botton';
        }
        if(this.x > this.canvas.width / 2){
            this.direction = 'right';
        }
        if(this.x > this.canvas.width / 2){
            this.direction = 'left';
        }
    }
    move(){
        if(this.direction == 'top'){
            this.y -= this.speed;
        }else if(this.direction == 'botton'){
            this.y += this.speed;
        }else if(this.direction == 'right'){
            this.x += this.speed;
        }else if(this.direction == 'left'){
            this.x -= this.speed;
        }

    }
}