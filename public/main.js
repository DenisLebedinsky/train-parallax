window.onload = function () {
    //Create alias
    let Application = PIXI.Application,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite,
        Rectangle = PIXI.Rectangle,
        TextureCache = PIXI.TextureCache;

    //Create a Pixi Application
    let app = new Application({
        width: 256,
        height: 256,
        antialias: true,

    });

    //pixi.js render settings
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);

    //add to DOM
    document.body.appendChild(app.view);

    //load images
    const bg = Sprite.from('images/bg.png');
    let train2 = Sprite.from("images/train2.png");
    let train3 = Sprite.from("images/train3.png");

    //set images position
    train2.position.set(-1200, app.screen.height / 2);
    train3.position.set(-1200, app.screen.height / 2);
    bg.height = window.innerHeight;

    //adaptive settings
    let bgR = 0.2;
    let bgL = -1595;
    let train2max = -190;
    let train3max = -460;

    if (window.innerWidth > 1000) {
        train2.scale.y = 0.8;
        train2.anchor.set(0.45);

        train3.scale.y = 0.75;
        train3.anchor.set(0.45);

        if (window.innerHeight > 1320 && window.innerHeight < 1400) {

            bgL = -987;
            train2.scale.y = 0.96;
            train3.scale.y = 0.9;
        }
    }

    if (window.innerWidth < 1000) {
        train2.scale.y = 1.28;
        train2.anchor.set(0.45);
        train3.scale.y = 1.2;
        train3.anchor.set(0.45);
        bg.width = window.innerHeight * 1.543;

        if (window.innerHeight > 1750) {
            bgL = -2270;
            train2.scale.y = 1.55;
            train3.scale.y = 1.47;
        }

        if (window.innerHeight > 1320 && window.innerHeight < 1750){
            bgL = -2000;
            train2.scale.y = 1.55;
            train3.scale.y = 1.47;
        }

        if (window.innerHeight < 1320) {
            bgL = -1020;
            train2.scale.y = 0.96;
            train3.scale.y = 0.9;
        }

    } else {
        train2.scale.y = 0.51;
        train3.scale.y = 0.47;
        train2max = 400;
        train3max = 0;

        if (window.innerHeight > 900) {
            train2.scale.y = 0.71;
            train3.scale.y = 0.68;

        }
        //if(window.innerHeight )
    }

    bg.position.set(-80, 0)

    //add to stage
    app.stage.addChild(bg);
    app.stage.addChild(train2);
    app.stage.addChild(train3);

    //move train
    function moveTrain2(delta) {

        //filter big delta
        if (Math.abs(delta) > 100 && delta < 0) {
            delta = -50
        }

        if (Math.abs(delta) > 100 && delta > 0) {
            delta = 50
        }

        let speed = delta < 0 ? 0.2 : 0.5;
        let newPosition = train2.x + delta * speed;

        if (newPosition < train2max && newPosition > -1200) {
            train2.x = newPosition;
        }
    }

    function moveTrain3(delta) {

        //filter big delta
        if (Math.abs(delta) > 100 && delta < 0) {
            delta = -50
        }

        if (Math.abs(delta) > 100 && delta > 0) {
            delta = 50
        }

        let speed = delta < 0 ? 1 : 0.3;
        let newPosition = train3.x + delta * speed;

        if (newPosition < train3max && newPosition > -1200) {
            if (delta > 0 && train2.x > -750) {
                train3.x = newPosition;
            }

            if (delta < 0) {
                train3.x = newPosition;
            }
        }
    }

    //move background
    function moveBg(delta) {
        if (window.innerWidth < 1000 &&
            bg.x - delta * 0.2 > bgL &&
            bg.x - delta * bgR < 2) {
            bg.x = bg.x - delta * 0.2;
        }
    }

    // //devicemotion
    let posX = 0;

    document.getElementById('permission').addEventListener("click", function () {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
        }
    });

    window.addEventListener('deviceorientation', event => {
        posX = event.gamma;
    });

    // on wheel event
    window.addEventListener('wheel', function (e) {
        e = e || window.event;
        let delta = e.deltaY || e.detail || e.wheelDelta;
        posX = delta;
    });

    requestAnimationFrame(changePosition);

    function changePosition() {
        let gamma = posX;
        moveTrain3(gamma);
        moveTrain2(gamma);
        moveBg(gamma)
        requestAnimationFrame(changePosition);
    }

}