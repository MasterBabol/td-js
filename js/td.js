/*! Split.js - v1.6.0 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).Split=t()}(this,(function(){"use strict";var e="undefined"!=typeof window?window:null,t=null===e,n=t?void 0:e.document,i=function(){return!1},r=t?"calc":["","-webkit-","-moz-","-o-"].filter((function(e){var t=n.createElement("div");return t.style.cssText="width:"+e+"calc(9px)",!!t.style.length})).shift()+"calc",s=function(e){return"string"==typeof e||e instanceof String},o=function(e){if(s(e)){var t=n.querySelector(e);if(!t)throw new Error("Selector "+e+" did not match a DOM element");return t}return e},a=function(e,t,n){var i=e[t];return void 0!==i?i:n},u=function(e,t,n,i){if(t){if("end"===i)return 0;if("center"===i)return e/2}else if(n){if("start"===i)return 0;if("center"===i)return e/2}return e},l=function(e,t){var i=n.createElement("div");return i.className="gutter gutter-"+t,i},c=function(e,t,n){var i={};return s(t)?i[e]=t:i[e]=r+"("+t+"% - "+n+"px)",i},h=function(e,t){var n;return(n={})[e]=t+"px",n};return function(r,s){if(void 0===s&&(s={}),t)return{};var d,f,v,m,g,p,y=r;Array.from&&(y=Array.from(y));var z=o(y[0]).parentNode,b=getComputedStyle?getComputedStyle(z):null,E=b?b.flexDirection:null,S=a(s,"sizes")||y.map((function(){return 100/y.length})),L=a(s,"minSize",100),_=Array.isArray(L)?L:y.map((function(){return L})),w=a(s,"expandToMin",!1),k=a(s,"gutterSize",10),x=a(s,"gutterAlign","center"),C=a(s,"snapOffset",30),M=a(s,"dragInterval",1),U=a(s,"direction","horizontal"),O=a(s,"cursor","horizontal"===U?"col-resize":"row-resize"),D=a(s,"gutter",l),A=a(s,"elementStyle",c),B=a(s,"gutterStyle",h);function j(e,t,n,i){var r=A(d,t,n,i);Object.keys(r).forEach((function(t){e.style[t]=r[t]}))}function F(){return p.map((function(e){return e.size}))}function R(e){return"touches"in e?e.touches[0][f]:e[f]}function T(e){var t=p[this.a],n=p[this.b],i=t.size+n.size;t.size=e/this.size*i,n.size=i-e/this.size*i,j(t.element,t.size,this._b,t.i),j(n.element,n.size,this._c,n.i)}function N(e){var t,n=p[this.a],r=p[this.b];this.dragging&&(t=R(e)-this.start+(this._b-this.dragOffset),M>1&&(t=Math.round(t/M)*M),t<=n.minSize+C+this._b?t=n.minSize+this._b:t>=this.size-(r.minSize+C+this._c)&&(t=this.size-(r.minSize+this._c)),T.call(this,t),a(s,"onDrag",i)())}function q(){var e=p[this.a].element,t=p[this.b].element,n=e.getBoundingClientRect(),i=t.getBoundingClientRect();this.size=n[d]+i[d]+this._b+this._c,this.start=n[v],this.end=n[m]}function H(e){var t=function(e){if(!getComputedStyle)return null;var t=getComputedStyle(e);if(!t)return null;var n=e[g];return 0===n?null:n-="horizontal"===U?parseFloat(t.paddingLeft)+parseFloat(t.paddingRight):parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)}(z);if(null===t)return e;if(_.reduce((function(e,t){return e+t}),0)>t)return e;var n=0,i=[],r=e.map((function(r,s){var o=t*r/100,a=u(k,0===s,s===e.length-1,x),l=_[s]+a;return o<l?(n+=l-o,i.push(0),l):(i.push(o-l),o)}));return 0===n?e:r.map((function(e,r){var s=e;if(n>0&&i[r]-n>0){var o=Math.min(n,i[r]-n);n-=o,s=e-o}return s/t*100}))}function I(){var t=p[this.a].element,r=p[this.b].element;this.dragging&&a(s,"onDragEnd",i)(F()),this.dragging=!1,e.removeEventListener("mouseup",this.stop),e.removeEventListener("touchend",this.stop),e.removeEventListener("touchcancel",this.stop),e.removeEventListener("mousemove",this.move),e.removeEventListener("touchmove",this.move),this.stop=null,this.move=null,t.removeEventListener("selectstart",i),t.removeEventListener("dragstart",i),r.removeEventListener("selectstart",i),r.removeEventListener("dragstart",i),t.style.userSelect="",t.style.webkitUserSelect="",t.style.MozUserSelect="",t.style.pointerEvents="",r.style.userSelect="",r.style.webkitUserSelect="",r.style.MozUserSelect="",r.style.pointerEvents="",this.gutter.style.cursor="",this.parent.style.cursor="",n.body.style.cursor=""}function W(t){if(!("button"in t)||0===t.button){var r=p[this.a].element,o=p[this.b].element;this.dragging||a(s,"onDragStart",i)(F()),t.preventDefault(),this.dragging=!0,this.move=N.bind(this),this.stop=I.bind(this),e.addEventListener("mouseup",this.stop),e.addEventListener("touchend",this.stop),e.addEventListener("touchcancel",this.stop),e.addEventListener("mousemove",this.move),e.addEventListener("touchmove",this.move),r.addEventListener("selectstart",i),r.addEventListener("dragstart",i),o.addEventListener("selectstart",i),o.addEventListener("dragstart",i),r.style.userSelect="none",r.style.webkitUserSelect="none",r.style.MozUserSelect="none",r.style.pointerEvents="none",o.style.userSelect="none",o.style.webkitUserSelect="none",o.style.MozUserSelect="none",o.style.pointerEvents="none",this.gutter.style.cursor=O,this.parent.style.cursor=O,n.body.style.cursor=O,q.call(this),this.dragOffset=R(t)-this.end}}"horizontal"===U?(d="width",f="clientX",v="left",m="right",g="clientWidth"):"vertical"===U&&(d="height",f="clientY",v="top",m="bottom",g="clientHeight"),S=H(S);var X=[];function Y(e){var t=e.i===X.length,n=t?X[e.i-1]:X[e.i];q.call(n);var i=t?n.size-e.minSize-n._c:e.minSize+n._b;T.call(n,i)}return(p=y.map((function(e,t){var n,i={element:o(e),size:S[t],minSize:_[t],i:t};if(t>0&&((n={a:t-1,b:t,dragging:!1,direction:U,parent:z})._b=u(k,t-1==0,!1,x),n._c=u(k,!1,t===y.length-1,x),"row-reverse"===E||"column-reverse"===E)){var r=n.a;n.a=n.b,n.b=r}if(t>0){var s=D(t,U,i.element);!function(e,t,n){var i=B(d,t,n);Object.keys(i).forEach((function(t){e.style[t]=i[t]}))}(s,k,t),n._a=W.bind(n),s.addEventListener("mousedown",n._a),s.addEventListener("touchstart",n._a),z.insertBefore(s,i.element),n.gutter=s}return j(i.element,i.size,u(k,0===t,t===y.length-1,x),t),t>0&&X.push(n),i}))).forEach((function(e){var t=e.element.getBoundingClientRect()[d];t<e.minSize&&(w?Y(e):e.minSize=t)})),{setSizes:function(e){var t=H(e);t.forEach((function(e,n){if(n>0){var i=X[n-1],r=p[i.a],s=p[i.b];r.size=t[n-1],s.size=e,j(r.element,r.size,i._b,r.i),j(s.element,s.size,i._c,s.i)}}))},getSizes:F,collapse:function(e){Y(p[e])},destroy:function(e,t){X.forEach((function(n){if(!0!==t?n.parent.removeChild(n.gutter):(n.gutter.removeEventListener("mousedown",n._a),n.gutter.removeEventListener("touchstart",n._a)),!0!==e){var i=A(d,n.a.size,n._b);Object.keys(i).forEach((function(e){p[n.a].element.style[e]="",p[n.b].element.style[e]=""}))}}))},parent:z,pairs:X}}}));
//# sourceMappingURL=split.min.js.map

const zip = (a, b) => a.map((k, i) => [k, b[i]]);

function Td(targetDom, config) {
    let container = document.createElement('div');
    container.classList.add('td');

    let signalNamesContainer = document.createElement('div');
    signalNamesContainer.classList.add('td-signal_names');

    let signalContentsContainer = document.createElement('div');
    signalContentsContainer.classList.add('td-signal_contents');

    let signalContentsContainerWrapper = document.createElement('div');
    signalContentsContainerWrapper.classList.add('td-signal_contents_wrapper');
    signalContentsContainerWrapper.appendChild(signalContentsContainer);

    container.appendChild(signalNamesContainer);
    container.appendChild(signalContentsContainerWrapper);

    targetDom.appendChild(container);

    Split([signalNamesContainer, signalContentsContainerWrapper], {
        direction: 'horizontal',
        gutterSize: 5,
        sizes: [20, 80]
    });

    this.data = {
        signalInfos: [],
    };

    this.config = {
        width: config?.width ?? 30,
        widthResizeUnit: config?.widthResizeUnit ?? 10
    };

    this.doms = {
        namesContainer: signalNamesContainer,
        contentsContainer: signalContentsContainer
    };

    this.addSignal = (name, unit, width) => {
        let signalElems = makeSignalElems(name, width);

        this.doms.namesContainer.append(
            signalElems.nameOutline,
            signalElems.nameInput,
            signalElems.nameDetail
        );
        signalElems.nameOutline.classList.add('td-signal_name_outline');
        signalElems.nameDetail.classList.add('td-signal_name_detail');

        this.doms.contentsContainer.append(
            signalElems.contentOutline,
            signalElems.contentInput,
            signalElems.contentDetail
        );
        signalElems.contentOutline.classList.add('td-signal_content_outline');
        signalElems.contentDetail.classList.add('td-signal_content_detail');
        
        let childrenContents = []
        if (width > 0) {
            for (let childId = 0; childId < width; childId++) {
                let childSignalName = `[${childId}]`;
                let childSignalElems = makeSignalElems(childSignalName, 0, true);

                childSignalElems.nameOutline.classList.add('td-signal_name_outline');
                signalElems.nameDetail.append(
                    childSignalElems.nameOutline
                );

                childSignalElems.contentOutline.classList.add('td-signal_content_outline');

                childrenContents.push(childSignalElems.contentOutline);

                signalElems.contentDetail.append(
                    childSignalElems.contentOutline
                );
            }
        }

        let signalInfo = {
            name: name,
            unit: unit,
            width: width,
            data: [],
            doms: {
                content: signalElems.contentOutline,
                children: childrenContents
            },
            addData: (inputs, doAdjustUi = true) => {
                let dataArray = Array.isArray(inputs)?inputs:[inputs];
                
                for (let data of dataArray) {
                    let signalDataElem = makeSignalDataElem(data, width);
                    signalDataElem.style.setProperty('--signal-width', signalInfo.unit);
                    signalInfo.doms.content.appendChild(signalDataElem);
    
                    let childrenData = data.split('').reverse();
                    for (let child of zip(signalInfo.doms.children, childrenData)) {
                        let dataElem = makeSignalDataElem(child[1], 0);
                        dataElem.style.setProperty('--signal-width', signalInfo.unit);
                        child[0].appendChild(dataElem);
                    }
                }

                signalInfo.data = signalInfo.data.concat(dataArray);

                if (doAdjustUi)
                    this.adjustUi();
            }
        };

        this.data.signalInfos.push(signalInfo);

        return signalInfo;
    };

    this.addSignalData = (dataVector, doAdjustUi = true) => {
        for (let elem of zip(this.data.signalInfos, dataVector)) {
            elem[0].addData(elem[1], false);
        }

        if (doAdjustUi)
            this.adjustUi();
    };

    this.changeUnitWidth = (newWidth, doAdjustUi = true) => {
        this.config.width = parseInt(newWidth);
        this.doms.contentsContainer.style.setProperty('--cycle-width', newWidth + 'px');

        if (doAdjustUi)
            this.adjustUi();
    };

    this.adjustUi = () => {
        adjustStyles(this.doms.contentsContainer);

        for (let signalInfo of this.data.signalInfos) {
            adjustSignalDataElemText(signalInfo.doms.content, signalInfo.data);
        }
    };
    
    this.changeUnitWidth(config.width, true);

    signalContentsContainerWrapper.addEventListener('click', (ev) => {
    });

    signalContentsContainerWrapper.addEventListener('mousewheel', (ev) => {
        if(ev.ctrlKey == true)
        {
            ev.preventDefault();
            let delta = (ev.wheelDelta > 0?1:-1) * this.config.widthResizeUnit;

            let prevScroll = signalContentsContainerWrapper.scrollLeft;
            let prevWidth = signalContentsContainer.offsetWidth;
            this.changeUnitWidth(this.config.width + delta, true);
            let nextWidth = signalContentsContainer.offsetWidth;
            let gain = nextWidth / prevWidth;
            
            let prevCenter = prevScroll + signalContentsContainerWrapper.offsetWidth / 2;
            let nextCenter = prevCenter * gain;
            let nextScroll = nextCenter - signalContentsContainerWrapper.offsetWidth / 2;
            
            signalContentsContainerWrapper.scroll({
                left: nextScroll
            });
        }
    });
}

function makeCollapsibleElems(name, connectLabel = true) {
    inputElem = document.createElement('input');
    inputElem.classList.add('td__collapsible_elem__input');
    inputElem.setAttribute('id', 'td__collapsible_elem__input_of_' + name);
    inputElem.setAttribute('type', 'checkbox');

    let labelElem = document.createElement('label');
    if (connectLabel)
        labelElem.setAttribute('for', 'td__collapsible_elem__input_of_' + name);
    labelElem.classList.add('td__collapsible_elem__label');

    let contentElem = document.createElement('div');
    contentElem.classList.add('td__collapsible_elem__content');

    return {
        input: inputElem,
        outline: labelElem,
        detail: contentElem
    }
}

function makeSignalElems(name, width, isChild = false) {
    if (!isChild) {
        let nameElems = makeCollapsibleElems(name);
        nameElems.outline.innerHTML = (width >= 1)?`${name} [${width - 1}:0]`:name;
    
        let contentElems = makeCollapsibleElems(name, false);
    
        nameElems.input.addEventListener('change', (ev) => {
            contentElems.input.checked = ev.currentTarget.checked;
        });
    
        return {
            nameOutline: nameElems.outline,
            nameInput: nameElems.input,
            nameDetail: nameElems.detail,
            contentOutline: contentElems.outline,
            contentInput: contentElems.input,
            contentDetail: contentElems.detail,
        }
    } else {
        let nameElems = document.createElement('div');
        nameElems.innerHTML = (width >= 1)?`${name} [${width - 1}:0]`:name;
    
        let contentElems = document.createElement('div');
    
        return {
            nameOutline: nameElems,
            contentOutline: contentElems
        }
    }
}

function makeSignalDataElem(data, width) {
    let dataElem = document.createElement('div');
    dataElem.classList.add('td-signal');

    if (width == 0) {
        switch (data) {
            case '0':
                dataElem.classList.add('td-signal-low');
                break;
            case '1':
                dataElem.classList.add('td-signal-high');
                break;
            case 'z':
                dataElem.classList.add('td-signal-highz');
                break;
            case 'x':
                dataElem.classList.add('td-signal-data');
                dataElem.classList.add('td-signal-data-dontcare');
                let dataTextElem = document.createElement('span');
                dataTextElem.classList.add('td-signal-data-text');
                dataTextElem.innerHTML = 'x';
                dataElem.appendChild(dataTextElem);
                break;
        }
    } else {
        dataElem.classList.add('td-signal-data');
        let dataTextElem = document.createElement('span');
        dataTextElem.classList.add('td-signal-data-text');
        dataTextElem.innerHTML = data;
        dataTextElem.setAttribute('title', data);
        dataElem.appendChild(dataTextElem);
    }

    return dataElem;
}

function adjustSignalDataElemText(containerDom, origData) {
    let targets = containerDom.querySelectorAll('.td-signal-data');
    
    for (let elem of zip(Array.from(targets), origData)) {
        let calcedTextWidth = getTextWidth(elem[1], getCanvasFontSize(elem[0]));
        let textDom = elem[0].children[0];
        
        if (calcedTextWidth >= elem[0].offsetWidth) {
            let calcedLetterWidth = calcedTextWidth / elem[1].length;
            let calcedMaxLetters = Math.max(elem[0].offsetWidth / calcedLetterWidth, 3);
            let fitWord = elem[1].substr(0, calcedMaxLetters - 3) + '...';
            textDom.innerHTML = fitWord;
        }
        else
            textDom.innerHTML = elem[1];
    }
}

function getTextWidth(text, font) {
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}
  
function getCssStyle(element, prop) {
    return window.getComputedStyle(element, null).getPropertyValue(prop);
}

function getCanvasFontSize(el = document.body) {
    const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
    const fontSize = getCssStyle(el, 'font-size') || '16px';
    const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';

    return `${fontWeight} ${fontSize} ${fontFamily}`;
}

function adjustStyles(targetDom) {
    let tdSignalContents = targetDom.querySelectorAll('.td-signal_content_outline');
    for (let tdSignalContent of tdSignalContents) {
        let tdSignals = tdSignalContent.querySelectorAll('.td-signal');
        for (let [idx, tdSignal] of tdSignals.entries()) {
            if (idx > 0) {
                if (tdSignals[idx - 1].classList.contains('td-signal-data') ||
                tdSignals[idx - 1].classList.contains('td-signal-highz')) {
                    tdSignal.classList.add('td-signal-smooth-after');
                }
            }
            if (tdSignals.length > idx + 1) {
                if (tdSignals[idx + 1].classList.contains('td-signal-data') ||
                tdSignals[idx + 1].classList.contains('td-signal-highz')) {
                    tdSignal.classList.add('td-signal-smooth-before');
                }
            }
        }
    }
}