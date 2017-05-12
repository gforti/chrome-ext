document.addEventListener('DOMContentLoaded', ()=> {
  let checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', ()=> {
      
    chrome.tabs.getSelected(null, (tab)=> {
      let d = document;

      let f = d.createElement('p');
      f.innerHTML = tab.url;
      d.body.appendChild(f);
    });
    
    chrome.tabs.executeScript({file: "content.js"}, (results) => {});
    
    
    
  }, false);
}, false);