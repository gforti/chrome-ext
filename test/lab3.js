(() => {
    
     let month = window.document.querySelector('#month')
    
        window.labApi.selectValue('9', month).then(()=>{
                    return window.labApi.scriptCompleted()
                })
    
})()

