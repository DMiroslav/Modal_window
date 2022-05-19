Element.prototype.appendAfter = function (element){    
 element.parentNode.insertBefore(this, element.nextSibling)
}

function _createModalFooter(buttons=[]){
if (buttons.length === 0) {
     return document.createElement("div")
} 
     const wrap = document.createElement("div")
     wrap.classList.add("modalfooter")
    
     buttons.forEach(btn =>{
      const $btn = document.createElement("button")
      $btn.textContent = btn.text
      $btn.classList.add("btn")
      $btn.classList.add(`btn-${btn.type}`)
      $btn.onclick = btn.handler
      wrap.appendChild($btn)
     })
     return wrap
}

function _createModalWindow (option) {
     const defoltwidth = "450px"
     const modal = document.createElement("div")
     modal.classList.add("mmodal")
     modal.insertAdjacentHTML("afterbegin", `
  <div class="modaloverlay" data-close="true">
    <div class="modalwindow" style="width: ${option.width || defoltwidth}">
      <div class="modalheader">
         <span class="title"> ${option.title || "MY TITLE"}</span>
         <div class="position">
          ${option.closable ? `<span class="modalclose" data-close="true">&times;</span>` : ""} 
          </div>
       </div>
      <div class="modalbody" data-content>
          ${option.content}
      </div>         
   </div>
 </div>
     `)
 const footer = _createModalFooter(option.footerBtn)
 footer.appendAfter(modal.querySelector("[data-content]"))
 document.body.appendChild(modal)
 return modal
}

$.modal = function(option) {
     const animation = 300
     let closing = false
     let destroy = false
     const $modal = _createModalWindow(option)
     const modal = {
          open() {
               if (!destroy)
               !closing && $modal.classList.add("open")
          },
          close() {
               closing = true
               $modal.classList.remove("open")
               $modal.classList.add("hide")
               setTimeout( () => {
                    $modal.classList.remove("hide")
                    closing = false
                    if (typeof option.onClose === "function"){
                         option.onClose()
                    }
               } , animation)
          }          
     }

     const lisener = event => {
          event.target.dataset.close ? modal.close() : ""
     }
     $modal.addEventListener("click", lisener)

     return Object.assign(modal, {
           destroy() {
           $modal.parentNode.removeChild($modal)
           destroy = true
           $modal.removeEventListener("click", lisener)
          },
           setContent(html) {
           $modal.querySelector("[data-content]").innerHTML = html
          }
     })     
}

