var touchListener = cc.EventListener.create({
    event:cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches:true,
    onTouchBegan:function(touch, event) {
        let target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        let s = target.getContentSize();
        let rect = cc.rect(0,0,s.width, s.height);
        if(cc.rectContainsPoint(rect,locationInNode))
        {
            /*cc.log("sprite began ..x = " + locationInNode.x + ". y = " + locationInNode.y);
            cc.log("Start sprite was touched");*/
            fr.view(ScreenWhackaMole);
            return true;
        }
        return false;
    }
});

var mouseListener = cc.EventListener.create({
    event:cc.EventListener.MOUSE,
    onMouseDown:function(event) {
        let pos = event.getLocation(), target = event.getCurrentTarget();
        let s = target.getContentSize();
        let rect = cc.rect(0,0,s.width, s.height);
        if (cc.rectContainsPoint(rect, pos)) {
            fr.view(ScreenWhackaMole);
            return true;
        }
        return false;
    }
 });

var ScreenWin = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        //cc.view.setFrameSize(1024, 960);
        let size = cc.director.getVisibleSize();

        let blockSize = cc.rect(size.width / 3, size.height /5);
        this.loseLabel = cc.LabelTTF.create("YOU WIN", "Arial", 32, blockSize, cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.loseLabel, 1);
        this.loseLabel.setPosition(sizeWidth /2, size.height/2);


        let background = cc.Sprite.create("/assests/game/background/background.png");
        this.addChild(background);
        background.setPosition(size.width/2, size.height/2);
        background.setScale(1.0);

        this.btnReplay = cc.Sprite.create("/assests/game/button/icon_restart.png")
        this.btnReplay.setPosition(size.width/2, size.height / 3);
        this.btnReplay.setScale(2.0);
        this.addChild(this.btnReplay, 1);

        //cc.eventManager.addListener(touchListener, btnStart);
        cc.eventManager.addListener(mouseListener, this.btnReplay);
    }
})