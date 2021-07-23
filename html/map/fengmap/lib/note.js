var note = {
    ele:null,
    init:function(){
        var ele = this.ele = document.getElementById("note-container");
        ele.style.bottom = document.body.clientHeight + 2 + "px";
    },
    waring:function(opts){
        opts.type = "warning";
        this.add(opts);
    },
    success:function(opts){
        opts.type = "success";
        this.add(opts);
    },
    add:function(opts){
        var self = this;
        var type = opts.type;
        var msg = opts.msg;
        var url = opts.url;
        var color = "red";
        var time = opts.time || 500;
        if(type === 'success'){
            color = "#5182c5";
        }else if(type === 'warning'){
            color = "orange"
        }else{
            color = "#d43f3a";
        }
        var tip = document.createElement("div");
        var closeBtn = document.createElement("div");
        closeBtn.className = "note-close-btn";
        closeBtn.innerText = "X";
        closeBtn.onclick = function(){
            console.log(self);
            self.remove(tip);
            tip = null;
        };
        tip.className = "note";
        tip.style["background-color"] = color;
        if(url){
            var a = document.createElement('a');
            a.href = url;
            a.innerText = msg;
            a.style.color = "white";
            a["target"] = "__blank";
            tip.appendChild(a)
        }else{
            tip.innerText = msg;
        }
        tip.appendChild(closeBtn);
        this.ele.appendChild(tip);
        setTimeout(() => {
            if(tip){
                self.remove(tip);
            }
        },2000)
    },
    remove:function(tip){
        this.ele.removeChild(tip);
    }
};
note.init();