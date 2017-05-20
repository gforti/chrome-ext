(() => {
    
     let month = window.document.querySelector('#month')     
     let monthVal = window.labApi.getRandomSelectValue(month)
     let year = window.document.querySelector('#year') 
     let yearVal = window.labApi.getRandomSelectValue(year)
     
        window.labApi.selectValue(monthVal, month).then(()=>{
                    
            return window.labApi.selectValue(yearVal, year)
                    
        }).then(()=>{
            
            let days = window.document.querySelectorAll('.day')
            let day = window.labApi.randNode(days)
            
            
            return window.labApi.triggerElementEvent(day, 'click').then(()=>{
                let bgcolor = window.getComputedStyle(day, null).getPropertyValue('background-color')
                console.log(bgcolor)
                
                if ( bgcolor !== 'rgb(0, 128, 0)') {
                    window.labApi.insertMessage('Day should be green', false)
                } else {
                    window.labApi.insertMessage('correct Color green');
                }
                return window.labApi.triggerElementEvent(day, 'blur')
            }).then(()=>{
                
                return window.labApi.triggerElementEvent(day, 'click').then(()=>{
                    let bgcolor = window.getComputedStyle(day, null).getPropertyValue('background-color')
                    console.log(bgcolor)

                    if ( bgcolor !== 'rgb(255, 0, 0)') {
                        window.labApi.insertMessage('Day should be red', false)
                    } else {
                        window.labApi.insertMessage('correct Color red');
                    }
                    return window.labApi.triggerElementEvent(day, 'blur')
                })
            
            }).then(()=>{
                
                return window.labApi.triggerElementEvent(day, 'click').then(()=>{
                    let bgcolor = window.getComputedStyle(day, null).getPropertyValue('background-color')
                    console.log(bgcolor)

                    if ( bgcolor !== 'rgba(0, 0, 0, 0)') {
                        window.labApi.insertMessage('Day should be cleared', false)
                    } else {
                        window.labApi.insertMessage('correct Color cleared');
                    }
                    return window.labApi.triggerElementEvent(day, 'blur')
                })
            
            })
            
            
        })
        
        .then(()=>{
            return window.labApi.scriptCompleted()
        })
    
})()

