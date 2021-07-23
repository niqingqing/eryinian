class Fence{
    constructor(opts){
        if(!opts.points){
            throw new Error("no points")
        }
        if(!opts.id){
            throw new Error("no id");
        }
        var self = this;
        this.color = opts.color;
        this.points = opts.points;
        this.alpha = opts.alpha || 0.3;
        this.lineWidth = opts.lineWidth || 3;
        this.height = opts.height || 2;
        this.type = 'fence';
        this.id = opts.id;
        this.node = new fengmap.FMPolygonMarker({
            color: self.color,
            alpha:self.alpha,
            lineWidth:self.lineWidth,
            height:self.height,
            points:self.points
        });
        this.node.__type = this.type;
        this.node.__id = this.id;
    }
    on(events,cb){
        this.node[events] = cb;
    }
}