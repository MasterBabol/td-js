
function Td(targetDom, config) {
    this.targetDom = targetDom;
    this.targetDom.classList.add('td-container');

    this.addSignal = (name, unit, width) => {
        let signalNameCollInput = document.createElement('input');
        signalNameCollInput.setAttribute('type', 'checkbox');
        signalNameCollInput.classList.add('td-signal-name-input');
        signalNameCollInput.setAttribute('id', 'td-signal-name-input-' + name);

        let signalNameLabel = document.createElement('label');
        signalNameLabel.classList.add('td-signal-name');
        signalNameLabel.setAttribute('for', 'td-signal-name-input-' + name);
        signalNameLabel.innerHTML = `${name} [${width - 1}:0]`;
                
        let signalContent = document.createElement('div');
        signalContent.classList.add('td-signal-content');

        let signalContainer = document.createElement('div');
        signalContainer.classList.add('td-signal-container');
        signalContainer.appendChild(signalNameLabel);
        signalContainer.appendChild(signalContent);

        this.targetDom.appendChild(signalNameCollInput);
        this.targetDom.appendChild(signalContainer);
        
        let childrenContents = []

        if (width > 0) {
            let signalChildrenContainer = document.createElement('div');
            signalChildrenContainer.classList.add('td-signal-child-container');

            for (let childId = 0; childId < width; childId++) {
                let childSignalName = `[${childId}]`;

                let signalNameLabel = document.createElement('label');
                signalNameLabel.classList.add('td-signal-name');
                signalNameLabel.innerHTML = childSignalName;
                
                let signalContent = document.createElement('div');
                signalContent.classList.add('td-signal-content');
                
                let signalContainer = document.createElement('div');
                signalContainer.classList.add('td-signal-container');
                signalContainer.appendChild(signalNameLabel);
                signalContainer.appendChild(signalContent);
    
                signalChildrenContainer.appendChild(signalContainer);

                childrenContents.push(signalContent);
            }
        
            this.targetDom.appendChild(signalChildrenContainer);
        }

        let signalInfo = {
            name: name,
            unit: unit,
            width: width,
            doms: {
                container: signalContent,
                children: childrenContents
            },
            addData: (inputs) => {
                let dataArray = Array.isArray(inputs)?inputs:[inputs];
                
                for (let data of dataArray) {
                    let signalDataElem = makeSignalDataElem(data);
                    signalInfo.doms.container.appendChild(signalDataElem);
    
                    const zip = (a, b) => a.map((k, i) => [k, b[i]]);
                    let childrenData = data.split('').reverse();
                    for (let child of zip(signalInfo.doms.children, childrenData)) {
                        child[0].appendChild(makeSignalDataElem(child[1]));
                    }
                }

                TdAdjustStyles(this.targetDom);
            }
        };

        return signalInfo;
    };
}

function makeSignalDataElem(data) {
    let dataElem = document.createElement('div');
    dataElem.classList.add('td-signal');

    if (data.length <= 1) {
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
        dataElem.appendChild(dataTextElem);
    }

    return dataElem;
}

function TdRender(targetDom, tdObject) {
    targetDom.classList.add('td-container');
    targetDom.innerHTML = '';

    let signals = tdObject.signals;
    let signalContainers = [];
        
    let datRegexPat = /\s*([dhlzx])\s*([1-9]\d*)?\s*/g;

    let maximumWidth = 0;

    for (let signal of signals) {
        let accmWidth = 0;

        let signalName = signal.name;
        let signalUnit = signal.unit ?? 1;
        let signalLabels = signal.labels;

        newSignalName = document.createElement('span');
        newSignalName.classList.add('td-signal-name');
        newSignalName.innerHTML = signalName;

        let newSignalContent = document.createElement('div');
        newSignalContent.classList.add('td-signal-content');
        if (signal.type.toLowerCase() === 'clock')
            newSignalContent.classList.add('td-signal-content-shift');

        if (signal.type.toLowerCase() === 'data') {
            let datTerms = signal.data.matchAll(datRegexPat);

            let idx = 0;
            for (let term of datTerms) {
                let sym = term[1];
                let cnt = term[2] ?? 1;

                let newDataElem = document.createElement('div');
                newDataElem.classList.add('td-signal');
                
                switch (sym) {
                    case 'd':
                        newDataElem.classList.add('td-signal-data');
                        let newDataTextElem = document.createElement('span');
                        newDataTextElem.classList.add('td-signal-data-text');
                        newDataTextElem.innerHTML = signalLabels[idx++];
                        newDataElem.appendChild(newDataTextElem);
                        break;
                    case 'h':
                        newDataElem.classList.add('td-signal-high');
                        break;
                    case 'l':
                        newDataElem.classList.add('td-signal-low');
                        break;
                    case 'z':
                        newDataElem.classList.add('td-signal-highz');
                        break;
                    case 'x':
                        newDataElem.classList.add('td-signal-data');
                        newDataElem.classList.add('td-signal-data-dontcare');
                        break;
                }

                newDataElem.style.setProperty('--signal-width', signalUnit * cnt);

                accmWidth += signalUnit * cnt;
                
                newSignalContent.appendChild(newDataElem);
            }
        }
        
        if (accmWidth > maximumWidth)
            maximumWidth = accmWidth;

        let newSignalContainer = document.createElement('div');
        newSignalContainer.classList.add('td-signal-container');
        newSignalContainer.appendChild(newSignalName);
        newSignalContainer.appendChild(newSignalContent);

        signalContainers.push(newSignalContainer);
    }
    
    const zip = (a, b) => a.map((k, i) => [k, b[i]]);
    for (let signalObj of zip(signals, signalContainers)) {
        if (signalObj[0].type.toLowerCase() === 'clock') {
            let signalContent = signalObj[1].querySelector('.td-signal-content');
            let signalUnit = signalObj[0].unit ?? 1;
            let remainder = (maximumWidth / signalUnit) % 1;

            for (let clkCnt = 0; clkCnt < Math.floor(maximumWidth / signalUnit); clkCnt++) {
                let newSignalClkElem = document.createElement('div');
                newSignalClkElem.classList.add('td-signal');
                newSignalClkElem.classList.add('td-signal-clk');
                newSignalClkElem.style.setProperty('--signal-width', signalUnit)
                signalContent.appendChild(newSignalClkElem);
            }

            if (remainder > 0) {
                let newSignalClkElemWrapper = document.createElement('div');
                newSignalClkElemWrapper.classList.add('td-signal-clk-wrapper');
                newSignalClkElemWrapper.style.setProperty('--unit-width', remainder * signalUnit);

                let newSignalClkElem = document.createElement('div');
                newSignalClkElem.classList.add('td-signal');
                newSignalClkElem.classList.add('td-signal-clk');
                newSignalClkElem.style.setProperty('--signal-width', signalUnit)
                
                newSignalClkElemWrapper.appendChild(newSignalClkElem);
                signalContent.appendChild(newSignalClkElemWrapper);
            }
        }
    }

    for (signalContainer of signalContainers) {
        targetDom.appendChild(signalContainer);
    }

    let gridContainer = document.createElement('div');
    gridContainer.classList.add('td-grid-container');

    for (let i = 0; i < maximumWidth; i++) {
        let newGrid = document.createElement('div');
        newGrid.classList.add('td-grid');
        if (i + 1 >= maximumWidth)
            newGrid.style.setProperty('--signal-width', maximumWidth % 1);
        gridContainer.appendChild(newGrid);
    }

    targetDom.appendChild(gridContainer);

    TdAdjustStyles(targetDom);
}

function TdAdjustStyles(targetDom) {
    let td_signal_contents = targetDom.querySelectorAll('.td-signal-content');
    for (let td_signal_content of td_signal_contents) {
        let td_signals = td_signal_content.querySelectorAll('.td-signal');
        console.log(td_signals)
        for (let [idx, td_signal] of td_signals.entries()) {
            if (idx > 0) {
                if (td_signals[idx - 1].classList.contains('td-signal-data') ||
                    td_signals[idx - 1].classList.contains('td-signal-highz')) {
                    td_signal.classList.add('td-signal-smooth-after');
                }
            }
            if (td_signals.length > idx + 1) {
                if (td_signals[idx + 1].classList.contains('td-signal-data') ||
                    td_signals[idx + 1].classList.contains('td-signal-highz')) {
                    td_signal.classList.add('td-signal-smooth-before');
                }
            }
        }
    }
}