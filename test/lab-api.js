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
        'scriptCompleted' : scriptCompleted,
        'triggerElementEvent' : triggerElementEvent,        
    }
    
    window.document.body.insertAdjacentHTML('beforeend',`<svg style="position: absolute; bottom:0px; right:0px" id="mouseCursor" viewBox="0 0 463.721 463.721" width="20px" height="20px">
            <path d="M407.453,224.871c0.85-6.517-1.983-13.317-7.65-16.717L82.186,2.737c-5.1-3.4-11.9-3.683-17.283-0.567    c-5.383,3.117-8.783,8.783-8.783,15.017v363.233c0,6.517,3.683,12.183,9.35,15.3c5.667,2.833,12.75,2.267,17.85-1.7l90.1-67.433    l82.45,129.2c3.117,5.1,8.783,7.933,14.45,7.933c2.833,0,5.95-0.85,8.5-2.267l84.15-48.733c3.967-2.267,6.8-6.233,7.933-10.767    c1.133-4.533,0.283-9.35-2.267-13.033l-76.783-120.983l103.7-29.183C401.786,236.771,406.603,231.387,407.453,224.871z     M260.403,241.304c-5.1,1.417-9.35,5.383-11.333,10.2c-1.983,5.1-1.417,10.767,1.417,15.3l79.333,125.233l-54.683,31.733    l-83.017-130.9c-2.55-3.967-6.517-6.8-11.333-7.65c-1.133-0.283-1.983-0.283-3.117-0.283c-3.683,0-7.083,1.133-10.2,3.4    l-77.633,58.083V48.354l260.1,168.017L260.403,241.304z" fill="#D80027"/>
	</svg>`)
    
    
    function scriptCompleted() {
        chrome.runtime.sendMessage({type:'script_completed'})
        return true
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

        return mouseToElementPosition(input).then(function() {
                return new Promise((resolve, reject) => {

                if (!input) {
                    insertMessage('test failed for '+ text, false )
                    resolve(text)
                }
                removeInput(resolve)

            })
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
    
    
    function triggerElementEvent(elem, evt) {
        
        let ev = new Event(evt, {"bubbles": true, "cancelable": false})
        
        
        return mouseToElementPosition(elem).then(function() {
                return new Promise((resolve, reject) => {

                
                elem.dispatchEvent(ev)
                resolve()

            })
        })
        
        
    }
    
    
    function mouseToElementPosition(elem) {
        let pos = elem.getBoundingClientRect()
        let mouse = window.document.querySelector('#mouseCursor')
        let mpos = mouse.getBoundingClientRect()
        
        
        let info = {
            'mouse' : mouse,
            'from' : {
                'x' : parseInt(mpos.left, 10),
                'y' : parseInt(mpos.top, 10),
            },
            'to' : {
                'x' : parseInt(pos.left+(pos.width/2), 10),
                'y' : parseInt(pos.top+(pos.height/2), 10),
            },            
            'tweenX': [],
            'tweenY': [],
        }
        
        let frameCount = 20;
        let tweenAmountX = (info.to.x - info.from.x)/frameCount;
        let tweenAmountY = (info.to.y - info.from.y)/frameCount;
               
        for (let i=0; i<frameCount; i++) {
            // calculate the points to animate
            info.tweenX.push(parseInt(info.from.x+(tweenAmountX*i),10))
            info.tweenY.push(parseInt(info.from.y+(tweenAmountY*i),10))
        }
             
      
        return new Promise((resolve, reject) => {
                        
            move(info, resolve)
            
        })
        
        
        function move(info, resolve) {
           
            info.mouse.style.top = info.tweenY.shift() + 'px'            
            info.mouse.style.left = info.tweenX.shift() + 'px'
                   
            if ( info.tweenY.length ) {            
                window.requestAnimationFrame(move.bind(this, info, resolve))
            } else {
                resolve()
            }
                        
            
        }
                
    }
    
    
    
    
    
})()

