/*
    !! just for demo
    
    ID : Script ini hanya untuk tampilan demo saja, jadi tidak perlu di pake di product
    EN : This script only for demo, so you don't need to use it in product

    N : VELIXS ft. Lazy Code
    Author : Ilsya
*/




/*
    ID : Script ini menghandler button copy dan view code di components / ui
    EN : This script handles button copy and view code in components / ui

    Required : 
    - <script src="assets/vendor/clipboard/clipboard.min.js"></script>
    - <script src="assets/vendor/highlight/highlight.min.js"></script>
*/
(function(){
    "use strict"

    new ClipboardJS('[lazy-ui-copy]');
    hljs.highlightAll()

    document.querySelectorAll("[lazy-ui-copy]").forEach((element)=>{
        element.addEventListener("click", ()=>{
            let text = element.setAttribute("data-clipboard-text", element.closest("[lazy-ui]").querySelector("[lazy-ui-code]").innerText)
            element.disabled = true
            element.innerHTML = `<i class="fa-duotone fa-party-horn mr-2"></i> Copied`
            setTimeout(()=>{
                element.innerHTML = `<i class="fa-duotone fa-copy mr-2"></i> Copy`
                element.disabled = false
            }, 1500)
        })
    })

    document.querySelectorAll("[lazy-ui]").forEach((element)=>{
        const preview = element.querySelector("[lazy-ui-preview]")
        const code = element.querySelector("[lazy-ui-code]")
        const button = element.querySelector("[lazy-ui-button]")
        let iscode = false
        if(button) button.addEventListener("click", toggle)

        function toggle(){
            if(iscode){
                preview.style.display = "block"
                code.style.display = "none"
            } else {
                preview.style.display = "none"
                code.style.display = "block"
            }
            iscode = !iscode
        }
    })
})()
