/**
 * 创建一个mask
 * @param {object} options  
 */
var mask;
function Mask(options){
    if(mask){
        mask.remove();
    }
    mask =  new _Mask(options);
    function _Mask(obj){
        if(!obj){
            obj = {};
        }
        var _mask = document.createElement('div');
        var body = document.getElementsByTagName('body')[0]
        var self = this;
        _mask.id = 'mask';
        _type(_mask,obj,this);
        body.appendChild(_mask);
        this.show = function(){
            _mask.style.display = 'block';
        }
        this.hide = function(){
            _mask.style.display = 'none';
        }
        this.remove = function(){
            body.removeChild(_mask);
        }
        _mask.onclick = function(){
            self.hide();
        }
        /**
         * 用于生成不同类型的mask
         * @param {*} mask 
         * @param {*} obj 
         */
        function _type(mask,obj,self){
            var element;
            if(!obj.type || obj.type === 'text'){
                var textDiv = document.createElement('div');
                var text = obj.text?obj.text:'奋力加载中...';
                textDiv.className = 'mask-text';
                textDiv.innerText = text;
                textDiv.onclick = function(){
                    return;
                }
                element = textDiv;
            }else if(obj.type === 'message'){
                var arr = [
                    {
                        name:"div",
                        className:"mask-message",
                        text:obj.text || '这是一个消息框'
                    },
                    {
                        name:"button",
                        className:"mask-message-cancel",
                        text:'取消'
                    },
                    {
                        name:"button",
                        className:"mask-message-confirm",
                        text:"确定"
                    },
                    {
                        name:"span",
                        className:"mask-message-title",
                        text:obj.title || '标题'
                    }
                ]
                var message;
                var eles = arr.map(function(value,index) {
                    var ele = createElement(value);
                    if(index === 0){
                        message = ele;
                        return message;
                    }
                    message.appendChild(ele);
                    return ele;
                });
                eles[1].onclick = function(){
                    if(self.cancel && self.cancel instanceof Function){
                        self.cancel.call(this);
                    }
                }
                eles[2].onclick = function(){
                    if(self.confirm && self.confirm instanceof Function){
                        self.confirm.call(this);
                    }
                }
                message.onclick = function(){
                    return;
                }
                element = message;
            }
            element.onclick = function(event){
                event.stopPropagation();
            }
            mask.appendChild(element);
        }
    
        function createElement(options){
            if(!options.name){
                return;
            }
            var _ele = document.createElement(options.name);
            if(options.className){
                _ele.className = options.className;
            }
            if(options.id){
                _ele.id = options.id;
            }
        
            if(options.text){
                _ele.innerText = options.text;
            }
            if(options.style){
                for(var i in options.style){
                    _ele.style[i] = options.style[i];
                }
            }
            return _ele;
        }
    }
}