class speechBot {

  constructor(param) {
      this.speechProgress = window.speechSynthesis
      this.speechApi = new SpeechSynthesisUtterance()
      this.speechApi.text = param.text ?? "没传入文本"
      this.speechApi.rate = param.rate ?? 1
      this.speechApi.volume = param.volume ?? 1
      this.speechApi.lang = param.lang ?? "zh-CN"
      this.speechApi.pitch = param.pitch ?? 1.5

  }
  speak = function (text) {
      // console.log(text,this.speechProgress)
      this.speechApi.text = text
      this.speechProgress.speak(this.speechApi)
  }
  pause = function () {
      this.speechProgress.pause()
  }
  resume = function () {
      // 暂停和非暂停切换
      this.speechProgress.resume()
  }
  cancel = function () {
      // 删除所有话语
      this.speechProgress.cancel()
  }
  configGet = function () {
      // console.log(this.speechProgress.getVoices())
  }
}
let speakbot = new speechBot({
  text: "你在挥手",
  pitch: 1,
  rate: 1,
  volume: 20,
  lang: 'zh-CN'
})

let poseNet;
let hands = [];

let video;
let canvas;
let ctx;

let loganHandle ={
  prev : {
    x:null,
    y:null
  },
  next:{
    x:null,
    y:null
  }
}
let distance ={
  x_distance:null,
  y_distance:null,
  allDistance:null
}



let loganHandleFn = (val) =>{
  // 一开始的数据
  if(!loganHandle.prev.x && !loganHandle.next.x){
    loganHandle.prev = JSON.parse(JSON.stringify(val))
    return
  }
  // 之后的数据
  if(loganHandle.prev.x && !loganHandle.next.x){
    loganHandle.next = JSON.parse(JSON.stringify(loganHandle.prev))
    loganHandle.prev = JSON.parse(JSON.stringify(val))
  }
  // 更新数据
  if(loganHandle.prev.x && loganHandle.next.x){
    loganHandle.prev = JSON.parse(JSON.stringify(loganHandle.next))
    loganHandle.next = JSON.parse(JSON.stringify(val))
  }
  if(loganHandle.prev.x && loganHandle.next.x){
    let x_distance = Math.pow((loganHandle.prev.x - loganHandle.next.x),2)
    let y_distance = Math.pow((loganHandle.prev.y - loganHandle.next.y),2)
    // console.log("笛卡尔距离：",x_distance,y_distance,Math.log2(x_distance+y_distance))
    if(Math.log2(x_distance+y_distance)){
      // console.log("笛卡尔距离：",x_distance,y_distance,Math.log2(x_distance+y_distance))
      distance.allDistance = Math.log2(x_distance+y_distance)
      
    }
    distance.x_distance =Math.log2(x_distance)
    distance.y_distance =Math.log2(y_distance)
   
  }
}
// loganHandleFn({
//   x:1,
//   y:111
// })
// console.log(JSON.parse(JSON.stringify(loganHandle)))
// loganHandleFn({
//   x:2,
//   y:2222
// })

// console.log(JSON.parse(JSON.stringify(loganHandle)))
// loganHandleFn({
//   x:3,
//   y:3333
// })
// console.log(JSON.parse(JSON.stringify(loganHandle)))
// loganHandleFn({
//   x:4,
//   y:4444
// })
// console.log(JSON.parse(JSON.stringify(loganHandle)))

async function setup() {
  // Grab elements, create settings, etc.
  video = document.getElementById('video');
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });

  video.srcObject = stream;
  video.play();


  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("hand", results => {
    hands = results;
  });

  // Hide the video element, and just show the canvas
  // video.hide();


  function modelReady() {
    console.log("Model ready!");
  }

  requestAnimationFrame(draw);
}

setup();

function modelReady() {
  console.log('model loaded!')
}
function drawKeypoints() {
  for (let i = 0; i < hands.length; i += 1) {
    // hands一般来说都是单手的
    const hand = hands[i];
    /**
     * @des 注册 
      thumb: [1, 2, 3, 4],
      indexFinger: [5, 6, 7, 8],
      middleFinger: [9, 10, 11, 12],
      ringFinger: [13, 14, 15, 16],
      pinky: [17, 18, 19, 20],
      palmBase: [0]
     */
    // for (let j = 1; j < hand.landmarks.length; j += 1)

    // 食指
    for (let j = 8; j < 9; j += 1) {
      const keypoint = hand.landmarks[j];
      ctx.fillStyle = 'rgb(255, 215, 0)'
      ctx.beginPath();
      ctx.arc(keypoint[0], keypoint[1], 10, 0, 2 * Math.PI);
      loganHandleFn({x:keypoint[0], y:keypoint[1]})
      ctx.fill()
      // if(distance>15){
      //   console.log(distance)
      //   console.log("你在挥手")
      //   speakbot.speak("你在挥手")
      // }
      // console.log(distance.x_distance,distance.y_distance)
      if(distance.x_distance>14){
        console.log("横着走")
        speakbot.speak("横着走")
        window.scrollBy(document.body.clientWidth*(loganHandle.prev.x - loganHandle.next.x)/1000,0)
       
      }
      if(distance.y_distance>14){
        console.log("竖着走")
        speakbot.speak("竖着走")
        window.scrollBy(0,document.body.clientHeight*(loganHandle.prev.y - loganHandle.next.y)/1000)
      }
      ctx.stroke();

      // fill(0, 255, 0);
      // noStroke();
      // ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}

function draw() {
  requestAnimationFrame(draw);
  // console.log(poses)
  ctx.drawImage(video, 0, 0, 640, 480);
  // We can call both functions to draw all keypoints and the skeletons
  if (hands.length != 0) {
    // console.log(hands)
    drawKeypoints()
  }




  // For one pose only (use a for loop for multiple poses!)
  // if (poses.length > 0) {
  //   const pose = poses[0].pose;

  //   // Create a pink ellipse for the nose
  //   const nose = pose.nose;

  //   ctx.fillStyle = 'rgb(213, 0, 143)';
  //   ctx.beginPath();
  //   ctx.arc(nose.x, nose.y, 10, 0, 2 * Math.PI);
  //   ctx.fill();
  //   ctx.stroke();
  // }
}
