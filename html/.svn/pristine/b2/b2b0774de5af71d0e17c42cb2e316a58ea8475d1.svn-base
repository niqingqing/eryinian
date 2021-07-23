class Map {
    constructor(options) {
        this.position = {
            left: 300
        };
        this.options = options;
        this.init();
        this.content = document.getElementById("content");
        let type = "WebGL";
        if (!PIXI.utils.isWebGLSupported()) {
            type = "canvas";
        }
        // PIXI.utils.sayHello(type);
        PIXI.utils.skipHello();
        this.app = new Application(options);
        this.content.appendChild(this.app.view);
        this.app.renderer.backgroundColor = 0xffffff;
        this.setBg();
    }
    init() {
        this.listeners = {};
        this.flags = {
            down: false,
            up: false,
            click: false,
            doubleClick: false,
            addPath: false
        };
        this.addPath = {
            current: null,
            last: null,
            paths: [],
            moveLast: null
        };
        this.mousePints = {
            down: { x: 0, y: 0 }
        };
        this.clickTime = null;
        this.current = null;
    }
    setBg() {
        const { url, scale, width, height } = this.options.background;
        const texture = Texture.from(url);
        texture.baseTexture.on("loaded", e => {
            this.background.scale.set(scale);
        });
        this.background = new Sprite(texture);
        this.background.interactive = true;
        this.background.name = "background";
        this.options.background.scale = scale / this.options.resolution;
        this.app.stage.addChild(this.background);
        this.background.position.x +=
            this.position.left / this.options.resolution;
        this.mousewheel();
        this.onclick();
        this.ondown();
        this.onup();
        this.onmove();
        this.onmousemove();
        this.onesc();
    }
    onesc() {
        window.addEventListener("keyup", e => {
            if (e.keyCode === 27) {
                this.addPathFinish();
            }
            if (e.keyCode === 8) {
                this.backspace();
            }
        });
    }
    onDbclick() {
        this.addPathFinish();
    }
    onclick() {
        const bg = this.background;
        bg.on("click", e => {
            const now = Date.now();
            if (this.clickTime) {
                if (now - this.clickTime < 200) {
                    this.onDbclick();
                }
            }
            this.clickTime = now;
            const point = bg.toLocal(e.data.global);
            const circleWidth = 5 / this.background.scale.x;
            const circle = this.drawCircle(point, circleWidth);
            bg.addChild(circle);
            this.emit("click", {
                point: point,
                scale: bg.scale.x
            });
            setTimeout(() => {
                circle.destroy();
            }, 200);
            if (this.flags.addPath) {
                this.addPath.paths.push(point);
                const current = (this.addPath.current = this.drawLine(
                    this.addPath.paths
                ));
                this.clearLast();
                if (!current) {
                    return;
                }
                this.addPath.last = current;
                bg.addChild(current);
            }
        });
    }
    ondown() {
        this.background.on("mousedown", e => {
            const event = e.data.originalEvent;
            this.flags.down = true;
            this.mousePints.down = {
                x: event.pageX,
                y: event.pageY
            };
        });
    }
    onmousemove() {
        const bg = this.background;
        bg.on("mousemove", e => {
            const event = e.data.originalEvent;
            if (this.flags.down) {
                const d = {
                    x:
                        (event.pageX - this.mousePints.down.x) /
                        this.options.resolution,
                    y:
                        (event.pageY - this.mousePints.down.y) /
                        this.options.resolution
                };
                bg.position.x += d.x;
                bg.position.y += d.y;
                this.mousePints.down = {
                    x: event.pageX,
                    y: event.pageY
                };
                return;
            }
            if (this.addPath.paths.length < 1) {
                this.clearMoveLast();
            }
            if (
                this.flags.addPath &&
                this.addPath.paths &&
                this.addPath.paths.length > 0
            ) {
                const paths = [
                    this.addPath.paths[this.addPath.paths.length - 1],
                    bg.toLocal(e.data.global)
                ];
                const line = this.drawLine(paths);
                this.clearMoveLast();
                bg.addChild(line);
                this.addPath.moveLast = line;
            }
        });
    }
    onup() {
        this.background.on("mouseup", e => {
            this.flags.down = false;
        });
    }
    onmove() {}
    mousewheel() {
        const resolution = this.options.resolution;
        const bg = this.background;
        const MINSCALE = 0.01;
        const MAXSCALE = 10;
        this.content.onmousewheel = e => {
            let scale = bg.scale.x + (e.wheelDelta / 12000) * bg.scale.x * 10;
            if (scale < MINSCALE) {
                scale = MINSCALE;
            }
            if (scale > MAXSCALE) {
                scale = MAXSCALE;
            }
            if (this.background) {
                const px = bg.position.x * resolution;
                const py = bg.position.y * resolution;
                const pmx = e.x - px;
                const pmy = e.y - py;
                const ratiox = pmx / bg.width;
                const ratioy = pmy / bg.height;
                this.options.background.scale = scale;
                this.background.scale.set(scale);
                const position = {
                    x: (e.x - bg.width * ratiox) / resolution,
                    y: (e.y - bg.height * ratioy) / resolution
                };
                bg.position.set(position.x, position.y);
            }
        };
    }
    toBg(point) {
        const resolution = this.options.resolution;
        const { x, y } = this.background.toLocal(point);
        return {
            x: x / resolution,
            y: y / resolution
        };
    }
    drawCircle(point, r, color = 0xda70d6) {
        const { x, y } = point;
        const circle = new Graphics();
        circle.beginFill(color);
        circle.drawCircle(x, y, r);
        circle.endFill();
        return circle;
    }
    drawLine(points, color = 0x8b008b) {
        const scale = this.options.background.scale;
        const resolution = this.options.resolution;
        if (!points || points.length < 1) {
            return;
        }
        const line = new Graphics();
        let width = Math.PI / scale / resolution;
        line.lineStyle(width, color);
        points.forEach((point, index) => {
            if (index === 0) {
                line.moveTo(point.x, point.y);
            } else {
                line.lineTo(point.x, point.y);
            }
        });
        return line;
    }
    addPathStart() {
        this.flags.addPath = true;
    }
    addPathFinish() {
        const paths = [].concat(this.addPath.paths);
        this.flags.addPath = false;
        this.addPath.paths = [];
        this.clearMoveLast();
        this.emit("addFinish", paths);
    }
    emit(eventName, data) {
        let listeners = this.listeners[eventName];
        if (!listeners || listeners.length < 1) {
            return;
        }
        for (const listener of listeners) {
            listener(data);
        }
    }
    on(eventName, listener) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(listener);
    }
    backspace() {
        console.log("backspace");
        if (this.flags.addPath) {
            this.addPath.paths.pop();
            this.clearLast();
            this.clearMoveLast();
            let line = this.drawLine(this.addPath.paths);
            this.background.addChild(line);
            this.addPath.last = line;
        }
    }
    resetBg(options) {
        this.options = options;
        this.init();
        PIXI.utils.destroyTextureCache();
        this.background.destroy();
        this.setBg();
    }
    clearMap() {
        this.clearLast();
        this.clearCurrent();
    }
    clearMoveLast() {
        if (this.addPath.moveLast && !this.addPath.moveLast._destroyed) {
            this.addPath.moveLast.destroy();
            this.addPath.moveLast = null;
        }
    }
    clearLast() {
        if (this.addPath.last && !this.addPath.last._destroyed) {
            this.addPath.last.destroy();
            this.addPath.last = null;
        }
    }
    clearCurrent() {
        if (this.addPath.current && !this.addPath.current._destroyed) {
            this.addPath.current.destroy();
            this.addPath.current = null;
        }
    }
}
