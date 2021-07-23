/**
 * Created by zwt on 2017/9/2 0002.
 */



$(function(){
    getDataAndDraw();
});


function getDataAndDraw(){
    vueInit();
    if(!ME.map) return;

    ME.tag_filter = Cookies.get('tag_filter');
    if(!ME.tag_filter){alert('请指定标签！'); return}

    $.ajax({
        url:ME.host+ '/tplatform/tof/listProcessTof_cache?map='+ME.map+'&tag='+ME.tag_filter+'&hasResult=1',//listTof_cache
        method:'get',
        success: function(r){

            ME.datas = [];
            for(var i=0;i<r.rows.length;i++){
                var row = r.rows[i];
                ME.datas.push(JSON.parse(row));
            }
            ME.datas.sort(sortByTime);
            console.log(ME.datas);

            ME.vm.max = ME.datas.length;

            getAnchors(initMap, ME.map);
        }
    });

}



function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            debugBuf:false,
            clearAllDisable:false,
            sourceFlagDisable:false,
            showRemote:false,
            drawBegin:false,
            tag_filter:Cookies.get('tag_filter'),
            currentProj:'',  //地图传过来项目code
            currentMap:'',   //当前地图
            maps:[],         //所有项目地图

            point:0,
            max:0,
        },
        created:function(){
            this.$http.get(ME.host+'/config/getGlobalFlag?key=debugBuf').then(function(res){
                this.debugBuf = Boolean(Number(res.body));
            });

            if(!(UBIT.user.projectCode &&  UBIT.user.projectId>0)){
                alert('必须进入项目地图才能查看实验平台！')
                return false;
            }

              //获取项目下所有地图
              this.currentProj = UBIT.user.projectCode;
              ME.map = this.currentMap=getDefaultMap();
              if(!this.currentMap){return}
  
              this.$http.get('map/list?projectCode='+this.currentProj).then(function(res){
                  this.maps=res.body;
              });

        },
        methods:{
            handleChange:function(val){
                var data = ME.datas[val];
                if(!data){
                    alert(val+'>'+ME.datas.length+'? too big');
                    return ;
                }
                drawPoint(data);
            },

             //选择地图时刷新
             reloadByMap:function(){
                // bufTableInit(ME.vm.currentMap);
                localStorage.setItem('tplaformMap',this.currentMap);
                location.reload();
            },

            clearAll:function(){
                this.$confirm("确认清除掉所有的原始数据么？","提示",{ }).then(function() {
                    ME.vm.$http.get(ME.host+'/tplatform/source/clearAll').then(function(res){
                        ME.vm.clearAllDisable = false;
                        var result = res.body;
                        if(result.isOk){
                            window.location.reload();
                        }else {
                            this.$alert("清除失败！"+result.msg, '提示', {
                                confirmButtonText: '确定'
                            });
                        }
                        //放开按钮

                    });
                }).catch(function(){
                    ME.vm.clearAllDisable = false;
                });
                //屏蔽按钮
                ME.vm.clearAllDisable = true;
            },

            sourceFlagChange:function(newVal){
                this.$http.get(ME.host+'/config/setGlobalFlag?key=debugBuf&val='+(newVal?1:0)).then(function(res){
                    ME.vm.sourceFlagDisable = false;
                    var result = res.body;
                    if(result.isOk){
                        this.showSuccess("设置成功！"+result.msg);
                    }else {
                        this.showError("设置失败！"+result.msg);
                    }
                });
                ME.vm.sourceFlagDisable = true;
            },
            refresh:function () {
                window.location.reload();
            },
            save_tag_filter:function (val) {
                Cookies.set('tag_filter', val);
            },

            showSuccess:function(msg){
                this.showMsg(msg,'success');
            },
            showError:function(msg){
                this.showMsg(msg,'error');
            },
            showMsg:function(msg,type){
                this.$message({
                    message: msg,
                    type: type  //success/warning/info/error
                });
            },

            draw:function(pos,drawType){
                switch(drawType){
                    case 'circle':
                        paper.circle(pos.x,pos.y,5).attr({
                            fill:'red',
                            stroke:'red'
                        });
                    break;
                    case 'rect':
                        var w=10;
                        var h=10;
                        paper.rect(pos.x,pos.y,w,h).attr({
                            stroke:'blue',
                            fill:'blue'
                        });
                    break;
                    case 'ellipse':
                        var rx=5;
                        var ry=10;
                        paper.ellipse(pos.x,pos.y,rx,ry).attr({
                        stroke:'green',
                        fill:'green'
                    });
                break;
                }
            }
        },
    });
}




function drawPoint(data){
    console.log(data);

    var r = data.result;
    if(!r.isOk){
        console.warn(r.msg);
        return;
    }

    var anchors = [];
    for(var d in data){
        if(d.indexOf('900')>-1){
            anchors.push(d);
        }
    }

    var st = paper.set();

    if(r.result){
        var size = trd*4;
        var ct_coord = paper.rect(r.result.x*zoom - size/2, r.result.y*zoom - size/2, size, size).attr("fill", "#192cff").attr("stroke", "#fff");
        st.push(ct_coord);

        //到各个基站的距离
        drawAnchorLine(anchors, r.result, st);
    }

    if(r.coord_a2){
        if(r.coord_a2.coord1){
            var cd = r.coord_a2.coord1;
            var ct1 = paper.circle(cd.x*zoom, cd.y*zoom, trd*1.2).attr("fill", "#ff1c24").attr("stroke", "#fff");
            st.push(ct1);
        }

        if(r.coord_a2.coord2){
            var cd = r.coord_a2.coord2;
            var ct2 = paper.circle(cd.x*zoom, cd.y*zoom, trd*1.2).attr("fill", "#ff1c24").attr("stroke", "#fff");
            st.push(ct2);
        }
    }

    if(r.coord_a3){
        var cd = r.coord_a3;
        var ct2 = paper.circle(cd.x*zoom, cd.y*zoom, trd*1.2).attr("fill", "#68ff2c").attr("stroke", "#fff");
        st.push(ct2);
    }


    var i=0;
    for(var mac in data){
        if(mac.indexOf('90')!==0) continue;

        var an = getAnchorByCode(mac);
        if(!an) continue;

        var sc = paper.circle(an.x*zoom, an.y*zoom, data[mac].source*zoom).attr("stroke", "#ccc");
        var pc = paper.circle(an.x*zoom, an.y*zoom, data[mac].predict*zoom).attr("stroke", gcolor[i]);

        st.push(sc);
        st.push(pc);
        i++;
    }

    ME.paperSet.push(st);
}



//画tdoa线
function drawAnchorLine(anchors, coord, st){
    for(var i=0;i<anchors.length;i++){
        var anchor=getAnchorByCode(anchors[i], ME.anchors);
        var res_path = paper.path("M"+ coord.x*zoom+","+coord.y*zoom+"L" +anchor.x*zoom+","+ anchor.y*zoom).attr("fill", "red").attr("stroke", "red").attr("opacity", "0.6");
        st.push(res_path);
    }
}
