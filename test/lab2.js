(() => {

    let input = window.document.querySelector('#num')
    let button = window.document.querySelector('#btnGenerate') || window.document.querySelector('#btngenerate')
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

    runTest()


    async function runTest() {
        const numberToGenerate = (Math.floor(Math.random() * (7 - 4)) + 4).toString();
        await window.labApi.typeInValue(numberToGenerate, input)
        await window.labApi.triggerElementEvent(button, 'click')

    }


    async function handleChange(target, numberToGenerate) {
		
		if ( !div.innerHTML.length ) {
			 window.labApi.insertMessage('div wrapper empty', false)
			return window.labApi.scriptCompleted()
		}
		
        let tableDom = target.querySelector('table')
        let rows = tableDom.querySelectorAll('tr')
        let td = tableDom.querySelectorAll('td')
        numberToGenerate = +numberToGenerate;

        if (rows.length === numberToGenerate) {
            window.labApi.insertMessage('correct rows')
        } else {
            window.labApi.insertMessage('bad rows', false)
        }

        if (td.length === (rows.length * numberToGenerate)) {
            window.labApi.insertMessage('correct data');
        } else {
            window.labApi.insertMessage('bad data length', false)
        }

        let index = 0
        for (const item of td) {
            await window.labApi.mouseToElementPosition(item)

            index++
            const num = +item.innerText // better shortcut for parseInt
            let bgcolor = window.getComputedStyle(item, null).getPropertyValue('background-color')
            let [red, green, blue] = bgcolor.match(/\d+/g).map(Number) // Destructuring assignment

            let error = ''

            if (num % 3 === 0) { // red 
                if (red === 0)
                    error = 'red'
            } else if (num % 2 === 0) { //blue                        
                if (blue === 0)
                    error = 'blue'
            } else if (![red, green, blue].every((currentValue, index, items) => currentValue === items[0])) {
                error = 'transparent'
            }

            if (error.length) {
                window.labApi.insertMessage(`Expected Row: ${~~(index / numberToGenerate)} Col: ${~~(index % numberToGenerate)} data: ${num} to be ${error}`, false)
            }
        }
        
        return window.labApi.scriptCompleted()

    }


})()
