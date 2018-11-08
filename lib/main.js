const SoundNodes = require('./sound_nodes.js');

const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");
canvas.height = 700;
canvas.width = 2100;

// read mouse click on canvas
// function clickCanvas(e) {
//     const x = e.clientX - canvas.offsetLeft;
//     const y = e.clientY - canvas.offsetTop;
//     pond.click(x,y);
// }

//------------------------------------------------------------------------------
if(false){
// coding practice

//brute force +/- solution O(2^n)
class Node{
  constructor(value){
    this.val = value;
  }
  nextVal(next, nodes){
    nodes.push(new Node(this.val + next));
    this.val -= next;
    nodes.push(this);
  }
}

function f(sum, nums){
  let nodes = [new Node(nums[0] || 0)];
  for(let i = 1;i < nums.length;i++){
    const length = nodes.length;
    for(let j = 0;j < length;j++){
      nodes.shift().nextVal(nums[i], nodes);
    }
  }

  for(let i = 0;i < nodes.length;i++)
    if(nodes[i].val === sum)
      return true;

  return false;
}

//better sol? O(nlogn)
function f(sum, nums){
  let current = nums.shift() || 0;
  let sorted = nums.sort((a,b) => b-a);
  for(let i = 0;i < sorted.length;i++){
    if(current > sum)
      current -= sorted[i];
    else
      current += sorted[i];
  }
  return current === sum;
}


console.log(f(-1, [1,3,5])===true);
console.log(f(1, [6,3])===false);
console.log(f(19, [1,3,6,9,5,5])===true);
console.log(f(0,[])===true);
console.log(f(43,[])===false);
console.log(f(42,[42])===true);
console.log(f(0,[99])===false);
}


//------------------------------------------------------------------------------
//test code for sound nodes

if(true){

let sn = new SoundNodes(20,200,10,ctx);

let ar = [];
const freq1 = 100;
const wavelength1 = 1/freq1;
const waveconst1 = Math.PI * 2 / 44100 / wavelength1;
for(let i = 0;i < 882;i++){
  ar.push(Math.sin(waveconst1 * i));
}
// console.log(ar);
sn.printData();
sn.sendData(ar);
sn.printData();

ctx.fillStyle='#f00';
for(let i = 0;i < ar.length;i++){
  ctx.fillStyle='#f00';
  ctx.beginPath();
  ctx.arc(i, canvas.height/4 * ar[i] + canvas.height / 2, 5, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}
sn.nodes.map((node)=>[node.freq,node.value])


}








//------------------------------------------------------------------------------
//for sound nodes
if(false){
//asks for audio from mic then processes the audio and stuffs
navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
  const context = new AudioContext();
  const SAMPLE_RATE = context.sampleRate;
  const FFT_SIZE = null || 1024;

  const analyser = context.createAnalyser();
  analyser.smoothingTimeConstant = 0;
  analyser.fftSize = FFT_SIZE;


  const processor = context.createScriptProcessor(FFT_SIZE*2, 1, 1);
  let frequency_array = [];
  let showonce = true;
  processor.onaudioprocess = e => {
    if(showonce){
      console.log(e.inputBuffer.getChannelData(0));
      showonce=false;
    }

    //gets raw frequency data as a float array
    frequency_array =e.inputBuffer.getChannelData(0);

    ctx.fillStyle='#0ff';
    ctx.fillRect(0, 0,canvas.width,canvas.height);
    ctx.fillStyle='#f00';
    const bar_width = 1;
    for(let i = 0;i < frequency_array.length;i++){
      if(true){//raw data
        //frequency_array has a max value of 1
        ctx.fillRect(bar_width*i+1,canvas.height/2,bar_width,1*frequency_array[i]*canvas.height/2);
      }

      else{//DON'T USE LOG HERE. LOG OF A SIN CURVE DOESN'T LOOK LIKE A SIN CURVE
        let s = 1;
        if(frequency_array[i] < 0)
          s=-1;
        ctx.fillRect(1*i+1,canvas.height/2,1,s*Math.log(10+Math.abs(frequency_array[i])*10000)*10);
      }
    }
  }

  const source = context.createMediaStreamSource(stream);
  source.connect(processor);
  processor.connect(context.destination);
});

}


//------------------------------------------------------------------------------
//for fft
if(false){
//asks for audio from mic then processes the audio and stuffs
navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
  const context = new AudioContext();
  const SAMPLE_RATE = context.sampleRate;
  const FFT_SIZE = 1024;

  const analyser = context.createAnalyser();
  analyser.smoothingTimeConstant = 0;
  analyser.fftSize = FFT_SIZE;


  const processor = context.createScriptProcessor(FFT_SIZE*2, 1, 1);
  let frequency_array = [];
  let showonce = true;
  processor.onaudioprocess = e => {

    ctx.fillStyle='#0ff';
    ctx.fillRect(0, 0,canvas.width,canvas.height);
    ctx.fillStyle='#f00';
    const bar_width = 1;

    //displays frequencies using analyser's fft
    frequency_array = new Uint8Array(analyser.frequencyBinCount);

    analyser.getByteFrequencyData(frequency_array);
    ctx.fillStyle='#0ff';
    ctx.fillRect(0, 0,canvas.width,canvas.height);
    ctx.fillStyle='#f00';
    for(let i = 0;i < frequency_array.length;i++){
      ctx.fillRect(bar_width*i+1,0,bar_width,1*frequency_array[i]);
    }
  }
  const source = context.createMediaStreamSource(stream);
  source.connect(analyser);
  analyser.connect(processor);
  processor.connect(context.destination);
});

}















//------------------------------------------------------------------------------

if(false){

let handleSuccess = function(stream) {

  //this works. However, I don't understand the set interval part
  //am I missing info or getting duplicates if I don't time it right?
  const context = new AudioContext();
  const analyser = context.createAnalyser();
  const source = context.createMediaStreamSource(stream);

  source.connect(analyser);
  analyser.connect(context.destination);


  setInterval(function () {
      var array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      console.log(array);
  }, 1000);


  // var context = new AudioContext();
  // var source = context.createMediaStreamSource(stream);
  // var processor = context.createScriptProcessor(1024, 1, 1);
  //
  // source.connect(processor);
  // processor.connect(context.destination);
  // let a = true;
  // processor.onaudioprocess = function(e) {
  //   if(a)
  //   // Do something with the data, i.e Convert this to WAV
  //   console.log(e.inputBuffer);
  //   a=false;
  // }
};

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(handleSuccess);

}

//------------------------------------------------------------------------------

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

if(false){

function Microphone (_fft) {

  var FFT_SIZE = _fft || 1024;

  this.spectrum = [];
  this.volume = this.vol = 0;
  this.peak_volume = 0;

  var self = this;
  var audioContext = new AudioContext();
  var SAMPLE_RATE = audioContext.sampleRate;

  // this is just a browser check to see
  // if it supports AudioContext and getUserMedia
  window.AudioContext = window.AudioContext ||  window.webkitAudioContext;
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

  // now just wait until the microphone is fired up
  window.addEventListener('load', init, false);

  function init () {
    try {
      startMic(new AudioContext());
    }
    catch (e) {
      console.error(e);
      alert('Web Audio API is not supported in this browser');
    }
  }

  function startMic (context) {

    navigator.getUserMedia({ audio: true }, processSound, error);

    function processSound (stream) {

      // analyser extracts frequency, waveform, etc.
      var analyser = context.createAnalyser();
      analyser.smoothingTimeConstant = 0.2;
      analyser.fftSize = FFT_SIZE;

      var node = context.createScriptProcessor(FFT_SIZE*2, 1, 1);

      node.onaudioprocess = function () {

        // bitcount returns array which is half the FFT_SIZE
        self.spectrum = new Uint8Array(analyser.frequencyBinCount);

        // getByteFrequencyData returns amplitude for each bin
        analyser.getByteFrequencyData(self.spectrum);
        // getByteTimeDomainData gets volumes over the sample time
        // analyser.getByteTimeDomainData(self.spectrum);

        self.vol = self.getRMS(self.spectrum);
        // get peak - a hack when our volumes are low
        if (self.vol > self.peak_volume) self.peak_volume = self.vol;
        self.volume = self.vol;

      };

      var input = context.createMediaStreamSource(stream);
      input.connect(analyser);
      analyser.connect(node);
      node.connect(context.destination);

    }

    function error () {
      console.log(arguments);
    }

  }

  //////// SOUND UTILITIES  ////////
  var ctx = createCanvas("canvas1");

  // make a grid 200 wide
  // I covered how to make grids here
  var grid = new Grid(200, 1);

  function draw(){

    ctx.background(235);

    for (var i = 0; i < grid.length; i++) {
      var s = Mic.spectrum[i];
      ctx.fillStyle = hsl(map(i, 0, grid.length, 0, 360), 80, 50);
      ctx.fillRect(grid.x[i], h - s, grid.spacing_x-1, s);
    }

  }
  ///// ..... we going to put more stuff here....

  return this;

};

var Mic = new Microphone();

}

//------------------------------------------------------------------------------

if(false){


var webaudio_tooling_obj = function () {

var audioContext = new AudioContext();

console.log("audio is starting up ...");

var BUFF_SIZE = 16384;

var audioInput = null,
    microphone_stream = null,
    gain_node = null,
    script_processor_node = null,
    script_processor_fft_node = null,
    analyserNode = null;

if (!navigator.getUserMedia)
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia || navigator.msGetUserMedia;

if (navigator.getUserMedia){

    navigator.getUserMedia({audio:true},
      function(stream) {
          start_microphone(stream);
      },
      function(e) {
        alert('Error capturing audio.');
      }
    );

} else { alert('getUserMedia not supported in this browser.'); }

// ---

function show_some_data(given_typed_array, num_row_to_display, label) {

    var size_buffer = given_typed_array.length;
    var index = 0;
    var max_index = num_row_to_display;

    console.log("__________ " + label);

    for (; index < max_index && index < size_buffer; index += 1) {

        console.log(given_typed_array[index]);
    }
}

function process_microphone_buffer(event) {

    var i, N, inp, microphone_output_buffer;

    microphone_output_buffer = eventz.getChannelData(0); // just mono - 1 channel for now

    // microphone_output_buffer  <-- this buffer contains current gulp of data size BUFF_SIZE

    show_some_data(microphone_output_buffer, 5, "from getChannelData");
}

function start_microphone(stream){

  gain_node = audioContext.createGain();
  gain_node.connect( audioContext.destination );

  microphone_stream = audioContext.createMediaStreamSource(stream);
  microphone_stream.connect(gain_node);

  script_processor_node = audioContext.createScriptProcessor(BUFF_SIZE, 1, 1);
  script_processor_node.onaudioprocess = process_microphone_buffer;

  microphone_stream.connect(script_processor_node);

  // --- enable volume control for output speakers

  document.getElementById('volume').addEventListener('change', function() {

      var curr_volume = this.value;
      gain_node.gain.value = curr_volume;

      console.log("curr_volume ", curr_volume);
  });

  // --- setup FFT

  script_processor_fft_node = audioContext.createScriptProcessor(2048, 1, 1);
  script_processor_fft_node.connect(gain_node);

  analyserNode = audioContext.createAnalyser();
  analyserNode.smoothingTimeConstant = 0;
  analyserNode.fftSize = 2048;

  microphone_stream.connect(analyserNode);

  analyserNode.connect(script_processor_fft_node);

  script_processor_fft_node.onaudioprocess = function() {

    // get the average for the first channel
    var array = new Uint8Array(analyserNode.frequencyBinCount);
    analyserNode.getByteFrequencyData(array);

    // draw the spectrogram
    if (microphone_stream.playbackState == microphone_stream.PLAYING_STATE) {

        show_some_data(array, 5, "from fft");
    }
  };
}

}(); //  webaudio_tooling_obj = function()


}
