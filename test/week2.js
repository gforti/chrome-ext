(()=>{
    
    let input = window.document.querySelector('#num')
    let button = window.document.querySelector('#btnGenerate')
    let div = window.document.querySelector('#wrapper')
    let ev = new Event("click", {"bubbles":true, "cancelable":false})
    
    
     typeInValue('3', input).then((text)=>{
         button.dispatchEvent(ev)

         let tableDom = div.querySelector('table')
         let rows = tableDom.querySelectorAll('tr')
         let td = tableDom.querySelectorAll('td')
         text = window.parseInt(text);
         
         console.log(rows)
         console.log(td)
    
        if ( rows.length === text ) {
            window.document.body.insertAdjacentHTML('beforeend', '<p>correct rows</p>');
        } else {
            window.document.body.insertAdjacentHTML('beforeend', '<p>bad rows</p>');
        }
        
        if ( td.length === (rows.length * text) ) {
            window.document.body.insertAdjacentHTML('beforeend', '<p>correct data</p>');
        } else {
            window.document.body.insertAdjacentHTML('beforeend', '<p>bad data length</p>');
        }
        
        
        td.forEach((item)=>{
           let num = window.parseInt(item.innerText) 
           let bgcolor = window.getComputedStyle(item, null).getPropertyValue('background-color');
           
           let error = false
           if(num % 2 === 0){ // red
                if ( bgcolor !== 'rgb(255, 0, 0)' )
                error = true
           }  else if ( num % 3 === 0 ) { //blue
               if ( bgcolor !== 'rgb(0, 0, 255)' )
               error = true
           } else if ( bgcolor !== 'rgba(0, 0, 0, 0)'){
               error = true
           }
           
           if ( error ) {
               window.document.body.insertAdjacentHTML('beforeend', '<p>bad data color in table '+bgcolor+'</p>');
           } 
           
        })
        
        
     })
     
     
     
     
     
     function typeInValue(text, input) {
    
    
    let total = text.length;
    let counter = 0;
    let speed = 100;
    
    return new Promise((resolve, reject) => {
        
        removeInput(resolve)
        
    })
    
    function removeInput(resolve) {
        
        if ( input.value.length ) {
          input.value = input.value.substring(0,input.value.length-1)
          window.setTimeout(removeInput.bind(this, resolve),speed)
        } else {
          setInput(resolve)
        } 
        
    }
    
    function setInput(resolve){
       if ( counter <= total ) {
          input.value += text.charAt(counter)
          counter++
          window.setTimeout(setInput.bind(this, resolve),speed)
        } else {
           resolve(text)
        } 
    }
    
}
    
    
})()
