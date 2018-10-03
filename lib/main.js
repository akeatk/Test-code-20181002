const canvas = document.getElementsByTagName("canvas")[0];
canvas.height = 500;
canvas.width = 500;

// function clickCanvas(e) {
//     const x = e.clientX - canvas.offsetLeft;
//     const y = e.clientY - canvas.offsetTop;
//     pond.click(x,y);
// }


const ctx = canvas.getContext("2d");
// const player = document.getElementById('player');

let handleSuccess = function(stream) {

  // //this works. However, I don't understand the set interval part
  // //am I missing info or getting duplicates of I don't time it right?
  // const context = new AudioContext();
  // const analyser = context.createAnalyser();
  // const source = context.createMediaStreamSource(stream);
  //
  // source.connect(analyser);
  // analyser.connect(context.destination);


  // setInterval(function () {
  //     var array = new Uint8Array(analyser.frequencyBinCount);
  //     analyser.getByteFrequencyData(array);
  //     console.log(array);
  // }, 1000);


  var context = new AudioContext();
  var source = context.createMediaStreamSource(stream);
  var processor = context.createScriptProcessor(1024, 1, 1);

  source.connect(processor);
  processor.connect(context.destination);
  let a = true;
  processor.onaudioprocess = function(e) {
    if(a)
    // Do something with the data, i.e Convert this to WAV
    console.log(e.inputBuffer);
    a=false;
  }

  // console.log(window);
  // player.src=stream;

  // if (window.URL) {
  //   player.src = window.URL.createObjectURL(stream);
  // } else {
  //   player.src = stream;
  // }
};

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(handleSuccess);


// window.AudioContext = window.AudioContext || window.webkitAudioContext;
// var context = new AudioContext();
// var analyser = context.createAnalyser();
//
// navigator.webkitGetUserMedia({ audio: true }, function (stream) {
//     var source = context.createMediaStreamSource(stream);
//     source.connect(analyser);
//     analyser.connect(context.destination);
//
//     setInterval(function () {
//         var array = new Uint8Array(analyser.frequencyBinCount);
//         analyser.getByteFrequencyData(array);
//         console.log(array);
//     }, 1000);
// }, function () { });
