$.confirm = function(option){
    return new Promise ((resolve, reject) => {
       const timeout = 100
       const modal = $.modal({
        title: option.title,
        width: "400px",
        closable: true,
        content: option.content,
        onClose() {
            modal.destroy()
        },
        footerBtn: [
            {text: option.footerBtn[0].text, type: option.footerBtn[0].type, handler(){               
                modal.close()
                resolve()
            }},
            {text: option.footerBtn[1].text, type: option.footerBtn[1].type, handler(){                
                modal.close()
                reject()
            }}
        ]
    }) 
       setTimeout(() => modal.open(), timeout)
    })
}
