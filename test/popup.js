window.document.addEventListener('DOMContentLoaded', ()=> {
  let checkPageButton = window.document.querySelector('#checkPage')
  let labSel = window.document.querySelector('select[name="lab"]')
  checkPageButton.addEventListener('click', function() {
    let file = labSel.options[ labSel.selectedIndex ].value + '.js'
    
    chrome.tabs.query({'active': true, 'currentWindow': true}, (tabs)=> {
        window.document.body.insertAdjacentHTML('beforeend', '<p>Reviewing '+tabs[0].url+'</p>')     
    })     
    
    chrome.tabs.insertCSS({'file': 'labs.css'}, ()=>{
        chrome.tabs.executeScript({'file': 'lab-api.js'}, ()=>{
            chrome.tabs.executeScript({'file': file})
        })
    })
    
    
    
    
    
  })
})