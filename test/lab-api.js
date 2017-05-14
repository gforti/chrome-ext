(()=>{
    
    
    console.log(window.scriptexecutedLabAPI);
        
    const DIV_ID = 'labResults-rnt7dvtto9'
    
    if ( !window.document.querySelector('#'+DIV_ID) ) {
        window.document.body.insertAdjacentHTML('afterbegin', '<input id="togglelabresults" type="checkbox" checked><label for="togglelabresults">Lab Results</label><div id="'+DIV_ID+'"></div>');
    }
    
    const LAB_RESULTS = window.document.querySelector('#'+DIV_ID)
    
    LAB_RESULTS.innerHTML = ''
    
    
    if (window.scriptexecutedLabAPI) {
        return true;
    }
    
    window.scriptexecutedLabAPI = true;
    
    window.labApi = {
        'typeInValue' : typeInValue,
        'uuid' : uuid,
        'insertMessage' : insertMessage,
    }
    
    
    function insertMessage(msg, pass = true) {
        let html = '<p class="'+ (!!pass ? 'pass' : 'fail') +'">' + msg + '</p>'
        LAB_RESULTS.insertAdjacentHTML('beforeend', html)
    }
    
    function uuid() {
        return Math.random().toString(36).substring(2, 15)
    }
    
    function typeInValue(text, input) {


        let total = text.length;
        let counter = 0;
        let speed = 100;

        return new Promise((resolve, reject) => {

            if (!input) {
                insertMessage('test failed for '+ text, false )
                resolve(text)
            }
            removeInput(resolve)

        })

        function removeInput(resolve) {

            if (input.value.length) {
                input.value = input.value.substring(0, input.value.length - 1)
                window.setTimeout(removeInput.bind(this, resolve), speed)
            } else {
                setInput(resolve)
            }

        }

        function setInput(resolve) {
            if (counter <= total) {
                input.value += text.charAt(counter)
                counter++
                window.setTimeout(setInput.bind(this, resolve), speed)
            } else {
                resolve(text)
            }
        }

    }
    
    
    
    
    
})()

