class Layer{
    constructor(type,vm){
        if(type !== 'tag' && type !== 'anchor' && type !== 'fence'){
            throw new Error("type error");
        }
        this.type = type;
        this.imgLayer = ME.vm.imgLayer;
        this.textLayer = ME.vm.textLayer;
        this.fenceLayer = ME.vm.fenceLayer;
    }
    addTagOrAnchorMarker(marker = {}){
        if(!marker.img || !marker.text){
            throw new Error("no img or text");
        }
        this.imgLayer.addMarker(marker.img);
        this.textLayer.addMarker(marker.text);
    }
    addTagOrAnchorMarkers(...args){
        var arr;
        if(Array.isArray(args[0]) && args.length === 1){
            arr = args[0];
        }else{
            arr = args;
        }
        for(var obj of arr){
            this.addTagOrAnchorMarker(obj)
        }
    }
    addFenceMarker(marker = {}){
        if(!marker.node){
            throw new Error("no node");
        }
        this.fenceLayer.addMarker(marker.node);
    }
}