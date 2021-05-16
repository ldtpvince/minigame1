/**
 * Created by GSN on 7/6/2015.
 */

/*
var ScreenMenu = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();

        var yBtn = 3*size.height/5;

        var btnNetwork = gv.commonButton(200, 64, cc.winSize.width/4, yBtn,"Network");
        this.addChild(btnNetwork);
        btnNetwork.addClickEventListener(this.onSelectNetwork.bind(this));

        var btnLocalization = gv.commonButton(200, 64, cc.winSize.width/2, yBtn,"Localize");
        this.addChild(btnLocalization);
        btnLocalization.addClickEventListener(this.onSelectLocalization.bind(this));

        var btnDragonbones = gv.commonButton(200, 64, 3*cc.winSize.width/4, yBtn,"WhackaMole");
        this.addChild(btnDragonbones);
        btnDragonbones.addClickEventListener(this.onSelectDragonbones.bind(this));

        var btnWhackaMole = gv.commonButton(200, 64, 3*cc.winSize.width/4, yBtn, "WhackaMole");
        this.addChild(btnWhackaMole);
        btnWhackaMole.addClickEventListener(this.onSelectWhackaMole.bind(this));
        },
    onEnter:function(){
        this._super();
    },
    onSelectNetwork:function(sender)
    {
        fr.view(ScreenNetwork);
    },
    onSelectLocalization:function(sender)
    {
        fr.view(ScreenLocalization);
    },
    onSelectDragonbones:function(sender)
    {
        fr.view(ScreenDragonbones);
    },
    onSelectWhackaMole:function(sender)
    {
        fr.view(ScreenWhackaMole);
    }
});*/

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

var ScreenMenu = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        cc.view.setFrameSize(1024, 960);
        let size = cc.director.getVisibleSize();

        let background = cc.Sprite.create("/assests/game/background/background.png");
        this.addChild(background);
        background.setPosition(size.width/2, size.height/2);
        background.setScale(1.0);

        let btnStart = cc.Sprite.create("/assests/game/button/icon_play.png")
        btnStart.setPosition(size.width/2, size.height / 1.8);
        btnStart.setScale(3.0);
        this.addChild(btnStart);

        //cc.eventManager.addListener(touchListener, btnStart);
        cc.eventManager.addListener(mouseListener, btnStart);
    }
})
