
(()=>{
  let input = window.document.querySelector('input[name="phone"');
let ev = new Event("blur", {"bubbles":true, "cancelable":false})
    setTimeout(()=>{
        if ( input ) {
            window.document.body.insertAdjacentHTML('beforeend', '<p>input Phone found</p>');
        } else {
            window.document.body.insertAdjacentHTML('beforeend', '<p>input Phone NOT found</p>');
        }
    }, 100)


 setTimeout(()=>{
     input.value = 'abc'
    
    input.dispatchEvent(ev)

    
    if ( input.classList.contains('invalid') ) {
        window.document.body.insertAdjacentHTML('beforeend', '<p>input Phone does contain invalid class</p>');
    } else {
        window.document.body.insertAdjacentHTML('beforeend', '<p>input Phone does not contain invalid class</p>');
    }
     
  }, 2000)


setTimeout(()=>{
  input.value = '123'
    input.dispatchEvent(ev)

    if ( !input.classList.contains('invalid') ) {
        window.document.body.insertAdjacentHTML('beforeend', '<p>input Phone does contain invalid class with correct value</p>');
    } else {
        window.document.body.insertAdjacentHTML('beforeend', '<p>input Phone does not contain invalid class</p>');
    }  
}, 3000)


setTimeout(()=>{
    input.value = ''
    typeInValue('12345', input).then((r)=>{
        console.log('complete')
        console.log(r)
    })
}, 3500)






function typeInValue(text, input) {
    
    let total = text.length;
    let counter = 0;
    
    return new Promise((resolve, reject) => {
        
        setInput(resolve)
        
    })
    
    function setInput(resolve){
       if ( counter <= total ) {
          input.value += text.charAt(counter)
          counter++
          window.setTimeout(setInput.bind(this, resolve),600)
        } else {
           resolve(counter)
        } 
    }
    
}



})()