var ScreenWhackaMole = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,
    moleUpAni:[],
    moleDownAni:[],
    molesState:[[],[]],
    numMole:5,
    heart:3,
    time:1000,
    score:0,

    ctor:function() {
        this._super();
        let size = cc.director.getVisibleSize();

        let background = cc.Sprite.create("/assests/game/background/background.png");
        this.addChild(background, 0);
        background.setPosition(size.width/2, size.height/2);
        //this.setScale(1.0);
        var moleWidth = 95;
        var moleHeight = 72;

        // Score
        let scoreSprite = cc.Sprite.create("/assests/game/item/icon_score.png");
        this.addChild(scoreSprite, 1);
        scoreSprite.setPosition(size.width / 2 - 2 * scoreSprite.width, size.height - 2 * scoreSprite.height);

        let blockSize = cc.size(scoreSprite.width, scoreSprite.height);
        let scoreLabel = cc.LabelTTF.create(this.score.toString(), "Arial", 32, blockSize, cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(scoreLabel, 1);
        scoreLabel.setPosition(scoreSprite.getPosition().x + 60, scoreSprite.getPosition().y - 2);

        // Time
        let timeSprite = cc.Sprite.create("/assests/game/item/icon_time.png");
        this.addChild(timeSprite, 1);
        timeSprite.setPosition(3 * size.width/4 - 2 * timeSprite.width, size.height - 2 * timeSprite.height);

        let timeLabel = cc.LabelTTF.create(this.time.toString(), "Arial", 32, blockSize, cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(timeLabel, 1);
        timeLabel.setPosition(timeSprite.getPosition().x + 60, timeSprite.getPosition().y - 2);

        // Heart
        let heartSprite = cc.Sprite.create("/assests/game/item/icon_health.png");
        this.addChild(heartSprite, 1);
        heartSprite.setPosition(size.width / 3 - 2 * heartSprite.width, size.height - 2 * timeSprite.height);

        let heartLabel = cc.LabelTTF.create(this.heart.toString(), "Arial", 32, blockSize, cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(heartLabel, 1);
        heartLabel.setPosition(heartSprite.getPosition().x + 60, heartSprite.getPosition().y - 2);

        // init mole state array
        this.molesState = new Array(this.numMole);
        for (let i = 0; i < this.numMole; ++i) {
            this.molesState[i] = new Array(this.numMole);
        }

        for (let i = -2; i <= 2; ++i) {
            for (let j = -2; j <= 2; ++j) {

                let tempSprite = cc.Sprite.create("/assests/game/char/sprites.png", cc.rect(0, 0, 190, 144));
                tempSprite.setScale(0.5);

                let positionX = size.width /2 + i * moleWidth;
                let positionY = size.height /2 + j * moleHeight;
                tempSprite.setPosition(positionX, positionY);
                let tag = (i + 2) * 5 + j + 2;
                this.addChild(tempSprite, 1, tag);

                this.molesState[i + 2][j + 2] = 0;
                /*cc.log(i + 2);
                cc.log(j + 2);*/
                //cc.log(this.molesState.length);
            }
        }

        for (let i = 0; i < 4; ++i) {
            let frame = cc.Sprite.create("/assests/game/char/sprites.png", cc.rect(190 * i, 0, 190, 144));
            frame.setScale(0.5);
            this.moleUpAni.push(frame);
        }

        for (let i = 3; i >= 0; --i) {
            let frame = cc.Sprite.create("/assests/game/char/sprites.png", cc.rect(190 * i, 0, 190, 144));
            frame.setScale(0.5);
            this.moleDownAni.push(frame);
        }
    },
    onEnter:function() {
        this.schedule(this.update, 3);
    },
    update:function() {

        //cc.log(this.numMole);

        this.updateState();

        this.checkMoleUp();
    },
    randomMole:function() {
        let posXMole = 0;
        let posYMole = 0;
        let moleUpCnt = 0;

        cc.log(this.molesState[posXMole][posYMole]);

        do {
            let rand = Math.floor(Math.random() * 25);
            posXMole = rand / 5;
            posYMole = rand % 5;
            moleUpCnt += 1;
            cc.log(this.molesState[posXMole][posYMole]);
        } while(this.molesState[posXMole][posYMole] >= 1 && moleUpCnt <= this.numMole * this.numMole);

        return [posXMole, posYMole, moleUpCnt];
    },
    updateScore:function(sender) {

    },
    updateHeart:function() {

    },
    updateTime:function() {

    },
    updateState:function() {
        let posAndMoleCnt = this.randomMole();
        let posXMole = posAndMoleCnt[0];
        let posYMole = posAndMoleCnt[1];
        let moleUpCnt = posAndMoleCnt[2];
        if (moleUpCnt <= this.numMole * this.numMole) {
            this.molesState[posXMole][posYMole] = 1;

            let animation = cc.Animation(this.moleUpAni, 0.1, 100);
            let animate = cc.Animate.create(animation);

            this.getChildByTag(posXMole * 5 + posYMole).runAction(animate);
            //cc.log(this.getChildByTag(posXMole * 5 + posYMole).getPosition().height);
        }
    },
    checkMoleUp:function() {
        for (let i = 0; i < 5; ++i) {
            for (let j = 0; j < 5; ++j) {
                if (this.molesState[i][j] > 0 || this.molesState[i][j] <= 4) {
                    this.molesState[i][j] += 1;
                }
                else if (this.molesState[i][j] > 4) {
                    this.molesState[i][j] = 0;

                    let animation = cc.Animation(this.moleDownAni, 0.04);
                    let animate = cc.Animate.create(animation);

                    this.getChildByTag(i * 5 + j).runAction(animate);
                }
            }
        }
    }
})
