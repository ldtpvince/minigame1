var ScreenWhackaMole = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,
    moleUpAni:null,
    moleDownAni:null,
    molesState:null,
    molesPos:null,
    moleUpSprites:null,
    moleDownSprites:null,
    moleNode:null,
    moleUpCnt:0,
    numMole:5,
    heart:5,
    level:3,
    time:'05:00',
    score:0,
    spriteSheet:null,

    ctor:function() {
        this._super();
        //cc.view.setFrameSize(1024, 960);

        var moleWidth = 95;
        var moleHeight = 72;
        this.score = 0;

        // init mole state array
        this.molesState = new Array(this.numMole);
        for (let i = 0; i < this.numMole; ++i) {
            this.molesState[i] = new Array(this.numMole);
        }
        //this.setScale(0.75)
        let size = cc.director.getVisibleSize();

        this.background = cc.Sprite.create("/assests/game/background/background.png");
        //cc.view.setFrameSize(this.background.width * ratio, this.background.height * ratio);
        

        this.addChild(this.background);
        this.background.setPosition(size.width/2, size.height/2);

        // Score
        let scoreSprite = cc.Sprite.create("/assests/game/item/icon_score.png");
        this.addChild(scoreSprite, 1);
        scoreSprite.setPosition(size.width / 2 - 2 * scoreSprite.width, size.height - 4 * scoreSprite.height);

        let blockSize = cc.size(scoreSprite.width, scoreSprite.height);
        this.scoreLabel = cc.LabelTTF.create(this.score.toString(), "Arial", 32, blockSize, cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.scoreLabel, 1);
        this.scoreLabel.setPosition(scoreSprite.getPosition().x + scoreSprite.width + 20, scoreSprite.getPosition().y);

        // Time
        let timeSprite = cc.Sprite.create("/assests/game/item/icon_time.png");
        this.addChild(timeSprite, 1);
        timeSprite.setPosition(3 * size.width/4 - 2 * timeSprite.width * ratio, scoreSprite.getPosition().y);

        this.timeLabel = cc.LabelTTF.create(this.time.toString(), "Arial", 32, cc.size(blockSize.width + 50, blockSize.height), cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.timeLabel, 1);
        this.timeLabel.setPosition(timeSprite.getPosition().x + timeSprite.width + 30, timeSprite.getPosition().y - 2);

        // Heart
        let heartSprite = cc.Sprite.create("/assests/game/item/icon_health.png");
        this.addChild(heartSprite, 1);
        heartSprite.setPosition(size.width / 3 - 3 * heartSprite.width, scoreSprite.getPosition().y);

        this.heartLabel = cc.LabelTTF.create(this.heart.toString(), "Arial", 32, blockSize, cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.heartLabel, 1);
        this.heartLabel.setPosition(heartSprite.getPosition().x + 60, heartSprite.getPosition().y - 2);

        // Hammer
        this.hammer = cc.Sprite.create("/assests/game/item/hammer.png");
        this.addChild(this.hammer, 3);
        this.hammer.setScale(0.1);
        this.hammer.setAnchorPoint(cc.p(0.5, 0.5));
        this.hammer.setRotation(130);
        
        this.hammer.setPosition(0, 0);

        this.spriteSheet = "/assests/game/char/sprites.png";
        this.moleDownSprites = new Array(this.numMole * this.numMole);

        // mole down sprites
        for (let i = -2; i <= 2; ++i) {
            for (let j = -2; j <= 2; ++j) {
                let tempSprite = cc.Sprite.create(this.spriteSheet, cc.rect(0, 0, 190, 144));
                tempSprite.setScale(0.5);

                let positionX = size.width /2 + i * moleWidth;
                let positionY = size.height /2 + j * moleHeight;
                tempSprite.setPosition(positionX, positionY);

                let tag = (i + 2) * 5 + j + 2;
                this.addChild(tempSprite, 1);

                this.molesState[i + 2][j + 2] = 0;

                this.moleDownSprites[tag] = tempSprite;
            }
        }

        // mole hit sprite
        this.moleHit = cc.Sprite.create(this.spriteSheet, cc.rect(144 * 6, 0, 190, 144));
        this.moleHit.setScale(0.5);
        this.addChild(this.moleHit, 1);

        // set up animation
        let frameDatas = [];
        for (let i = 0; i < 4; ++i) {
            frameDatas.push(cc.rect(190 * i, 0, 190, 144));
        }

        let texture = cc.textureCache.addImage(this.spriteSheet);
        let animFrames = [];

        for (let i = 0; i < 4; ++i) {
            let spriteFrame = new cc.SpriteFrame(texture, frameDatas[i]);
            let animFrame = new cc.AnimationFrame();
            animFrame.initWithSpriteFrame(spriteFrame, 1, null);
            animFrames.push(animFrame);
        }

        let animation = cc.Animation.create(animFrames, 0.08);
        this.moleUpAni = cc.Animate.create(animation);
        this.moleUpAni.retain();
        //this.addChild(this.moleUpAni);

        animFrames = [];
        for (let i = 3; i >= 0; --i) {
            let spriteFrame = new cc.SpriteFrame(texture, frameDatas[i]);
            let animFrame = new cc.AnimationFrame();
            animFrame.initWithSpriteFrame(spriteFrame, 1, null);
            animFrames.push(animFrame);
        }

        animation = cc.Animation.create(animFrames, 0.08);
        this.moleDownAni = cc.Animate.create(animation);
        this.moleDownAni.retain();
        
        let mouseListener = cc.EventListener.create({
            event:cc.EventListener.MOUSE,
            //swallowTouches: true,
            //ismousedown:false,
            onMouseDown:function(event) {
                //cc.log('Mouse Down1');
        
                var pos = event.getLocation(), target = event.getCurrentTarget();
                let s = target.getContentSize();
            
                var rect = cc.rect(0, 0, s.width, s.height);
                target.hammer.x = pos.x;
                target.hammer.y = pos.y;
                let r = target.hammer.getRotation();
                target.hammer.runAction(cc.rotateTo(0, 100));
                if (cc.rectContainsPoint(rect, pos)) {
                    for (let i = 0; i < 5; ++i) {
                        for (let j = 0; j < 5; ++j) {
        
                            let tag = i * 5 + j;
                            let moleBoundingBox = target.moleDownSprites[tag].getBoundingBoxToWorld();
                            
                            if (cc.rectContainsPoint(moleBoundingBox, pos) && target.molesState[i][j] >= 1) {
                                // //target.molesState[i][j]--;
                                let moleHitPos = target.moleDownSprites[tag].getPosition();
                                target.molesState[i][j] = -1;
                                target.score++;
                                
                                // target.moleDownSprites[tag] = target.moleHit;
                                // target.moleDownSprites[tag].setPosition(moleHitPos);

                                return true;
                            }
                        }
                    }
        
                    //this.ismousedown=true;
                    return true;
                }
                //cc.log('Mouse down outside');
                return false;
            },
            onMouseMove:function(event) {
                var pos = event.getLocation();
                var target = event.getCurrentTarget();
                target.hammer.x = pos.x;
                target.hammer.y = pos.y;
                var draw = new cc.DrawNode();
                draw.drawDot(target.hammer.getPosition(), 10, cc.color(0, 255, 255, 255));
                
                // cc.log(pos.x);
                // cc.log(target.hammer.x);
            },
            onMouseUp:function(event) {
                var pos = event.getLocation();
                var target = event.getCurrentTarget();
                target.hammer.x = pos.x;
                target.hammer.y = pos.y;
                target.hammer.runAction(cc.rotateTo(0, 130));
            }
        });

        cc.eventManager.addListener(mouseListener, this);
        this.schedule(this.updateTime(60 * 5, this.timeLabel), 1);
        this.schedule(this.update, 0.8);
    },
    update:function() {
        this.updateState();

        this.checkMoleUp();
        this.updateHeart();
        this.updateScore();
        
    },
    randomMole:function() {
        let posXMole = 0;
        let posYMole = 0;

        do {
            let rand = Math.floor(Math.random() * 25);
            posXMole = Math.floor(rand / 5);
            posYMole = rand % 5;

            if (this.molesState[posXMole][posYMole] <= 0) {
                break;
            }

        } while(this.moleUpCnt <= this.numMole * this.numMole);
        
        return [posXMole, posYMole];
    },
    updateScore:function(sender) {
        if (this.score >= 30) {
            this.unscheduleAllCallbacks();
            fr.view(ScreenWin); 
        }
        else {
            this.scoreLabel.setString(this.score.toString());
        }
    },
    updateHeart:function() {
        if (this.heart < 0) {
            this.unscheduleAllCallbacks();
            //fr.view(ScreenLose);
        } 
        else {
            this.heartLabel.setString(this.heart.toString());    
        }
    },
    updateTime:function(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.setString(minutes + ":" + seconds);

            if (--timer < 0) {
                fr.view(ScreenLose);
            }
        }, 1000);
    // we don't want to wait a full second before the timer starts
        
    },
    updateState:function() {
        let posNewMole = this.randomMole();
        let posXMole = posNewMole[0];
        let posYMole = posNewMole[1];
        
        if (this.moleUpCnt <= this.numMole * this.numMole) {
            this.molesState[posXMole][posYMole] = 1;
            let tag = posXMole * 5 + posYMole

            this.moleDownSprites[tag].runAction(cc.sequence(this.moleUpAni.clone()));
        }
    },
    checkMoleUp:function() {
        for (let i = 0; i < 5; ++i) {
            for (let j = 0; j < 5; ++j) {

                if (this.molesState[i][j] > 0 && this.molesState[i][j] <= this.level * 2) {
                    this.molesState[i][j] += 1;
                }
                else if (this.molesState[i][j] < 0) {
                    this.molesState[i][j] = 0;
                    let tag = i * 5 + j;

                    this.moleDownSprites[tag].runAction(cc.sequence(this.moleDownAni.clone()));
                }
                else if (this.molesState[i][j] >= this.level * 2) {
                    this.molesState[i][j] = 0;
                    let tag = i * 5 + j;

                    this.heart--;

                    this.moleDownSprites[tag].runAction(cc.sequence(this.moleDownAni.clone()));
                }
            }
        }
    }
})
