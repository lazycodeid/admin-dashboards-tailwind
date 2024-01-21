document.querySelectorAll("[lazy-icon]").forEach((element)=>{
    const i = document.createElement("i")
    i.className = element.getAttribute("lazy-icon")
    element.insertAdjacentElement("beforeend",i)
})

window.lazyDisableScrollbar = (status = true) => {
    if(status){
        if(document.body.scrollHeight > window.innerHeight){
            document.body.classList.add("_lazy-disable-scroll", "with-pr");
        } else {
            document.body.classList.remove("_lazy-disable-scroll");
        }
    }else{
        document.body.classList.remove("_lazy-disable-scroll", "with-pr");
    }
}
 

// for demo auto active sidebar
document.querySelectorAll("[lazy-simplebar-init] nav ._lazy-nav-item").forEach((element)=>{
    let href = location.href
    href = href.replace("#", "")
    
    if(element.nodeName == "A"){
        if (element.href != href) return
        element.classList.add("is-active")
    } else {
        const subitem = element.closest("[lazy-collapse-init]")
        if(!subitem?.querySelector("._lazy-navcollapse-content")) return
        subitem.querySelectorAll("._lazy-navcollapse-content ._lazy-nav-subitem").forEach(element => {
            if(element.href != href) return
            element.classList.add("is-active")
        })
    }
})

// console.log(`
//   く__,.ヘヽ.        /  ,ー､ 〉
//            ＼ ', !-─‐-i  /  /´
//            ／｀ｰ'       L/／｀ヽ､
//          /   ／,   /|   ,   ,       ',
//        ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
//         ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
//           !,/7 '0'     ´0iソ|    |
//           |.从"    _     ,,,, / |./    |
//           ﾚ'| i＞.､,,__  _,.イ /   .i   |
//             ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
//               | |/i 〈|/   i  ,.ﾍ |  i  |
//              .|/ /  ｉ：    ﾍ!    ＼  |
//               kヽ>､ﾊ    _,.ﾍ､    /､!
//               !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
//               ﾚ'ヽL__|___i,___,ンﾚ|ノ
//                   ﾄ-,/  |___./
//                   'ｰ'    !_,.:
// `);