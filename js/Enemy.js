class Enemy{
    constructor(canvas, area){
        this.canvas = canvas;
        this.area = area;
        this.x;
        this.y;
        this.width = 30;
        this.height = 30;
        this.color;
        this.speed = 1.5;
        this.direction = null;
        this.collisionCanvas = false;
        
        this.generatePosition(area);
        this.color();       
    }
    draw(ctx){   
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
        this.limits();
        this.move();
    }
    generatePosition(area){

        const generateCoordinates = () => {
            let numberrandom = Math.ceil(Math.random() * 4);

            const getRandomInt =(min, max) => {
                return Math.floor(Math.random() * (max - min) + min);
            }

            switch(numberrandom){
                case 1: //top
                    this.y = getRandomInt(0, this.canvas.height * 0.20);  
                    this.x = getRandomInt(0, this.canvas.width);
                    break;
                case 2: //botton
                    this.y = getRandomInt(this.canvas.height * 0.80, this.canvas.height);  
                    this.x = getRandomInt(0, this.canvas.width);
                    break;
                case 3: // left
                    this.y = getRandomInt(this.canvas.height * 0.20, this.canvas.height * 0.80);  
                    this.x = getRandomInt(0, this.canvas.width * 0.20);
                    break;
                case 4: //rigth
                    this.y = getRandomInt(this.canvas.height * 0.20, this.canvas.height * 0.80);  
                    this.x = getRandomInt(this.canvas.width * 0.80, this.canvas.width);
                    break;
            }
        }
        
        generateCoordinates();

        //at the moment of creation
        let collision = new Collision();
        collision.update(this.x, this.y, this.width, this.height);
        //console.log(collision);
        for(let i = 0; i < area.length; i++){  
            if(collision.cross(area[i])){
                this.direction = area[i].name;
                //console.log(area[i].name);
                break;
            }
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
        
        if(this.x > this.canvas.width){
            this.collisionCanvas = true;
        }
        else if(this.x < 0){
            this.collisionCanvas = true;
        }
        if(this.y > this.canvas.height){
            this.collisionCanvas = true;
        }
        else if(this.y < 0){
            this.collisionCanvas = true;
        }
    }
    move(){
        if(this.direction == 'top'){
            this.y += this.speed;
        }else if(this.direction == 'botton'){
            this.y -= this.speed;
        }else if(this.direction == 'right'){
            this.x -= this.speed;
        }else if(this.direction == 'left'){
            this.x += this.speed;
        }else if(this.direction == 'top-left'){
            this.x += this.speed;
            this.y += this.speed;
        }else if(this.direction == 'top-right'){
            this.x -= this.speed;
            this.y += this.speed;            
        }else if(this.direction == 'botton-right'){
            this.x -= this.speed;
            this.y -= this.speed;
        }else if(this.direction == 'botton-left'){
            this.x += this.speed;
            this.y -= this.speed;
        }
        
    }
}