
let baseStyle = document.createElement('link')
baseStyle.setAttribute("rel", "stylesheet")
baseStyle.setAttribute("href", "https://cdn.bootcdn.net/ajax/libs/font-awesome/6.2.1/css/all.min.css")
document.head.appendChild(baseStyle)



let fontStyle = document.createElement('link')
fontStyle.setAttribute("rel", "stylesheet")
fontStyle.setAttribute("href", "messageDark.css")
document.head.appendChild(fontStyle)

let notifications = document.createElement('ul')
notifications.setAttribute("class", "notifications")
document.body.appendChild(notifications)


let toastDetails = {
    timer: 2000,
    success: {
        icon: 'fa-circle-check',
    },
    error: {
        icon: 'fa-circle-xmark',

    },
    warning: {
        icon: 'fa-circle-exclamation',

    },
    info: {
        icon: 'fa-circle-info',

    }
}
const  removeToast = (toast) => {
    toast.classList.add('hide')
    if (toast.timeoutId) clearTimeout(toast.timeoutId) // 清楚setTimeout
    // 移除li元素
    // setTimeout(() => {
    //     toast.remove()
    // }, 500)
}

/**
 * 
 * @param {*} id  success error info warning 类型
 * @param {*} text  文字
 * @param {*} timer  什么时候消失
 */
const createToast = (id, text, timer) => {
    // console.log(id)
    const { icon } = toastDetails[id]
    const toast = document.createElement('li') // 创建li元素

    toast.className = `toast ${id}` // 为li元素新增样式
    toast.innerHTML = `<div class="column">
                <i class="fa-solid ${icon}"></i>
                <span>${text}</span>
                </div>
            `
    notifications.appendChild(toast) // 添加元素到 notifications ul
    // 2秒后 隐藏toast
    toast.timeoutId = setTimeout(() => removeToast(toast), timer)
}




export { createToast}