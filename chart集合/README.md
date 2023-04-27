# charts
各种cavas图表的绘制（原生）

这段交互贼有意思

```

canvas.onmousedown = function (e) {

                if (canvas.style.cursor != "all-scroll") {
                    return false;
                }

                document.onmousemove = function (e) {
                    e = e || window.event;
                    if (e.offsetX || e.offsetX == 0) {
                        dragBarX = e.offsetX * 2 - dragBarWidth / 2;
                    } else if (e.layerX || e.layerX == 0) {
                        dragBarX = e.layerX * 2 - dragBarWidth / 2;
                    }

                    if (dragBarX <= originX) {
                        dragBarX = originX
                    }
                    if (dragBarX > originX + cWidth - dragBarWidth) {
                        dragBarX = originX + cWidth - dragBarWidth
                    }

                    var nb = Math.ceil(dataArr.length * ((dragBarX - cMargin - cSpace) / cWidth));
                    showArr = dataArr.slice(0, nb || 1);

                    // 柱状图信息
                    tobalBars = showArr.length;
                    bWidth = parseInt(cWidth / tobalBars / 3);
                    bMargin = parseInt((cWidth - bWidth * tobalBars) / (tobalBars + 1));


                }

                document.onmouseup = function () {
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }


```