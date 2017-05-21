(() => {
   
            let input = window.document.querySelector('#num')
            let button = window.document.querySelector('#btnGenerate')
            let div = window.document.querySelector('#wrapper')
            
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
                return window.labApi.scriptCompleted()
            }
            
            if (!window.scriptexecutedLab2) {
                observer.observe(div, config)
            } 
            window.scriptexecutedLab2 = true;
            
            runTest().then(()=>{
                return window.labApi.scriptCompleted()
            })
                        

            async function runTest() {
                const numberToGenerate = (Math.floor(Math.random() * (7 - 4)) + 4).toString();
                await window.labApi.typeInValue(numberToGenerate, input)
                await window.labApi.triggerElementEvent(button, 'click')
                                    
            }
            
            
             async function handleChange(target, text) {
                let tableDom = target.querySelector('table')
                let rows = tableDom.querySelectorAll('tr')
                let td = tableDom.querySelectorAll('td')
                text = +text;

                if (rows.length === text) {
                    window.labApi.insertMessage('correct rows')
                } else {
                    window.labApi.insertMessage('bad rows', false)
                }

                if (td.length === (rows.length * text)) {
                    window.labApi.insertMessage('correct data');
                } else {
                    window.labApi.insertMessage('bad data length', false)
                }

                let index = 0
                 for (const  item of td) {
                    await window.labApi.mouseToElementPosition(item)
                    
                    index++
                    const num = +item.innerText // better shortcut for parseInt
                    const bgcolor = window.getComputedStyle(item, null).getPropertyValue('background-color')
                    const [red, green, blue] = bgcolor.match(/\d+/g).map(Number)
                     
                    let error = false
                    if (num % 2 === 0) { // red 
                        if (red === 0)
                            error = true
                    } else if (num % 3 === 0) { //blue                        
                        if (blue === 0)
                            error = true
                    } else if ( ![red, green, blue].every((currentValue,index,items)=>currentValue === items[0]) ) {                       
                        error = true
                    }

                    if (error) {
                        window.labApi.insertMessage(`bad data color in table row ${~~(index/text)} Col ${~~(index%text)} data: ${num}`, false)
                    }
                  }
                  
                  
            }


       


})()