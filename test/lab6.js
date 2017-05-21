(() => {
    
    let addBox = window.document.querySelector('#addBox')
    
    test()
    
    let observer = new MutationObserver(function(mutations) {      
        
         var oldStyle = mutations[0].oldValue.split(';').reduce((ruleMap, ruleString) => {
            let rulePair = ruleString.split(':')
            if (rulePair[1])
            ruleMap[rulePair[0].toString().trim()] = rulePair[1].toString().trim()
            return ruleMap;
        }, {})
        
        handleChange(mutations[0].target, oldStyle)       
        observer.disconnect()
    });


    async function test() {
        
        let divs = window.document.querySelectorAll('div[style*="position:"]')
        
        if ( divs.length ) {
            for (const item of divs) 
                await window.labApi.triggerElementEvent(item, 'click')
        }
        
        await window.labApi.triggerElementEvent(addBox, 'click')
        await window.labApi.triggerElementEvent(addBox, 'blur')
        await window.labApi.triggerElementEvent(addBox, 'click')
        await window.labApi.triggerElementEvent(addBox, 'blur')
        await window.labApi.triggerElementEvent(addBox, 'click')
        await window.labApi.triggerElementEvent(addBox, 'blur')
        
        divs = window.document.querySelectorAll('div[style*="position:"]')
        
       
        if ( divs.length === 3 ) {
            window.labApi.insertMessage('Three div objects added to the page')
        } else {
            window.labApi.insertMessage('Three div objects should have been added to the page', false)
        }
         
        await window.labApi.triggerElementEvent(divs[1], 'click')
        await window.labApi.triggerElementEvent(divs[2], 'click')
        
        divs = window.document.querySelectorAll('div[style*="position:"]')
        
         if ( divs.length === 1 ) {
            window.labApi.insertMessage('Two div objects were removed on click')
        } else {
            window.labApi.insertMessage('Div objects were not removed in click', false)
        }
        
        
        observer.observe(divs[0], { attributes: true, attributeOldValue: true });
                
    }
    
    async function handleChange(target, oldStyle) {
        
        const opacity = window.getComputedStyle(target, null).getPropertyValue('opacity')
        const top = window.getComputedStyle(target, null).getPropertyValue('top')
        const left = window.getComputedStyle(target, null).getPropertyValue('left')
        const transform = window.getComputedStyle(target, null).getPropertyValue('transform')
        
        
        if( oldStyle.opacity !== opacity ) {
            window.labApi.insertMessage('opacity style changed!')
        } else {
           window.labApi.insertMessage('opacity has not been updated!', false) 
        }
        
        if( oldStyle.top !== top ) {
            window.labApi.insertMessage('top style changed!')
        } else {
           window.labApi.insertMessage('top has not been updated!', false) 
        }
        
        if( oldStyle.left !== left ) {
            window.labApi.insertMessage('left style changed!')
        } else {
           window.labApi.insertMessage('left has not been updated!', false) 
        }
        
         if( oldStyle.transform !== transform ) {
            window.labApi.insertMessage('transform style changed!')
        } else {
           window.labApi.insertMessage('transform has not been updated!', false) 
        }
        
        await window.labApi.triggerElementEvent(target, 'click')
        
        
        return window.labApi.scriptCompleted()
    }
    
})()