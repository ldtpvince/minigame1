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
var ratio = 0.75;

// var touchListener = cc.EventListener.create({
//     event:cc.EventListener.TOUCH_ONE_BY_ONE,
//     swallowTouches:true,
//     onTouchBegan:function(touch, event) {
//         let target = event.getCurrentTarget();
//         var locationInNode = target.convertToNodeSpace(touch.getLocation());
//         let s = target.getContentSize();
//         let rect = cc.rect(0,0,s.width, s.height);
//         if(cc.rectContainsPoint(rect,locationInNode))
//         {
//             /*cc.log("sprite began ..x = " + locationInNode.x + ". y = " + locationInNode.y);
//             cc.log("Start sprite was touched");*/
//             fr.view(ScreenWhackaMole);
//             return true;
//         }
//         return false;
//     }
// });

var ScreenMenu = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        //cc.log([cc.director.getVisibleSizeInPixel().width, cc.director.getVisibleSizeInPixel().height]);

        var background = cc.Sprite.create("/assests/game/background/background.png");
        this.addChild(background);
        //background.setScale(ratio);
        //cc.view.setFrameSize(background.width * ratio, background.height * ratio);
        let size = cc.director.getVisibleSize();

        background.setPosition(size.width/2, size.height/2);

        this.btnStart = cc.Sprite.create("/assests/game/button/icon_play.png")
        this.btnStart.setPosition(size.width/2, size.height / 1.8);
        this.btnStart.setScale(3.0 * ratio);
        this.addChild(this.btnStart);
        //cc.log([btnStart.width, btnStart.height]);

        let mouseListener = cc.EventListener.create({
            event:cc.EventListener.MOUSE,
            onMouseDown:function(event) {
                var pos = event.getLocation(), target = event.getCurrentTarget();
                let s = target.getContentSize();
                let targetPos = target.getPosition();
                //let boundBox = target.getBoundingBoxToWorld();
                
                var rect = cc.rect(targetPos.x - s.width * 1.5 * ratio, targetPos.y - s.height * 1.5 * ratio, s.width * 3 * ratio, s.height * 3 * ratio);
                cc.log([pos.x, pos.y]);
                cc.log([targetPos.x, targetPos.y]);
                cc.log([rect.x, rect.y, rect.width, rect.height]);
                // cc.log([boundBox.x, boundBox.y, boundBox.width, boundBox.height]);
                if (cc.rectContainsPoint(rect, pos)) {
                    fr.view(ScreenWhackaMole);
                    return true;
                }
                return false;
            }
         });

        //cc.eventManager.addListener(touchListener, btnStart);
        cc.audioEngine.setMusicVolume(0.7);
        //cc.audioEngine.playMusic(res.mainMusic, true);
        cc.eventManager.addListener(mouseListener, this.btnStart);
    },
    update:function() {
        cc.log("test");
    }
})
