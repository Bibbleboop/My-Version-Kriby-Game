import kaplay from "kaplay";

const k = kaplay({
    width: 1280,
    height: 720,
    letterbox: true,
    global: false, 
    scale: 2,  
});

k.loadSprite("kriby", "./kriby.png");
k.loadSprite("obstacles", "./obstacles.png");
k.loadSprite("background", "./background.png");
k.loadSprite("clouds", "./clouds.png");

k.loadSound("jump", "./jump.wav");
k.loadSound("hurt", "./hurt.wav");
k.loadSound("confirm", "./confirm.wav");

