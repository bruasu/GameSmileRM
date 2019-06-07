class Smile{
    constructor(canvas){
        this.canvas = canvas;
        this.x = 70;
        this.y = 70;
        this.radius = 30;
        this.speed = 5;
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
    }
    update(key){
        this.moveing(key);
        this.limits();
    }
    moveing(key){
        switch(key){
            case 'd' || 'D':
                this.x+=this.speed;
                break;
            case 'a' || 'A':
                this.x-=this.speed;
                break;
            case 'w' || 'W':
                this.y-=this.speed;
                break;
            case 's' || 'S':
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
}