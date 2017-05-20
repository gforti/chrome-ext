(() => {

   
            let input = window.document.querySelector('input[name="phone"')
            let ev = new Event("blur", {"bubbles": true, "cancelable": false})

            if (input) {
                window.labApi.insertMessage('input Phone found')
            } else {
                window.labApi.insertMessage('input Phone NOT found', false)
                return window.labApi.scriptCompleted()
            }


            async function test(){
                let i = await window.labApi.typeInValue('abc', input)
                let x = await window.labApi.triggerElementEvent(input, 'blur')
                return i + x         
                
            }
            
            test().then(()=>{
                if (input.classList.contains('invalid')) {
                        window.labApi.insertMessage('input Phone does contain invalid class')
                    } else {
                        window.labApi.insertMessage('input Phone does not contain invalid class', false)
                    } 
            })
                    .then(()=>{
                return window.labApi.scriptCompleted()
            })


/*
            window.labApi.typeInValue('abc', input).then((r) => {
                //input.dispatchEvent(ev)
                return window.labApi.triggerElementEvent(input, 'blur').then(()=>{
                   if (input.classList.contains('invalid')) {
                        window.labApi.insertMessage('input Phone does contain invalid class')
                    } else {
                        window.labApi.insertMessage('input Phone does not contain invalid class', false)
                    } 
                })
                
            }).then(() => {
                return window.labApi.typeInValue('123', input).then((r) => {
                    return window.labApi.triggerElementEvent(input, 'blur').then(()=>{
                        if (!input.classList.contains('invalid')) {
                            window.labApi.insertMessage('input Phone does contain invalid class with correct value')
                        } else {
                            window.labApi.insertMessage('input Phone does not contain invalid class', false)
                        }
                    })
                })
            }).then(() => {
                return window.labApi.typeInValue('12345', input).then((r) => {
                    console.log('complete')
                    console.log(r)
                })
            }).then(()=>{
                return window.labApi.scriptCompleted()
            })

        */

})()