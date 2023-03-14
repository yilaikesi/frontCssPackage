

// toast("dsad")

var 分辨率宽 = 1080
var 分辨率高 = 2340

// console.log(JSON.stringify(shell))
// toast("dssad")

var js = {
    click: function (x, y) {
        var x1 = device.width / 分辨率宽
        var y1 = device.height / 分辨率高
        var a = x * x1
        var b = y * y1
        var c = random(a - 20, a + 20)
        var d = random(b - 20, b + 20)
        var sjsj = random(80, 120)
        if (shell('input swipe ' + c + " " + d + " " + c + " " + d + " " + sjsj)) {
            return true
        } else {
            return false
        }
    },
    find: function (参数1, 参数2) {
        shell('uiautomator dump', { adb: true })
        var wjkll = files.read('/sdcard/window_dump.xml')
        var bgh = storages.create("bghka:AB111");
        bgh.put("bghka", String(wjkll))
        var cg = bgh.get("bghka")
        if (cg.indexOf(参数1) != -1 && cg.indexOf(参数2) != -1) {
            storages.remove("bghka:AB111")
            return true
        } else {
            storages.remove("bghka:AB111")
            return false
        }

    },


    longClick: function (x, y, sjsj) {
        var x1 = device.width / 分辨率宽
        var y1 = device.height / 分辨率高
        var a = x * x1
        var b = y * y1
        var c = random(a - 10, a + 20)
        var d = random(b - 10, b + 20)

        shell('input swipe ' + c + " " + d + " " + c + " " + d + " " + sjsj, { adb: true })
    },
    swipe: function (x, y, o, p, sjsj) {
        var x1 = device.width / 分辨率宽
        var y1 = device.height / 分辨率高
        var a = x * x1
        var b = y * y1
        var c = o * x1
        var d = p * y1

        shell('input swipe ' + a + " " + b + " " + c + " " + d + " " + sjsj, { adb: true })
    },
    按键: function 按键(params) {
        shell.exec('input ' + params, { adb: true })

    },
    输入文字: function (ghfy) {
        var ko = shell('settings get secure default_input_method ', { adb: true })
        var str = JSON.stringify(ko)
        var kio = str.indexOf("com.")
        var kigy = str.indexOf('IME')
        var dg = str.substring(kio, kigy + 3)
        shell('settings put secure default_input_method  com.android.adbkeyboard/.AdbIME', { adb: true })
        sleep(500)
        if (shell('am broadcast -a ADB_INPUT_TEXT --es msg ' + ghfy, { adb: true }) != -1) {
            shell('settings put secure default_input_method ' + dg, { adb: true })
            log("输入成功")
            return true
        } else {
            log("输入失败")
            shell('settings put secure default_input_method ' + dg, { adb: true })
            return false
        }
    },
    检测: function () {
        
        if (shell.checkAccess('adb')) {
            return true
        } else {
            return false
        }
    },

    截图: function (path) {
        shell('screencap ' + " " + path, { adb: true })
    },
    查看控件: function () {
        shell('uiautomator dump', { adb: true })
        let a = files.read('/sdcard/window_dump.xml')
        var o = a.split('<node').filter(arr => arr.includes(arguments[0]))
        for (let i = 0; i < o.length; i++) {
            var 程 = a.split('<node').filter(arr => arr.includes(arguments[0]))[i]
            return 程 + "\n"
        }
        files.remove('/sdcard/window_dump.xml')
    },
    查找控件: function () {
        shell('uiautomator dump', { adb: true })
        let a = files.read('/sdcard/window_dump.xml')
        if (程 = a.split('<node').filter(arr => arr.includes(arguments[0]))[0]) {
            let a_bounds = (程.split('bounds')[1].match(/\d+/g)).map(arr => Number(arr))
            files.remove('/sdcard/window_dump.xml')
            return a_bounds
        } else {
            return false
        }
    },

    随机点击: function (a_bounds) {

        var c = random(a_bounds[0] + 10, a_bounds[2] - 10)
        var d = random(a_bounds[1] + 10, a_bounds[3] - 10)
        var sjsj = random(80, 120)
        if (shell('input swipe ' + c + " " + d + " " + c + " " + d + " " + sjsj, { adb: true })) {
            return true
        } else {
            return false
        }
    }

}



let count =1
let allCount =1
console.show()
console.setPosition(178,1074 )

// var list = id("cl_position").findOne().bounds()
console.info("开始")

// 点击列表的一项
js.click(460, 450)
sleep(1500)
// 点击立即沟通
js.click(530.,2200)
sleep(1500)
// back()
sleep(1500)
// back()
sleep(1500)
js.swipe(960,950,960,100,320)


/**
 * QQ群号:196636757
 *完成时间: 2022年2月3日 W
 *备注:  复制粘贴即可使用 更多函数正在更新中。。。   
 *用法例子；  js.点击(454,325)
 * 
**/


// js.检测()
// js.查找("无障碍服务","服务器模式")
// js.click(542,658)
// js.划动(525,456,523,658,1000)
// js.长按(542,658,1000)
// js.随机点击(js.查找控件("com.miui.home:id/icon_icon"))
// js.查看控件("无障碍服务")
// js.查找控件("无障碍服务")
// js.输入文字("你好")
// 
// js.截图()
// js.按键("keyevent 3")





// 小图(606, 1006, 720, 1107, '/sdcard/小图.png')



// function 小图(x1, y1, x2, y2, path) {

//     js.截图(path)
//     var src = images.read(path);
//     var imgs = images.clip(src, x1, y1, x2 - x1, y2 - y1)
//     imgs.saveTo(path)
//     src.recycle();

// }





// requestScreenCapture();
// sleep(random(5000, 6500))



// js.截图("/sdcard/大图.png")
// var path = "/sdcard/大图.png"
// var src = images.read(path);
// var templ = images.read("/sdcard/小图.png");
// var p = findImage(src, templ);
// files.remove(path)
// if (p) {
//     log(p.x, p.y); //p.x,p.y = 小图片的左上角的 x,y 坐标
// } else {
//     log("没找到");
// }





















