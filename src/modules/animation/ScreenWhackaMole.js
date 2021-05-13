var ScreenWhackaMole = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        let size = cc.director.getVisibleSize();

        let background = cc.Sprite.create("/assests/game/background/background.png");
        this.addChild(background);
        background.setPosition(size.width/2, size.height/2);
        this.setScale(1.0);
        let moles = [[],[]];

        let moleWidth = 190;
        let moleHeight = 144;
        for (i = -2; i <= 2; ++i) {
            moles.push([]);
            for (j = -2; j <=2 ; ++j) {

                let tempSprite = cc.Sprite.create("/assests/game/char/sprites.png", cc.rect(0, 0, 190, 144));

                this.addChild(tempSprite);
                let positionX = size.width /2 + i * moleWidth;
                let positionY = size.height /2 + j * moleHeight;
                this.setPosition(positionX, positionY);
                moles[i + 2][j + 2] = 0;
            }
        }
    }
})
