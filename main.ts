namespace SpriteKind {
    export const Shark = SpriteKind.create()
    export const powerup = SpriteKind.create()
    export const star = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Shark, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 0, -50)
    music.pewPew.play()
    projectile.y += -5
    if (projectile2 && projectile2.lifespan > 0) {
        p3 = sprites.createProjectileFromSprite(img`
            . 2 2 2 . 
            2 3 1 3 2 
            3 1 1 1 3 
            3 1 1 1 3 
            3 1 1 1 3 
            2 1 1 1 3 
            2 1 1 1 2 
            2 3 1 3 2 
            . 3 1 3 . 
            . 2 1 2 . 
            . 2 1 2 . 
            . 2 1 2 . 
            `, mySprite, 0, -50)
        p3.y += 5
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy(effects.disintegrate, 500)
    info.changeScoreBy(1)
    if (Math.percentChance(50)) {
        projectile2 = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, 0, 50)
        projectile2.setKind(SpriteKind.powerup)
        projectile2.x = randint(0, scene.screenWidth())
    }
})
sprites.onOverlap(SpriteKind.star, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy(effects.disintegrate, 500)
    info.changeScoreBy(2)
})
sprites.onOverlap(SpriteKind.Shark, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy(effects.disintegrate, 500)
    info.changeScoreBy(1)
    info.changeLifeBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.star, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.powerup, function (sprite, otherSprite) {
    otherSprite.destroy()
    projectile2.lifespan = 10000
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
let Asteriod: Sprite = null
let shark1: Sprite = null
let p3: Sprite = null
let projectile2: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
mySprite.setPosition(75, 111)
controller.moveSprite(mySprite, 100, 0)
mySprite.setStayInScreen(true)
game.onUpdateInterval(2000, function () {
    shark1 = sprites.createProjectileFromSide(img`
        .....cc......ff.
        .....cbc...ffbf.
        .....cbbfffcbbf.
        .....cbbbccbbf..
        .....cddbbcbf...
        ......cddbbf....
        .......cbcf.....
        .......fccf.....
        .......fcccc....
        ......fccccbc...
        ......fccccdc...
        .....fcccccbdc..
        .....fccccccdc..
        .....fccccccddc.
        ff..fcbbbcccddff
        fbfffbbbbbccdfbf
        fbbccbbbbbbcfbbf
        cdbbcbbccbbbbbdf
        cddbc1111111bdbf
        .cd11999999911f.
        ..1966666666691.
        ..166bbb1111661.
        .1dfbbff11c11dd1
        .1dfbbff1cc11dd1
        .1dfbbb1131c1dd1
        .1dfbbb11333fdd1
        .1dfbbb11c13fdd1
        .1ddfbb11ccfddd1
        .1ddfbbb1cfdddd1
        ..1dfbcbbfdddd1.
        ..1ddfbbfddddd1.
        ...11ddddddd11..
        .....1111111....
        ................
        ................
        ................
        `, 0, 90)
    shark1.x = randint(0, scene.screenWidth())
    shark1.setKind(SpriteKind.star)
    if (info.score() > 10) {
        shark1 = sprites.createProjectileFromSide(img`
            .....cc......ff.
            .....cbc...ffbf.
            .....cbbfffcbbf.
            .....cbbbccbbf..
            .....cddbbcbf...
            ......cddbbf....
            .......cbcf.....
            .......fccf.....
            .......fcccc....
            ......fccccbc...
            ......fccccdc...
            .....fcccccbdc..
            .....fccccccdc..
            .....fccccccddc.
            ff..fcbbbcccddff
            fbfffbbbbbccdfbf
            fbbccbbbbbbcfbbf
            cdbbcbbccbbbbbdf
            cddbc1111111bdbf
            .cd11999999911f.
            ..1966666666691.
            ..166bbb1111661.
            .1dfbbff11c11dd1
            .1dfbbff1cc11dd1
            .1dfbbb1131c1dd1
            .1dfbbb11333fdd1
            .1dfbbb11c13fdd1
            .1ddfbb11ccfddd1
            .1ddfbbb1cfdddd1
            ..1dfbcbbfdddd1.
            ..1ddfbbfddddd1.
            ...11ddddddd11..
            .....1111111....
            ................
            ................
            ................
            `, 0, 90)
        shark1.x = randint(0, scene.screenWidth())
        shark1.setKind(SpriteKind.star)
    } else if (info.score() > 20) {
        shark1 = sprites.createProjectileFromSide(img`
            .....cc......ff.
            .....cbc...ffbf.
            .....cbbfffcbbf.
            .....cbbbccbbf..
            .....cddbbcbf...
            ......cddbbf....
            .......cbcf.....
            .......fccf.....
            .......fcccc....
            ......fccccbc...
            ......fccccdc...
            .....fcccccbdc..
            .....fccccccdc..
            .....fccccccddc.
            ff..fcbbbcccddff
            fbfffbbbbbccdfbf
            fbbccbbbbbbcfbbf
            cdbbcbbccbbbbbdf
            cddbc1111111bdbf
            .cd11999999911f.
            ..1966666666691.
            ..166bbb1111661.
            .1dfbbff11c11dd1
            .1dfbbff1cc11dd1
            .1dfbbb1131c1dd1
            .1dfbbb11333fdd1
            .1dfbbb11c13fdd1
            .1ddfbb11ccfddd1
            .1ddfbbb1cfdddd1
            ..1dfbcbbfdddd1.
            ..1ddfbbfddddd1.
            ...11ddddddd11..
            .....1111111....
            ................
            ................
            ................
            `, 0, 90)
        shark1.x = randint(0, scene.screenWidth())
        shark1.setKind(SpriteKind.star)
    } else {
    	
    }
})
game.onUpdateInterval(1000, function () {
    Asteriod = sprites.createProjectileFromSide(img`
        . . . . . . . . c c c c . . . . 
        . . . . c c c c c c c c c . . . 
        . . . c f c c a a a a c a c . . 
        . . c c f f f f a a a c a a c . 
        . . c c a f f c a a f f f a a c 
        . . c c a a a a b c f f f a a c 
        . c c c c a c c b a f c a a c c 
        c a f f c c c a b b 6 b b b c c 
        c a f f f f c c c 6 b b b a a c 
        c a a c f f c a 6 6 b b b a a c 
        c c b a a a a b 6 b b a b b a . 
        . c c b b b b b b b a c c b a . 
        . . c c c b c c c b a a b c . . 
        . . . . c b a c c b b b c . . . 
        . . . . c b b a a 6 b c . . . . 
        . . . . . . b 6 6 c c . . . . . 
        `, 0, 50)
    Asteriod.x = randint(0, scene.screenWidth())
    Asteriod.setKind(SpriteKind.Enemy)
    if (info.score() > 10) {
        Asteriod = sprites.createProjectileFromSide(img`
            . . . . . . . . c c c c . . . . 
            . . . . c c c c c c c c c . . . 
            . . . c f c c a a a a c a c . . 
            . . c c f f f f a a a c a a c . 
            . . c c a f f c a a f f f a a c 
            . . c c a a a a b c f f f a a c 
            . c c c c a c c b a f c a a c c 
            c a f f c c c a b b 6 b b b c c 
            c a f f f f c c c 6 b b b a a c 
            c a a c f f c a 6 6 b b b a a c 
            c c b a a a a b 6 b b a b b a . 
            . c c b b b b b b b a c c b a . 
            . . c c c b c c c b a a b c . . 
            . . . . c b a c c b b b c . . . 
            . . . . c b b a a 6 b c . . . . 
            . . . . . . b 6 6 c c . . . . . 
            `, 0, 50)
        Asteriod.x = randint(0, scene.screenWidth())
        Asteriod.setKind(SpriteKind.Enemy)
    } else if (info.score() > 20) {
        Asteriod = sprites.createProjectileFromSide(img`
            . . . . . . . . c c c c . . . . 
            . . . . c c c c c c c c c . . . 
            . . . c f c c a a a a c a c . . 
            . . c c f f f f a a a c a a c . 
            . . c c a f f c a a f f f a a c 
            . . c c a a a a b c f f f a a c 
            . c c c c a c c b a f c a a c c 
            c a f f c c c a b b 6 b b b c c 
            c a f f f f c c c 6 b b b a a c 
            c a a c f f c a 6 6 b b b a a c 
            c c b a a a a b 6 b b a b b a . 
            . c c b b b b b b b a c c b a . 
            . . c c c b c c c b a a b c . . 
            . . . . c b a c c b b b c . . . 
            . . . . c b b a a 6 b c . . . . 
            . . . . . . b 6 6 c c . . . . . 
            `, 0, 50)
        Asteriod.x = randint(0, scene.screenWidth())
        Asteriod.setKind(SpriteKind.Enemy)
    } else {
    	
    }
})
game.onUpdateInterval(10000, function () {
    Asteriod = sprites.createProjectileFromSide(img`
        . . . . . . . . c c c c . . . . 
        . . . . c c c c c c c c c . . . 
        . . . c f c c a a a a c a c . . 
        . . c c f f f f a a a c a a c . 
        . . c c a f f c a a f f f a a c 
        . . c c a a a a b c f f f a a c 
        . c c c c a c c b a f c a a c c 
        c a f f c c c a b b 6 b b b c c 
        c a f f f f c c c 6 b b b a a c 
        c a a c f f c a 6 6 b b b a a c 
        c c b a a a a b 6 b b a b b a . 
        . c c b b b b b b b a c c b a . 
        . . c c c b c c c b a a b c . . 
        . . . . c b a c c b b b c . . . 
        . . . . c b b a a 6 b c . . . . 
        . . . . . . b 6 6 c c . . . . . 
        `, 0, 80)
    Asteriod.x = randint(0, scene.screenWidth())
    Asteriod.setKind(SpriteKind.Shark)
    if (info.score() > 10) {
        Asteriod = sprites.createProjectileFromSide(img`
            . . . . . . . . c c c c . . . . 
            . . . . c c c c c c c c c . . . 
            . . . c f c c a a a a c a c . . 
            . . c c f f f f a a a c a a c . 
            . . c c a f f c a a f f f a a c 
            . . c c a a a a b c f f f a a c 
            . c c c c a c c b a f c a a c c 
            c a f f c c c a b b 6 b b b c c 
            c a f f f f c c c 6 b b b a a c 
            c a a c f f c a 6 6 b b b a a c 
            c c b a a a a b 6 b b a b b a . 
            . c c b b b b b b b a c c b a . 
            . . c c c b c c c b a a b c . . 
            . . . . c b a c c b b b c . . . 
            . . . . c b b a a 6 b c . . . . 
            . . . . . . b 6 6 c c . . . . . 
            `, 0, 80)
        Asteriod.x = randint(0, scene.screenWidth())
        Asteriod.setKind(SpriteKind.Shark)
    } else if (info.score() > 20) {
        Asteriod = sprites.createProjectileFromSide(img`
            . . . . . . . . c c c c . . . . 
            . . . . c c c c c c c c c . . . 
            . . . c f c c a a a a c a c . . 
            . . c c f f f f a a a c a a c . 
            . . c c a f f c a a f f f a a c 
            . . c c a a a a b c f f f a a c 
            . c c c c a c c b a f c a a c c 
            c a f f c c c a b b 6 b b b c c 
            c a f f f f c c c 6 b b b a a c 
            c a a c f f c a 6 6 b b b a a c 
            c c b a a a a b 6 b b a b b a . 
            . c c b b b b b b b a c c b a . 
            . . c c c b c c c b a a b c . . 
            . . . . c b a c c b b b c . . . 
            . . . . c b b a a 6 b c . . . . 
            . . . . . . b 6 6 c c . . . . . 
            `, 0, 80)
        Asteriod.x = randint(0, scene.screenWidth())
        Asteriod.setKind(SpriteKind.Shark)
    } else {
    	
    }
})
