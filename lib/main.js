const SoundNodes = require('./sound_nodes.js');

const FFTReader = require('./fft_reader.js');

const FFTNayuki = require('./fft.js');

const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");
canvas.height = 600;
canvas.width = 1800;

// read mouse click on canvas
// function clickCanvas(e) {
//     const x = e.clientX - canvas.offsetLeft;
//     const y = e.clientY - canvas.offsetTop;
//     pond.click(x,y);
// }




//------------------------------------------------------------------------------
//try a large fft and only care about increases?
//double check for correlation between my reader

//tests for fft shifts
//write a test that draws out the actual line by having dots and shifting
if(true){

  const len = 512;
  const turkey = new FFTReader(len);

  const fss = 1/len;

  let r1 = new Array(len);
  let i1 = new Array(len);

  //create sin wave
  if(true)
    for(let i = 0;i < len;i++){
      r1[i] = 2/8 * Math.sin(5+Math.PI*2*i * (fss * 5))
          + 2/8*Math.sin(2+Math.PI*2*i * (fss * 6))
          + 2/8*Math.sin(3+Math.PI*2*i * (fss * 7))
          + 2/8*Math.sin(6+Math.PI*2*i * (fss * 8))
          + 2/8*Math.sin(5+Math.PI*2*i * (fss * 9))
          + 2/8*Math.sin(7+Math.PI*2*i * (fss * 10));
      i1[i] = 0;
    }
  else{
    for(let i = 0;i < Math.floor(len/2);i++){
      r1[i] = Math.sin(5+Math.PI*2*i * (fss * 5)) +0* Math.sin(3+Math.PI*2*i * (fss * 10));
      i1[i] = 0;
    }
    for(let i = Math.floor(len/2);i < len;i++){
      r1[i] = i1[i] = 0;
    }
  }console.log(fss*44100);

  //sound nodes test
  let sn = new SoundNodes(44100*fss,44100*fss * 20,44100*fss,ctx);
  sn.sendData(r1);
  sn.printData();


  let r2 = r1.slice();
  let i2 = i1.slice();


  const multi = 300 * 2 / (len * 1.5);

  //20 shifts is surprisingly useful
  const shifts = 16;
  canvas.width = len * shifts / 2;

  for(let j = 0;j < shifts;j++){
    //reset arrays
    for(let i = 0;i < r2.length;i++){
      r2[i] = r1[i];
      i2[i] = 0;
    }

    //shift
    const shift_size = fss/shifts * j;
    for(let i = 0;i < len;i++){
      i2[i] = r2[i] * Math.cos(Math.PI * 2 * shift_size * i);
      r2[i] = r2[i] * Math.sin(Math.PI * 2 * shift_size * i);
    }

    turkey.run(r2,i2);

    //--------------------------------------------------------------------------

    // draw results as line
    if(false){
      for(let i = 0;i < r2.length / 2;i++){
        if(j === 0){
          ctx.fillStyle = '#0ff';
          ctx.fillRect(
            i * shifts + j,
            0,
            1,
            600
          );
          ctx.fillStyle = '#f0f';
          ctx.fillRect(
            i * shifts + j,
            0,
            1,
            300 - multi * Math.sqrt(r2[i] * r2[i] + i2[i] * i2[i])
          );
        }
        ctx.fillStyle = '#ccc';
        ctx.fillRect(
          i * shifts + j,
          300,
          1,
          1
        );
        //real
        ctx.fillStyle = '#f00';
        ctx.fillRect(
          i * shifts + j,
          300 - multi * r2[i],
          1,
          1
        );
        //imag
        ctx.fillStyle = '#0f0';
        ctx.fillRect(
          i * shifts + j,
          300 + multi * i2[i],
          1,
          1
        );
        //net
        ctx.fillStyle = '#00f';
        ctx.fillRect(
          i * shifts + j,
          300 - multi * Math.sqrt(r2[i] * r2[i] + i2[i] * i2[i]),
          1,
          1
        );
      }
    }
    else{
      ctx.fillStyle = '#00f';
      for(let i = 0;i < r2.length / 2;i++){
        // value
        // Math.sqrt(r2[i] * r2[i] + i2[i] * i2[i])
        ctx.beginPath();
        ctx.arc(
          canvas.width/2 + Math.cos(5*Math.log(5+(i + j))) * (10*(i + j) + 50),
          canvas.height/2 + Math.sin(5*Math.log(5+i + j)) * (10*(i + j) + 50),
          Math.log(1+Math.sqrt(r2[i] * r2[i] + i2[i] * i2[i])) * 10 ,
          0,
          2 * Math.PI
         );
        ctx.closePath();
        ctx.fill();
      }
    }
  }
}


/*
32k every 4k/2k/1k
32klog32k = 32k * 15 = 480k
0 shifts
step_size = 2.691650391
const_arr_size = 32k

16k = 4k/2k/1k
16klog16k = 16k * 14 = 224
1 shift
step_size = 5.4 / 2 =  ditto as 32k


VVVVVVVVVVVV  This one seems most reasonable for timing, double check intervals
2k = 2x/1x/1x
2klog2k = 2k * 11 = 22k
21.8 => 21/20 shifts
step_size = 1.96/2.05
const_arr_size = 44k/42k


1k = 4x/2x/1x
1klog1k = 1k * 10 = 10k
1x = 48 shifts
step_size = 1.794
2x = 24 shifts
  step_size = 3.589
4x = 12 shifts
step_size = 7.1


.5k = 8x/4x/2x
.5klog.5k = .5k * 9 = 4.5k
1x 106.7 = 106/105 shifts
step_size = 1.61/1.63
const_arr_size =53.5k/53k
2x = 50 shifts
4x = 26/27 shifts <= this one for now
step_size =
8x = 13 shifts

*/

/*
what is ideal step size for working with cirular freq's with notes?
range doubles every 12 notes
*/
//visualization test
if(false){
  ctx.drawStyle='#00f';
  for(let i = 100;i < canvas.height/2;i+=100){

    ctx.beginPath();
    ctx.arc(
      canvas.width/2,
      canvas.height/2,
      i,
      0,
      2 * Math.PI
     );
    ctx.closePath();
    ctx.stroke();
  }
  const start = 10;

  const log = Math.log(2);
  const sub = Math.log(start)/log-1;
  for(let i = start;i < 1000;i += 1.96){//1 is ideal...
    const l1 = Math.log(i)/log*2*Math.PI;
    const l2 = Math.log(i)/log - sub;
    ctx.fillStyle='#f00';
    ctx.beginPath();
    ctx.arc(
      canvas.width/2 + Math.cos(l1) * 100 * l2,
      canvas.height/2 + Math.sin(l1) * 100 * l2,
      5,
      0,
      2 * Math.PI
     );
    ctx.closePath();
    ctx.fill();
  }
}
/*

also, why are steps of 5 special/how can it be made special?

*/

//------------------------------------------------------------------------------
//FFTS and shifts ARE GOOD


//test fftreader (zombie and turkey ffts)
if(false){
  const len = 128;
  const turkey = new FFTReader(len);
  const zombie = new FFTReader(len, 2);

  const fss = 1/len;

  let r1 = new Array(len);
  let i1 = new Array(len);

  if(true)
    for(let i = 0;i < len;i++){
      r1[i] = Math.sin(5+Math.PI*2*i * (fss * 5))
          + 7/8*Math.sin(3+Math.PI*2*i * (fss * 6))
          + 3/4*Math.sin(3+Math.PI*2*i * (fss * 7))
          + 5/8*Math.sin(3+Math.PI*2*i * (fss * 8))
          + 1/2*Math.sin(3+Math.PI*2*i * (fss * 9))
          + 3/8*Math.sin(3+Math.PI*2*i * (fss * 10));
      i1[i] = 0;
    }
  else{
    for(let i = 0;i < len/2;i++){
      r1[i] = Math.sin(5+Math.PI*2*i * (fss * 5)) + Math.sin(3+Math.PI*2*i * (fss * 10));
      i1[i] = 0;
    }
    for(let i = len/2;i < len;i++){
      r1[i] = i1[i] = 0;
    }
  }

  //shift
  const shift_size = fss/len*90;
  for(let i = 0;i < len;i++){
    i1[i] = r1[i] * Math.cos(Math.PI * 2 * shift_size * i);
    r1[i] = r1[i] * Math.sin(Math.PI * 2 * shift_size * i);
  }

  let r2 = r1.slice();
  let i2 = i1.slice();

  turkey.run(r1,i1);
  zombie.run(r2,i2);

  let m1 = 0;
  let m2 = 0;
  for(let i = 0;i < len;i++){
    r1[i] = Math.sqrt(r1[i] * r1[i] + i1[i] * i1[i]);
    if(m1 < r1[i])
      m1 = r1[i];
    r2[i] = Math.sqrt(r2[i] * r2[i] + i2[i] * i2[i]);
    if(m2 < r2[i])
      m2 = r2[i];
  }
  console.log('=-------------------------asdhkfja');
  console.log(m1,' mmm ',m2);
  for(let i = 5;i < 20;i++){
    console.log(i,'|||',r1[i], '|||', r2[i],'-----',r1[i]*(1-((r1[i-1]/r1[i])+(r1[i+1]/r1[i]))/2), '|||', r2[i]);
  }

  const wid = canvas.width / len;
  let amp = canvas.height / 2 * .99 / m1;
  ctx.fillStyle='#f00';
  for(let i = 0;i < len;i++){
    ctx.fillRect(wid*i,0,wid,r1[i]*amp);
    ctx.fillRect(wid*i,canvas.height - r2[i]*amp,wid,r2[i]*amp);
  }

}


//------------------------------------------------------------------------------
//test code for

if(false){
  let dupes = 0;
  const comfort = Math.pow(2, 15);
  console.log(comfort);
  console.log('comfort step = ',44100 / comfort * 2);
  console.log('comfort time = ',comfort * Math.log2(comfort));

  let arr = [];
  //write a function to find a bunch of combos and find
  //the one with lowest avg and lowest max step diff

  //brackets are now array sizes...
  //test by arrays
  let brackets = [

  ];
  const m = Math.pow(2, 1/12);
  let max = -1;
  for(let i = 27.5;i < 55;i *= m){
    const num = Math.round(44100 / i * 2);
    if(num > max)
      max = num;
    brackets.push(num);
  }

  console.log('array sizes = ', ...brackets);
  console.log('max = ', max);
  max = Math.pow(2, Math.ceil(Math.log2(max)));
  console.log('intervals = ', max);



  let time = 0;
  for(let i = 0; i < brackets.length; i++){
    time += brackets[i] * Math.log2(brackets[i]) * Math.floor(max / brackets[i]);
  }
  console.log('multi-time   = ',time);
  console.log('comfort time = ',comfort * Math.log2(comfort));

  for(let i = 0;i < brackets.length;i++){
    const arr_size = brackets[i];
    const step_size = 44100 / arr_size  * 2;

    let curr = 0;

    for(let j = 1;j < arr_size;j++){
      const num = j * step_size;
      while(curr < arr.length && arr[curr] < num){
        curr++;
      }

      if(arr[curr] === num || Math.round(arr[curr]) === Math.round(num)){
        dupes++;
      }
      if(arr[curr] !== num){
        arr.splice(curr,0,num);
      }
    }
    console.log(step_size);
    console.log(arr.length);
  }

  //testing vars
  console.log(...arr.slice(100,200));

  let max1 = 0;
  let avg1 = 0;
  let max2 = 0;
  let avg2 = 0;
  let c1 = 0;
  let c2 = 0;
  for(let i = 0;arr[i] <= 200;i++){
    const diff = arr[i+1] - arr[i];
    if(max2 < diff)
      max2 = diff;
    avg2 += diff;
    c2++;

    if(arr[i] <= 100){
      if(max1 < diff)
        max1 = diff;
      avg1 += diff;
      c1++;
    }
  }
  console.log('max below 100 = ',max1);
  console.log('avg below 100 = ',avg1/c1);
  console.log('max below 200 = ',max2);
  console.log('avg below 200 = ',avg2/c2);

  console.log('dupes = ',dupes);
  console.log('arr_size = ', arr.length);
}

//------------------------------------------------------------------------------
//test code for sound nodes

//formulas of getting amplitude from 2 slopes

/* key
α = W = wavelength constant
  sin(x*w) ; w = 1/(pi * 2) ; wavelength = 1 ; freq = 1

β = step size
  44100 per second, so step size = 1/44100

γ = SLOPE 2 (inputed value)

λ = previous slope

σ = slope diff (input - previous slope) || γ - λ

ε = slope diff / constants
  ε = σ / (2*α*sin(-αβ/2))
*/

/* pre divided 1slope and slope diff formula (input and diff/constants)

*/
//-----------------------------------

if(false){
let sn = new SoundNodes(20,200,10,ctx);

let ar = [];
const freq1 = 100;
const waveconst1 = Math.PI * 2 / 44100 * freq1;
for(let i = 0;i < 882;i++){
  ar.push(0.5*Math.sin(waveconst1 * i)+0.5*Math.sin(waveconst1 * i + 2));
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
