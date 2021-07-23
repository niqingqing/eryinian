let config = {
    ids:[64,65,66,67]
}
window.onload = function(){
    let host = location.host;
    console.log(host);
    let childs = document.getElementsByClassName("childPage");
    for(let i =0;i<childs.length;i++){
        let child = childs[i];
        //http://localhost/map/map2d/svg/sim/?map=xystudy_64&anony=super
        let url = "http://" + host + "/map/map2d/svg/sim/?map=" + UBIT.user.projectCode + "_" + config.ids[i] + "&anony=super";
        child.src = url;
    }
};

