
const app = {
    canvas: null,
    ctx: null,
    smile: null,
    enemys: new Array(),
    areaEnemy: new Array(),
    fruit: null,
    key: 0,
    theme: new Audio(),
    jump: new Audio(),
    load: 0,
    totalLoad: 2,
    printLoad: 'init',
    referenceTemp: 0,
    start: () => {
        app.canvas = document.getElementById('canvas');
        app.canvas.style = "border: 2px solid black; display: flex; margin: auto";
        app.ctx = app.canvas.getContext("2d");

        app.AreaEnemy();
        app.smile = new Smile(app.canvas);
        app.fruit = new Fruit(app.canvas, app.jump);
        app.keyboard();
        app.loadAssets();
        
        
        app.loop();
    },
    draw: (ctx) => {
        if(app.printLoad == 'init'){
            app.TitleInit(ctx);
        }

        if(app.printLoad == 'start'){
            app.smile.draw(ctx);
            app.Enemys();
            app.fruit.draw(app.ctx);
            /* let msg = 'SOON';
            app.ctx.font='28px arial';
            app.ctx.fillText(msg,200, 100); */

/*             for(let i = 0; i < app.areaEnemy.length; i++){
                app.areaEnemy[i].draw(ctx);
            } */
        }
        if(app.printLoad == 'gameOver'){
            app.gameOver(ctx);
        }

    },
    update: (temp) => {
        if(app.printLoad == 'start'){
            app.smile.update(app.key, app.enemys, app.fruit);
        }
        if(app.smile.gameOver){
            app.printLoad = 'gameOver';
        }
                
    },
    loop: (temp) => {
        requestAnimationFrame(app.loop);
        app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);
        app.draw(app.ctx);
        app.update(temp);
    },
    keyboard: () => {
        document.onkeydown = savekey;
        document.onkeyup = deletekey;

        function savekey(e){
            app.key = e.key;
            // console.log(app.key);
        }
        function deletekey(e){
            app.key = 0;
        }
    },
    loadAssets: () => {
        app.theme.src = 'sounds/theme.mp3';
        app.theme.oncanplaythrough = function () {
            app.load++;
            app.theme.volume = 0.4;
            app.theme.loop = true;
            // console.log('LOAD: '+ app.theme.src);   
        };
        app.jump.src = "sounds/jump.mp3";
        app.jump.oncanplaythrough = () => {
            app.load++;
            app.theme.volume = 0.5;
            app.theme.loop = true;
        };

        let loop = setInterval(isLoaded, 1000);

        function isLoaded(){
            if(app.load = app.totalLoad){
                //app.loadAssets();
                
                app.canvas.addEventListener('click',function(){
                    app.theme.play();
                    app.printLoad = 'start';
                });

                clearInterval(loop);
            }
        }
    },
    Enemys: () => {
        if(app.enemys.length < 3){
            app.enemys.push(new Enemy(app.canvas, app.areaEnemy));
        }
        if(app.enemys){
            for(let i = 0; i < app.enemys.length; i++){
                app.enemys[i].draw(app.ctx);
                app.enemys[i].update();
                
                if(app.enemys[i].collisionCanvas == true){
                    app.enemys.splice(i, 1);
                }
            }
        }
    },
    AreaEnemy: () => {
        app.areaEnemy.push(new Collision('top'));
        app.areaEnemy.push(new Collision('botton'));
        app.areaEnemy.push(new Collision('left'));
        app.areaEnemy.push(new Collision('right'));
        app.areaEnemy.push(new Collision('top-left'));
        app.areaEnemy.push(new Collision('top-right'));
        app.areaEnemy.push(new Collision('botton-right'));
        app.areaEnemy.push(new Collision('botton-left'));

        const width20 = app.canvas.width * (20 / 100);
        const width60 = app.canvas.width * (60 / 100);
        const width80 = app.canvas.width * (80 / 100);
        const height20 = app.canvas.height * (20 / 100)
        const height30 = app.canvas.height * (30 / 100);
        const height40 = app.canvas.height * (40 / 100);
        const height70 = app.canvas.height * (70/ 100);
        const height80 = app.canvas.height * (80 / 100);

        for(let i = 0; i < app.areaEnemy.length; i++){
            if(app.areaEnemy[i].name == 'top'){
                app.areaEnemy[i].update(width20, 0, width60, height20);
            }
            else if(app.areaEnemy[i].name == 'botton'){
                app.areaEnemy[i].update(width20, height80, width60, width20);
            }
            else if(app.areaEnemy[i].name == 'left'){
                app.areaEnemy[i].update(0 , height30, width20, height40);
            }
            else if(app.areaEnemy[i].name == 'right'){
                app.areaEnemy[i].update(width80 , height30, width20, height40);
            }
            else if(app.areaEnemy[i].name == 'top-left'){
                app.areaEnemy[i].update(0 , 0, width20, height30);
            }
            else if(app.areaEnemy[i].name == 'top-right'){
                app.areaEnemy[i].update(width80, 0, width20, height30);
            }
            else if(app.areaEnemy[i].name == 'botton-right'){
                app.areaEnemy[i].update(width80, height70, width20, height30);
            }
            else if(app.areaEnemy[i].name == 'botton-left'){
                app.areaEnemy[i].update(0, height70, width20, height30);
            }
        }
    },
    TitleInit: (ctx) => {
        ctx.font = "25px Arial";
        let text = "haga clic en la pantalla para Iniciar el Juego";
        let sizetext = ctx.measureText(text).width;
        ctx.fillText(text, (app.canvas.width / 2) - (sizetext / 2) , 100);
    },
    gameOver: (ctx) => {
        ctx.font = "25px Arial";
        let text1 = "Game Over";
        let sizetext1 = ctx.measureText(text1).width;
        ctx.fillText(text1, (app.canvas.width / 2) - (sizetext1 / 2) , 100);

        let text2 = "Puntos: "+app.smile.score;
        let sizetext2 = ctx.measureText(text2).width;
        ctx.fillText(text2, (app.canvas.width / 2) - (sizetext2 / 2) , 150);
    }

   
};

window.addEventListener('load',() => {
    app.start();
});