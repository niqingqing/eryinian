class Anchor {
    constructor(opt = {}){
        if(!opt.mac){
            throw new Error("no mac");
        }
        opt.callback = function(){
            console.log("创建成功")
        };
        var self = this;
        var url = opt.online?"../map2d/img/anchor/anchor_blue.png":"../map2d/img/anchor/anchor_gray.png";
        this.online = opt.online || false;
        this.x = opt.x || 1;
        this.y = opt.y || 1;
        this.groupId = opt.groupId || 1;
        this.size = opt.size || 32;
        this.url = opt.url || url;
        this.mac = opt.mac;
        this.fillcolor = opt.fillcolor || "0,0,0";
        this.fontsize = opt.fontsize || 14;
        this.strokecolor = opt.strokecolor || "255,255,255";
        this.height = opt.height || 2;
        this.img = new fengmap.FMImageMarker({
            x:self.x,
            y:self.y,
            size:self.size,
            url:self.url,
            height:self.height,
            callback:function(){
                self.img.alwaysShow();
            }
        });
        this.text = new fengmap.FMTextMarker({
            x:self.x,
            y:self.y,
            name:self.mac,
            height:self.theight,
            fillcolor: self.fillcolor,
            fontsize: self.fontsize,
            strokecolor: self.strokecolor,
            callback: function() {
                self.text.alwaysShow();
            }
        })
        this.img.__id = this.mac;
        this.img.__type = "anchor";
        this.text.__id = this.mac;
        this.text.__type = "anchor";
    }
    get theight(){
        return this.height + 0.8;
    }
    on(events,cb){
        this.img[events] = cb;
        this.text[events] = cb;
    }
}