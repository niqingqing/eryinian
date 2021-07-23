class Tag {
    constructor(opt = {}){
        if(!opt.mac){
            throw new Error("no mac");
        }
        opt.callback = function(){
            console.log("创建成功")
        };
        var url = "../map2d/img/tag/police_blue.png";
        // var url = "../map2d/img/tag/location_blue.png;"
        var self = this;
        this.x = opt.x || 1;
        this.y = opt.y || 1;
        this.groupId = opt.groupId || 1;
        this.size = opt.size || 32;
        this.url = opt.url || url;
        this.mac = opt.mac;
        this.fillcolor = opt.fillcolor || "0,0,0";
        this.fontsize = opt.fontsize || 14;
        this.strokecolor = opt.strokecolor || "255,255,255";
        this.height = opt.height || 0;
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
        });
        this.img.__id = this.mac;
        this.img.__type = "tag";
        this.text.__id = this.mac;
        this.text.__type = "tag";
        this.intervalId = null;
    }
    get theight(){
        return this.height + 1;
    }
    moveTo(x,y){
        this.x = x;
        this.y = y;
        this.move();
        // clearInterval(this.intervalId);
        // var x1 = x,x2 = this.img.x;
        // var y1 = y,y2 = this.img.y;
        // var a = Math.abs(this.img.x - x);
        // var b = Math.abs(this.img.y - y);
        // var distance = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
        // var step = 0.01;
        // if(distance > 1){
        //     step = step * distance;
        // }
        // var id = this.intervalId = setInterval(() => {
        //     if(Math.abs(this.y - y) < step){
        //         clearInterval(id);
        //     }
        //     if(y > this.y){
        //         this.y += step;
        //     }else{
        //         this.y -= step;
        //     }
        //     this.x = getX(x1,y1,x2,y2,this.y);
        //     this.move();
        // },10);
    }
    move(){
        this.img.x = this.x;
        this.img.y = this.y;
        this.text.y = this.y;
        this.text.x = this.x;
    }
    on(events,cb){
        this.img[events] = cb;
        this.text[events] = cb;
    }
}

function getX(x1,y1,x2,y2,y){
    return ((x2 - x1) * (y - y1)) / (y2 - y1) + x1;
}