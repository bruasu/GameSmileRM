
const app = {
    canvas: null,
    ctx: null,
    smile: null,
    enemys: new Array(),
    key: 0,
    theme: new Audio(),
    load: 0,
    totalLoad: 1,
    printLoad: false,
    referenceTemp: 0,
    start: () => {
        app.canvas = document.getElementById('canvas');
        app.canvas.style = "border: 2px solid black; display: flex; margin: auto";
        app.ctx = app.canvas.getContext("2d");

        app.smile = new Smile(app.canvas);
        app.keyboard();
        app.loadAssets();

        app.loop();
    },
    draw: (ctx) => {
        
        if(app.printLoad){
            app.smile.draw(ctx);
            app.Enemys();
            /* let msg = 'SOON';
            app.ctx.font='28px arial';
            app.ctx.fillText(msg,200, 100); */
        }

    },
    update: (temp) => {
        app.smile.update(app.key);
                
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

        let loop = setInterval(isLoaded, 1000);

        function isLoaded(){
            if(app.load = app.totalLoad){
                //app.loadAssets();
                
                app.canvas.addEventListener('click',function(){
                    app.theme.play();
                    app.printLoad = true;
                });

                clearInterval(loop);
            }
        }
    },
    Enemys: () => {
        if(app.enemys.length < 3){
            app.enemys.push(new Enemy(app.canvas));
        }
        if(app.enemys){
            for(let i = 0; i < app.enemys.length; i++){
                app.enemys[i].draw(app.ctx);
                app.enemys[i].update();
                
                if(app.enemys[i].collision == true){
                    app.enemys.splice(i, 1);
                }
            }
        }
    }

   
};

window.addEventListener('load',() => {
    app.start();
});