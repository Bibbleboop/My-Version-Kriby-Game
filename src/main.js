import { appWindow } from "@tauri-apps/api/window";
import kaplay from "kaplay";
import { makeBackground } from "./utils";
import { SCALE_FACTOR } from "./constants";
import { makePlayer } from "./player";


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

addEventListener("keydown", async (key) => {
    if (key.code === "F11") {
        if (await appWindow.isFullscreen()) {
            await appWindow.setFullscreen(false);
            return;
        }

        appWindow.setFullscreen(true);
    }
});

k.scene("start", async () => {
    makeBackground(k);

    const map = k.add([
        k.sprite("background"),
        k.pos(0, 0),
        k.scale(SCALE_FACTOR),
    ]);

    const clouds = map.add([
        k.sprite("clouds"), 
        k.pos(), 
        { 
            speed: 5,
        },
    ]);

clouds.onUpdate(() => {
    clouds.move(clouds.speed, 0);
    if (clouds.pos.x > 700) {
        clouds.pos.x = -500;
    }
    });
    
    map.add([
        k.sprite("obstacles"), k.pos()]);

    const player = k.add(makePlayer(k));
    player.pos = k.vec2(k.center().x - 350, k.center().y + 56);

    const playBtn = k.add([
        k.rect(200, 50, { radius: 3 }),
        k.color(k.Color.fromHex("#14638e")),
        k.area(),
        k.anchor("center"),
        k.pos(k.center().x + 30, k.center().y + 60),
    ])

    playBtn.add([
        k.text("Play",{ size: 24 }),
        k.color(k.Color.fromHex("#d7f2f7")),
        // k.color(k.Color.fromHex("#d7f2f7")),
        k.area(),
        k.anchor("center"),
    ]);
});

k.scene("main", async () => {});

k.go("start");