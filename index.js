const toHtml = fruit => `
<div class="col">
     <div class="card">
         <img style="height: 250px; width: 350px;" class="card-img-top" alt="${fruit.title}" src="${fruit.img}" >
         <div class="card-body">
             <h5 class="card-title">${fruit.title}</h5>
             <p class="card-text"></p>
             <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Ціна</a>
             <a href="#" class="btn btn-primary" data-btn="buy" data-id="${fruit.id}">Купити</a>
             <a href="#" class="btn btn-danger" data-btn="delete" data-id="${fruit.id}">Видалити</a>
         </div>
     </div>
</div>
`
function cardList() {
    const html = fruits.map(toHtml).join("")
    document.querySelector("#cards").innerHTML = html
}
cardList()

const modalprice = $.modal({
    title: `<h5> Ціна на товар </h5> `,
    closable: true,
    width: "400px",
    footerBtn: [
        {text: "Ok", type: "primary", handler(){
            modalprice.close()
        }}
    ]
})

const buttonclick = event => {
   event.preventDefault()
   const btncheck = event.target.dataset.btn
   const id = +event.target.dataset.id
   const fruit = fruits.find(f => f.id===id)
     if (btncheck === "price"){       
       modalprice.setContent(`<p style="font-weight: bold; font-size: 21px">${fruit.title} вартість ${fruit.price} $</p>`)  
       modalprice.open()
     }   
      else if (btncheck === "buy"){
       $.confirm ({
       title: `<h5>Bи збираєтесь купити ${fruit.title}</h5>`,
       content: `<p style="font-weight: bold; font-size: 21px">справді купити ?</p>`,
       footerBtn: [
          {text: "Так купити", type: "primary", handler(){
              modalprice.close()
          }},
          {text: "Відміна", type: "secondary", handler(){
              modalprice.close()
          }}
    ]})
    .then(()=>{alert("привіт, ви натиснули : так купити (може бути будь який необхідний функціонал)")})
    .catch(()=>{alert("привіт, ви натиснули : відміна (може бути будь який необхідний функціонал)")})}
       else if (btncheck === "delete"){
        $.confirm ({
        title: `<h5>Bи збираєтесь видалити ${fruit.title}</h5>`,
        content: `<p style="font-weight: bold; font-size: 21px">справді видалити ?</p>`,
        footerBtn: [
            {text: "Так видалити", type: "danger", handler(){
                modalprice.close()
            }},
            {text: "Ні відмінити", type: "primary", handler(){
                modalprice.close()
            }}
        ]})
    .then(()=>{fruits = fruits.filter(f => f.id !== id)
            cardList()
        })
    .catch(()=>{console.log("ні відмінити")})}
}
document.addEventListener("click", buttonclick)

