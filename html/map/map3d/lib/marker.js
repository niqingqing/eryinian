/**
 * Created by zwt on 2017/7/25 0025.
 */

function tagInit(ME, data, callback){
    ME.tagMarker.tmpData.push(data);
    if( ! ME.tagTemplate ){
        loadTagTemplate(data, createTag, callback);
    }else {
        createTag(data, callback);
    }
}

function createTag(data, callback){

    var tag;
    if(ME.tagTemplate && ME.tagTemplate.scene){
        tag = ME.tagTemplate.scene.clone();
    }else {
        tag = shpereTag(data);
    }

    var size = ME.tagSize;
    tag.scale.set(size,size,size);

    // tag.sourceData = data;
    convertPosition(data);

    tag.mixer = new THREE.AnimationMixer( tag );

    tag.traverse( function ( child ) {
        if ( child instanceof THREE.SkinnedMesh ) {
            var clip = THREE.AnimationClip.parseAnimation( child.geometry.animation, child.geometry.bones );
            tag.mixer.clipAction( clip, child ).play();
        }
    } );

    var group = new THREE.Group();
    group.actionStatus = 'play';//stop

    group.add( tag );
    // group.add( aliasInit(data) );
    aliasInit(data,group);
    //power
    powerInit( data,group );
    //light visible=false
    tagLightInit( data, group );
    //tail
    tailInit(data, group);

    group.sourceData = data;

    group.rotation.x += 0.5 * Math.PI;
    group.position.x = data.screenX;
    group.position.y = data.screenY;
    group.position.z = 0;

    ME.tagMarker.data.push(group);

    _.remove(ME.tagMarker.tmpData, data);

    ME.scene.add( group );

    if(callback) callback(group, data);
}

//tag light
function tagLightInit(data, group){

    var color = getColor(data, "#237120");

    var sphere = new THREE.SphereGeometry( ME.tagMarker.sphereRadius+10, 32, 32 );

    var light1 = new THREE.PointLight( color, 20, 10, 2 );
    light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: color } ) ) );

    // var bulbMat = new THREE.MeshStandardMaterial( {
    //     emissive: 0xffffee,
    //     emissiveIntensity: 1,
    //     color: color
    // });
    // light1.add( new THREE.Mesh( sphere, bulbMat ) );
    light1.position.y = ME.tagMarker.height;
    light1.visible = false;

    group.add( light1 );
}


function getColor(data, defalt){
    var color = defalt;
    if(data.color) color = data.color;
    if(data.cat && data.cat.color) color = data.cat.color;
    return color;
}

//tag light
function tailInit(data, group){

    var color = getColor(data, '#717171');
    var geometry = new THREE.CircleGeometry( 5, 32 );
    var material = new THREE.MeshBasicMaterial( { color: color, transparent:true, opacity:0.5} );
    var circle = new THREE.Mesh( geometry, material );

    group.tails = [];
    for(var i=0;i<ME.tailNum;i++){
        var c = circle.clone();
        c.position.set(data.screenX,data.screenY,data.screenZ);

        ME.scene.add(c);
        group.tails.push(c);
    }

}



/**
 * ??????????????????
 * @param data
 * @param callback
 */
function loadTagTemplate2(data, callback){
    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load( "./common/models/avatar.dae", function ( collada ) {
        ME.tagTemplate = collada;
        if(callback) callback(data);
    });
}

function loadTagTemplate(data, callback){
    ME.tagTemplate = false;
    if(callback) callback(data);
}


function shpereTag(data){
    var color = getColor(data, "#717171");
    // var texture = new THREE.TextureLoader().load("../map2d/img/tag/bracelet_blue.png");
    var geometry = new THREE.SphereGeometry( ME.tagMarker.sphereRadius, 32, 32 );
    var material = new THREE.MeshPhongMaterial( {color: color, transparent:true, opacity:0.8} );//
    var sphere = new THREE.Mesh( geometry , material);
    sphere.position.y = ME.tagMarker.height;
    return sphere;
}

// ????????????
function aliasInit( data,group ) {
    if (!ME.font) {
        loadFont(data, group , createText);
    } else {
        createText(data,group);
    }
}


function createText( data, group ) {
    var text = (data.alias?data.alias:data.code);

    var color = getColor(data,"#237120");

    var textGeo = new THREE.TextBufferGeometry( text, {
        font:   ME.font,
        size: 16,   //??????
        height: 2,//??????
        curveSegments: 12,
        bevelThickness: 1,
        bevelSize: 1.5,
        bevelEnabled: false,
        material: 0,
        extrudeMaterial: 1
    });

    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();

    var materials = [
        new THREE.MeshPhongMaterial( { color: color,  shading: THREE.FlatShading } ), // front
        new THREE.MeshPhongMaterial( { color: color,  shading: THREE.SmoothShading } ) // side
    ];

    var textMesh = new THREE.Mesh( textGeo, materials );
    textMesh.position.y = ME.tagSize * 1.8;
    //??????
    textMesh.position.x = -(text.length/2)*10;

    group.add(textMesh);
}


function loadFont(data,group,callback) {
    var fontName = "gentilis"; // helvetiker, optimer, gentilis, droid sans, droid serif
    var fontWeight = "regular"; // regular bold

    var loader = new THREE.FontLoader();
    loader.load( './common/fonts/' + fontName + '_' + fontWeight + '.typeface.json', function ( response ) {
        ME.font = response;
        if(callback) callback(data,group);
    } );
}



function powerInit( node, group ) {
    var style = ME.tagPower;
    var color = style.color;

    var width = style.width*(node.powerLevel/100);
    if(node.powerLevel<25)
        color = "#ff3724";
    else if(node.powerLevel<50){
        color = "#FFBF24";
    }else if(node.powerLevel<75){
        color = "#CCFF37";
    }else{
        color = "#35FF2A";
    }

    var radius = style.height/2;
    var material = new THREE.MeshBasicMaterial( {color: color} );

    var geometry = new THREE.CylinderGeometry( radius, radius, style.width, 64, 64 );
    var frame = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( {color: color, transparent:true, opacity:0.2} ) );
    frame.position.y = ME.tagSize * 2.5;
    //??????
    //??????
    frame.rotation.z += Math.PI/2;

    group.add( frame );


    geometry = new THREE.CylinderGeometry( radius, radius, width, 64, 64 );
    var powerGeo = new THREE.Mesh( geometry, material );
    powerGeo.position.y = ME.tagSize *  2.5;
    //??????
    powerGeo.position.x = (width-style.width)/2;
    //??????
    powerGeo.rotation.z += Math.PI/2;
    group.add( powerGeo );
}


function addTagMarker(tag, callback){
    tagInit(ME, tag, callback);
}

function getSourceTag(data){
    for(var i=0;i<ME.vm.tag.data.length;i++){
        var item = ME.vm.tag.data[i];
        if(item.sourceId == data.id){
            item.x = data.x;
            item.y = data.y;
            item.z = data.z;
            if(item.mapId != data.mapId){
                item.mapId = data.mapId;
                var map = getMapById(data.mapId);
                if(map)item.mapName = map.cname;
            }
            item.power = data.power;
            item.time = data.time;
            return item;
        }
    }
    //create anony tag
    return getAnonyTag(data);
}


function getAnonyTag(data){
    data.id = data.mac;
    data.code = data.mac;
    data.sourceId = data.id;
    var map = getMapById(data.mapId);
    if(map)data.mapName = map.cname;
    data.markerType = 'tag';
    data.markerId = 'tag_'+data.sourceId;
    data.alias = 'anony'+data.id;
    return data;
}

function getMapById(mapId){
    for(var i=0;i<ME.vm.map.data.length;i++) {
        var item = ME.vm.map.data[i];
        if (item.id == mapId) {
            return item;
        }
    }
    return false;
}

function convertPosition(data){
    data.screenX = (data.x - (ME.planeWidth/2));
    data.screenY = ((ME.planeHeight/2) - data.y) ;
    data.screenZ = 0;
    return data;
}


function getTagMarker(code){
    for(var i=0;i< ME.tagMarker.data.length;i++){
        if(ME.tagMarker.data[i].sourceData.code == code){
            return ME.tagMarker.data[i];
        }
    }
    for(var i=0;i< ME.tagMarker.tmpData.length;i++){
        if(ME.tagMarker.tmpData[i].code == code){
            return ME.tagMarker.tmpData[i];
        }
    }
    return false;
}


function moveMarker(tag, data){
    if(!tag || !tag.position){
        return;
    }
    //????????????
    tag.actionStatus = 'play';//stop

    // var tmp = {x:data.x,y:data.y,z:data.z};
    convertPosition(data);

    //??????
    // rotationDirect(tag, data);

    //?????? ?????????
    moveTail(tag, data);

    //sos
    changeTagSos(tag, data);

    //fence monitor
    fenceMonitor(tag, data);

    //??????
    tag.position.set(data.screenX, data.screenY, data.screenZ);

    //????????????
    // tag.actionStatus = 'stop';//stop
}


function moveTail(tag, data){
    var tmp = tag.tails.pop();
    tmp.position.set(data.screenX, data.screenY, data.screenZ);
    tag.tails.unshift(tmp);
}


function fenceMonitor(tag, data){
    return;
    if(!data || !tag){
        return;
    }
    ME.vm.fence.data.forEach(function(fence){

        var lastPoint = {x:tag.position.x,y:tag.position.y};
        var currentPoint = {x:data.screenX,y:data.screenY};

        if(!fence.polygonPoints){
            fence.polygonPoints = [];
            if(fence.points){
                var points = fence.points.split(',');
                for(var j=0;j<points.length;j++){
                    var p = points[j];
                    var pos = p.split(' ');

                    var position = {x:parseFloat(pos[0]),y:parseFloat(pos[1])};
                    var newPos=ubiMap.convert(position, ME.vm.curRealLength);
                    if(!ME.vm.scanActive){
                        newPos.y += ME.vm.yCenter;
                    }

                    fence.polygonPoints.push({x:newPos.x,y:newPos.y})
                }
            }
        }

        var isIn = util.isInPolygon2D(currentPoint, fence.polygonPoints);
        var lastIsIn = util.isInPolygon2D(lastPoint, fence.polygonPoints);

        //??????????????????????????????????????????????????????????????????????????????
        //??????????????????????????????????????????????????????????????????????????????
        var tipFlag = (lastIsIn != isIn);
        if(!tipFlag){
            return;
        }

        if(!ME.fenceTip) return;

        tag.children.forEach(function(child){
            if(child.type == 'PointLight'){
                if(isIn){
                    //????????????
                    child.visible = true;

                }else {
                    //??????????????????
                    child.visible = false;
                }
            }
        });


        if(!DataManager.isFenceTip(fence, isIn)) return;

        // if(ME.fenceTip && isIn){
        //     ME.fenceShape.data.forEach(function(item){
        //         if(item.sourceData.id == fence.id){
        //             item.scale.set( 1, 1, 2 );
        //         }
        //     })
        // }



        //text tip
        var r = createFenceTipObject(tag.sourceData, fence, isIn);
        ME.vm.setFenceWaitMessage(r.string, fence, fence.type);

        //audio tip
        if(!ME.fenceAudioTip) return;

        var audio = 'warning.mp3';
        if(fence && fence.type && fence.type.audio) audio = fence.type.audio
        var v = new Audio("../common/audio/"+audio);
        v.play();


    });
}


function createFenceTipObject(tag, fence, isIn){
    var e = {
            string: "",
        },
        f = new Date,
        g = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate() + " " + f.getHours() + ":" + ("0" + f.getMinutes()).slice( - 2) + ":" + ("0" + f.getSeconds()).slice( - 2);

    var i = "" == fence.cname ? "": ' "' + fence.cname + '" ';

    e.string += '?????? "' + (tag.alias?tag.alias:tag.code) + '" ' ;
    if(isIn){
        e.string +='???????????????' ;
    }else {
        e.string +='???????????????' ;
    }
    e.string +=i + " " + g;//' #' + fence.id +
    // return e
    return null
}

function changeTagSos(tag,data){
    //test
    data.screenX>1000? data.sos = 'start': data.sos = 'stop';

    if(!data.sos) return;

    if(data.sos == 'start'){
        //????????????
        if(!tag.setIntervalId)
            twinkle(tag);

    }else if(data.sos == 'stop'){
        stopTwinkle(tag);
    }


}


function twinkle(tag){
    tag.setIntervalId = setInterval(function(){
        tag.children.forEach(function(child){
            if(child.type == 'PointLight'){
                child.visible = !child.visible ;
            }
        });
    }, 250);
}

function stopTwinkle(tag){
    //??????????????????
    if(tag.setIntervalId>0){
        clearInterval(tag.setIntervalId);
        tag.setIntervalId = 0;

        tag.children.forEach(function(child){
            if(child.type == 'PointLight'){
                child.visible = false ;
            }
        });
    }
}

function rotationDirect(tag, data){
    var angle = getAngle({x:tag.position.x,y:tag.position.y}, {x:data.screenX, y:data.screenY});
    if(angle){
        console.log('angle:',angle);
        tag.rotation.y += angle * Math.PI/180;
    }

    // tag.rotation.y = Math.cos(angle);
}

function getAngle(start,end){
    var diff_x = end.x - start.x,
        diff_y = end.y - start.y;
    //????????????,????????????
    return 360*Math.atan(diff_y/diff_x)/(2*Math.PI);
}

function getAngle2(px,py,mx,my){//?????????????????????????????????????????????y???????????????????????????
    var x = Math.abs(px-mx);
    var y = Math.abs(py-my);
    var z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    var cos = y/z;
    var radina = Math.acos(cos);//???????????????????????????
    var angle = Math.floor(180/(Math.PI/radina));//????????????????????????

    if(mx>px&&my>py){//?????????????????????
        angle = 180 - angle;
    }

    if(mx==px&&my>py){//?????????y???????????????
        angle = 180;
    }

    if(mx>px&&my==py){//?????????x???????????????
        angle = 90;
    }

    if(mx<px&&my>py){//?????????????????????
        angle = 180+angle;
    }

    if(mx<px&&my==py){//?????????x????????????
        angle = 270;
    }

    if(mx<px&&my<py){//?????????????????????
        angle = 360 - angle;
    }

    return angle;
}



function pointerLockerControl(){
    if(!ME.searchTag){
        return;
    }
    // ME.vm.search.visible = false;

    var tagMarkers = ME.tagMarker.data;
    tagMarkers.forEach(function(tagGroup){
        var sourceData = tagGroup.sourceData;
        if(sourceData && sourceData.sourceId == ME.searchTag.sourceId){

            TWEEN.removeAll();

            var p = ME.camera.position;
            var target = {};
            target.position = {
                x:tagGroup.position.x,
                y:tagGroup.position.y-ME.vm.curRealLength*0.02,
                z:ME.vm.curRealLength*0.07
            };
            // ME.camera.position.set( 0, -ME.vm.curRealLength*0.20, ME.vm.curRealLength*0.7 );
            // ME.camera.position.copy(target.position);

            ME.orbit.target = new THREE.Vector3(0, 0, 0);
            ME.orbit.target.copy(tagGroup.position);
            ME.orbit.enablePan = false;

            // ME.trackball.target = new THREE.Vector3(0, 0, 0);
            // ME.trackball.target.copy(tagGroup.position);
            // ME.trackball.enablePan = false;


            ME.camera.lookAt(tagGroup.position);

            var tween = new TWEEN.Tween(ME.camera.position) // Create a new tween that modifies 'coords'.
                .to(target.position, 2000) // Move to (300, 200) in 1 second.
                .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                .onUpdate(function() { // Called after tween.js updates 'coords'.
                    // Move 'box' to the position described by 'coords' with a CSS translation.
                    // box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)');
                    // console.log(box);
                })
                .onStart(function(){
                    twinkle(tagGroup);
                })
                .onComplete(function(){
                    setTimeout(function(){
                        stopTwinkle(tagGroup);
                    },5000);
                })
                .start(); // Start the tween immediately.

            // console.log(target.position);
            // console.log(tagGroup.position);

            return;
        }
    });

}