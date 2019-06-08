class Collision{
    constructor(){
        this.x;
        this.y;
        this.height;
        this.width;
    }
    draw(ctx){
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    update(x, y, width, height){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
    cross(obj){
        if(
            this.y < obj.y + obj.height &&
            this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.height + this.y > obj.y
        ){
            console.log('collision');
        }
    }
}