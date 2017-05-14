(() => {
        console.log(window.scriptexecutedLab2);

       
        
            let input = window.document.querySelector('#num')
            let button = window.document.querySelector('#btnGenerate')
            let button2 = window.document.querySelector('#btnGenerate2')
            let div = window.document.querySelector('#wrapper')
            let ev = new Event("click", {"bubbles": true, "cancelable": false})
           
            const config = {attributes: true, childList: true, characterData: true}
            let observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {

                    handleChange(mutation.target, input.value)
                });
            })
            
            
            if (div) {
                window.labApi.insertMessage('div wrapper found')
            } else {
                window.labApi.insertMessage('div wrapper NOT found', false)
                return
            }
            
            if (!window.scriptexecutedLab2) {
                observer.observe(div, config)
            } 
            window.scriptexecutedLab2 = true;
            runTest()
            

            function runTest() {
                window.labApi.typeInValue('3', input).then((text) => {
                    button.dispatchEvent(ev)
                }).then(() => {
                    return window.labApi.typeInValue('5', input).then((text) => {
                        button.dispatchEvent(ev)
                    })
                })
            }


            function handleChange(target, text) {
                let tableDom = target.querySelector('table')
                let rows = tableDom.querySelectorAll('tr')
                let td = tableDom.querySelectorAll('td')
                text = window.parseInt(text);


                if (rows.length === text) {
                    window.labApi.insertMessage('correct rows');
                } else {
                    window.labApi.insertMessage('bad rows', false);
                }

                if (td.length === (rows.length * text)) {
                    window.labApi.insertMessage('correct data');
                } else {
                    window.labApi.insertMessage('bad data length', false);
                }


                td.forEach((item) => {
                    let num = window.parseInt(item.innerText)
                    let bgcolor = window.getComputedStyle(item, null).getPropertyValue('background-color');

                    let error = false
                    if (num % 2 === 0) { // red
                        if (bgcolor !== 'rgb(255, 0, 0)')
                            error = true
                    } else if (num % 3 === 0) { //blue
                        if (bgcolor !== 'rgb(0, 0, 255)')
                            error = true
                    } else if (bgcolor !== 'rgba(0, 0, 0, 0)') {
                        error = true
                    }

                    if (error) {
                        window.labApi.insertMessage('bad data color in table ' + bgcolor, false);
                    }

                })
            }


       


})()