const bluryfy = (elem, volume, color) => {
    elem.style.textShadow = `${color} 0px 0px ${~~volume}px`;
    elem.style.color = "transparent";
};

const remap = (value, low1, high1, low2, high2) => {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
};

const calcDistance = (p1, p2) => {
    const a = p2.x - p1.x;
    const b = p2.y - p1.y;
    return Math.sqrt(a * a + b * b);
};

const calcElemCenter = (elem) => {
    const rect = elem.getBoundingClientRect();
    return {
        x: rect.x+(rect.width/2),
        y: rect.y+(rect.height/2),
    }
};

const state = {
    thumbsCenter: [],
    updateMaxDistance: 1000
};

const MIN_BLUR = 0;
const MAX_BLUR = 75;
const DEFAULT_BLUR = 50;
const BODY_MARGIN = 50;

window.onload = () => {
    const thumbs = [].slice.call( document.querySelectorAll(".page-thumbnail") );

    const updateThumbsCenter = () => {
        state.thumbsCenter = thumbs.map(calcElemCenter);
    };

    const updateMaxDistance = () => {
        state.maxDistance = calcDistance(
            {x: BODY_MARGIN, y: BODY_MARGIN},
            {x: window.innerWidth, y: window.innerHeight}
            );
    };

    updateThumbsCenter();
    updateMaxDistance();

    window.onmousemove = (e) => {
        thumbs.forEach((thumb, i) => {
            const thumbCenter = state.thumbsCenter[i];
            const mouseCenter = {x: e.clientX, y: e.clientY};
            const dx = calcDistance(thumbCenter, mouseCenter);
            const blurVolume = remap(dx, 0, state.maxDistance, MIN_BLUR, MAX_BLUR);
            bluryfy(thumb, blurVolume, "blue");
        })
    }

    window.onresize = () => {
        updateThumbsCenter();
        updateMaxDistance();
    }


    const deviceAgent = navigator.userAgent.toLowerCase();

    const isTouch = (deviceAgent.match(/(iphone|ipod|ipad)/) ||
        deviceAgent.match(/(android)/)  ||
        deviceAgent.match(/(iemobile)/) ||
        deviceAgent.match(/iphone/i) ||
        deviceAgent.match(/ipad/i) ||
        deviceAgent.match(/ipod/i) ||
        deviceAgent.match(/blackberry/i) ||
        deviceAgent.match(/bada/i) ||
        deviceAgent.match(/mobile/i)
    ) !== null;

    if (isTouch) {
        console.log("your device is a touch screen device.");
        [].slice.call(document.links).forEach((link) => {
            link.dataset.url = link.href;
            link.href = "javascript:;"
            link.onclick = () => {
                //reset others
                [].slice.call(document.links).forEach((_link)=>{
                    if(_link.dataset.url !== link.dataset.url){
                        _link.classList.remove("clicked")
                    }
                });
                if(link.classList.contains("clicked")){
                    window.location.href = link.dataset.url;
                }else{
                    link.classList.add("clicked")
                }
            };
        });
    }


};
