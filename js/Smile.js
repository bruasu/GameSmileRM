class Smile{
    constructor(canvas){
        this.canvas = canvas;
        this.x = 70;
        this.y = 70;
        this.radius = 30;
        this.speed = 5;
        this.collision = new Collision();
        this.score = 0;
    }
    draw(ctx){
        //circle
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.arc(this.x, this.y, this.radius, 0 ,(Math.PI / 180) * 360, false);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        //eje left
        const eyeRadius = 5;

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.arc(this.x - (eyeRadius * 2), this.y - eyeRadius, eyeRadius, 0, (Math.PI / 180) * 360, false);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        //eje rigth

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.arc(this.x + (eyeRadius * 2), this.y - eyeRadius, eyeRadius, 0, (Math.PI / 180) * 360, false);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        //mouth

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.arc(this.x, this.y, this.radius -7, (Math.PI / 180) * 160, (Math.PI / 180) * 380, true);
        ctx.stroke();
        ctx.closePath();

        //score
        ctx.font = "30px Arial";
        let textScore = "Puntos: "+this.score;
        let sizeTextScore = ctx.measureText(textScore).width;
        let positionXScore = (this.canvas.width / 2) - (sizeTextScore / 2);
        ctx.fillText(textScore, positionXScore, this.canvas.height - 30);

        // this.collision.draw(ctx);
    }
    update(key, enemy, fruit){
        this.moveing(key);
        this.limits();
        this.collisionEnemy(enemy);
        this.collision.update(this.x - this.radius, this.y - this.radius, this.radius *2, this.radius *2);
        this.collisionFruit(fruit);
    }
    moveing(key){
        switch(key){
            case "ArrowRight":
                this.x+=this.speed;
                break;
            case "ArrowLeft":
                this.x-=this.speed;
                break;
            case "ArrowUp":
                this.y-=this.speed;
                break;
            case "ArrowDown":
                this.y+=this.speed;
                break;
        }
    }
    limits(){
        if(this.x > this.canvas.width - this.radius){
            this.x = this.canvas.width - this.radius;
        }
        if(this.x < this.radius){
            this.x = 0 + this.radius;
        }
        if(this.y < this.radius){
            this.y = this.radius;
        }
        if(this.y > this.canvas.height - this.radius){
            this.y = this.canvas.height - this.radius;
        }
    }
    collisionEnemy(enemy){
        if(enemy.length > 0){            
            for(let i = 0; i < enemy.length; i++){

                if(this.collision.cross(enemy[i])){
                 console.log('collision Enemy');
                }
            }
        }
    }
    collisionFruit(fruit){
        if(fruit){
            if(this.collision.cross(fruit)){
                this.score++;
                fruit.play();
                fruit.generatePosition();
                
            }
        }
    }
}