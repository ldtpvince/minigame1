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


var ScreenLose = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();

        let background = cc.Sprite.create("/assests/game/background/background.png");
        this.addChild(background);
        //cc.view.setFrameSize(background.width * ratio, background.height * ratio);
        let size = cc.director.getVisibleSize();

        background.setPosition(size.width/2, size.height/2);
        background.setScale(ratio);

        let blockSize = cc.rect(size.width / 3, size.height /5);
        this.loseLabel = cc.LabelTTF.create("YOU LOSE", "Arial", 32, blockSize, cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.loseLabel, 1);
        this.loseLabel.setPosition(size.width /2, size.height/2);

        this.btnReplay = cc.Sprite.create("/assests/game/button/icon_restart.png")
        this.btnReplay.setPosition(size.width/2, size.height / 3);
        this.btnReplay.setScale(2.0 * ratio);
        this.addChild(this.btnReplay, 2);

        let mouseListener = cc.EventListener.create({
            event:cc.EventListener.MOUSE,
            onMouseDown:function(event) {
                var pos = event.getLocation(), target = event.getCurrentTarget();
                let s = target.getContentSize();
                let targetPos = target.getPosition();
                //let boundBox = target.getBoundingBoxToWorld();
                //cc.log('Mouse down');
                var rect = cc.rect(targetPos.x - s.width * ratio, targetPos.y - s.height * ratio, s.width * 2 * ratio, s.height * 2 * ratio);
                // cc.log([pos.x, pos.y]);
                // cc.log([targetPos.x, targetPos.y]);
                // cc.log([rect.x, rect.y, rect.width, rect.height]);
                // cc.log([boundBox.x, boundBox.y, boundBox.width, boundBox.height]);
                if (cc.rectContainsPoint(rect, pos)) {
                    fr.view(ScreenWhackaMole);
                    return true;
                }
                return false;
            }
         });

        //cc.eventManager.addListener(touchListener, btnStart);
        cc.eventManager.addListener(mouseListener, this.btnReplay);
    }
})