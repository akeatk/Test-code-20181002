/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const SoundNodes = __webpack_require__(/*! ./sound_nodes.js */ \"./lib/sound_nodes.js\");\n\nconst canvas = document.getElementsByTagName(\"canvas\")[0];\nconst ctx = canvas.getContext(\"2d\");\ncanvas.height = 900;\ncanvas.width = 2100;\n\n//----------------\nlet sn = new SoundNodes(20,200,10,ctx);\n\nlet ar = [];\nconst freq1 = 100;\nconst wavelength1 = 1/freq1;\nconst waveconst1 = Math.PI * 2 / 44100 / wavelength1;\nfor(let i = 0;i < 882;i++){\n  ar.push(Math.sin(waveconst1 * i));\n}\n// console.log(ar);\nsn.printData();\nsn.sendData(ar);\nsn.printData();\n\nctx.fillStyle='#f00';\nfor(let i = 0;i < ar.length;i++){\n  ctx.fillStyle='#f00';\n  ctx.beginPath();\n  ctx.arc(i, canvas.height/4 * ar[i] + canvas.height / 2, 5, 0, 2 * Math.PI);\n  ctx.closePath();\n  ctx.fill();\n}\nsn.nodes.map((node)=>[node.freq,node.value])\n\n//----------------\n\n// function clickCanvas(e) {\n//     const x = e.clientX - canvas.offsetLeft;\n//     const y = e.clientY - canvas.offsetTop;\n//     pond.click(x,y);\n// }\n\n//asks for audio from mic then processes the audio and stuffs\nnavigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{\n  const context = new AudioContext();\n  const SAMPLE_RATE = context.sampleRate;\n  const FFT_SIZE = null || 1024;\n\n  const analyser = context.createAnalyser();\n  analyser.smoothingTimeConstant = 0;\n  analyser.fftSize = FFT_SIZE;\n\n\n  const processor = context.createScriptProcessor(FFT_SIZE*2, 1, 1);\n  let frequency_array = [];\n  let showonce = true;\n  processor.onaudioprocess = e => {\n    if(showonce){\n      console.log(e.inputBuffer.getChannelData(0));\n      showonce=false;\n    }\n\n    //gets raw frequency data as a float array\n    frequency_array =e.inputBuffer.getChannelData(0);\n\n    ctx.fillStyle='#0ff';\n    ctx.fillRect(0, 0,canvas.width,canvas.height);\n    ctx.fillStyle='#f00';\n    const bar_width = 1;\n    for(let i = 0;i < frequency_array.length;i++){\n      if(true){//raw data\n        //frequency_array has a max value of 1\n        ctx.fillRect(bar_width*i+1,canvas.height/2,bar_width,1*frequency_array[i]*canvas.height/2);\n      }\n\n      else{}\n    }\n\n    // //displays frequencies using analyser's fft\n    // frequency_array = new Uint8Array(analyser.frequencyBinCount);\n    //\n    // analyser.getByteFrequencyData(frequency_array);\n    // ctx.fillStyle='#0ff';\n    // ctx.fillRect(0, 0,canvas.width,canvas.height);\n    // ctx.fillStyle='#f00';\n    // for(let i = 0;i < frequency_array.length;i++){\n    //   ctx.fillRect(1*i+1,0,1,1*frequency_array[i]);\n    // }\n  }\n\n  const source = context.createMediaStreamSource(stream);\n  source.connect(processor);\n  // analyser.connect(processor);\n  processor.connect(context.destination)\n});\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//------------------------------------------------------------------------------\n\nif(false){}\n\n//------------------------------------------------------------------------------\n\n// window.AudioContext = window.AudioContext || window.webkitAudioContext;\n// var context = new AudioContext();\n// var analyser = context.createAnalyser();\n//\n// navigator.webkitGetUserMedia({ audio: true }, function (stream) {\n//     var source = context.createMediaStreamSource(stream);\n//     source.connect(analyser);\n//     analyser.connect(context.destination);\n//\n//     setInterval(function () {\n//         var array = new Uint8Array(analyser.frequencyBinCount);\n//         analyser.getByteFrequencyData(array);\n//         console.log(array);\n//     }, 1000);\n// }, function () { });\n\nif(false){ var Mic, Microphone; }\n\n//------------------------------------------------------------------------------\n\nif(false){ var webaudio_tooling_obj; }\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ }),

/***/ "./lib/sound_nodes.js":
/*!****************************!*\
  !*** ./lib/sound_nodes.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const mic_step_interval = 1/44100;\n\nclass SoundNodes{\n  constructor(start,end,step_size,ctx){\n    this.ctx = ctx;\n    this.nodes = [];\n    for(let i = start;i <= end;i+=step_size){\n      this.nodes.push(new SoundNode(i,this,ctx));\n    }\n\n    //initialize all soundnodeds\n    //44100 per second\n    this.volqueue = new VolumeQueue(1);\n\n    this.prev = 0;\n    this.current = 0;\n    this.next = 0;\n    console.log('ready');\n  }\n  sendData(array){\n    //given raw sound data and passes it through sound nodes\n    //first run through all data and get a \"volume\"\n    //before passing the data to the nodes, divide the data by the \"volume\"\n    //each node will have a hash with key=slope, value = next val\n    for(let i = 0;i < array.length;i++){\n      this.prev = this.current;\n      this.current = this.next;\n      this.next = array[i];\n\n      if(this.current > 0 && this.prev < this.current && this.next < this.current)\n        this.volqueue.add(this.current);\n      if(this.current < 0 && this.prev > this.current && this.next > this.current)\n        this.volqueue.add(-this.current);\n\n      // if(\n      //   (this.prev < this.current && this.next < this.current) ||\n      //   (this.prev > this.current && this.next > this.current)\n      // ){\n      //   if(this.current > 0)\n      //     this.volqueue.add(this.current);\n      //   else\n      //     this.volqueue.add(-this.current);\n      // }\n\n      let current_val = this.current / this.volqueue.volume;\n\n      for(let j = 0;j < this.nodes.length;j++){\n        this.nodes[j].sendNext(current_val);\n      }\n    }\n  }\n  printData(){\n    console.log(this.nodes.map((node)=>[node.freq,node.value]));\n    console.log(this.volqueue.volume);\n  }\n}\n\n//------------------------------------------------------------------------------\n\nclass SoundNode{\n  constructor(freq, parent,ctx){\n    this.ctx = ctx;\n    this.parent = parent;\n    this.freq = freq;\n    //generate key:val hash starting at slope=0, val = 1\n      //using cos might be easier for this one?\n    //round the slope and vals so there is leeway for error\n    const wavelength = 1/freq;\n\n    this.rounding_digits = 1000;\n    this.numdigits = Math.log10(this.rounding_digits);\n    // this.rounding_digits = Math.pow(10,Math.round(1+Math.log(freq)/2));\n\n    this.hash = {};\n    //cos const\n    this.cosconst = 2 * Math.PI / 44100 * freq;\n    const increment = 1 / this.rounding_digits;\n\n    let current = -1;\n\n    for(;current <= 1;current += increment){\n      const xval = Math.acos(current / this.cosconst) / this.cosconst;\n      const next1 = Number((Math.cos(xval * this.cosconst + mic_step_interval)).toFixed(this.numdigits));\n      const next2 = Number((Math.cos(xval * this.cosconst + mic_step_interval + Math.PI)).toFixed(this.numdigits));\n\n      this.hash[current] = [next1, next2];\n\n      // const xval = Math.acos(nextslope / this.slopemax) / this.slopemax;\n      // const val = Number((Math.sin(xval * this.slopemax)).toFixed(this.numdigits));\n\n      // this.hash[slope] = Math.abs(val);\n    }\n    if(this.freq === 180 || this.freq === 40)\n      console.log(this.hash);\n\n    //----------------------------------------\n\n    this.slope = 0;\n\n    this.value = 0;\n\n    this.i=100;\n  }\n\n  sendNext(next){\n    const val = Number((Math.round(Math.abs(next) * this.rounding_digits) / this.rounding_digits).toFixed(this.numdigits));\n    if(this.hash[this.slope] && this.hash[this.slope] === val)\n      // this.value += this.parent.volqueue.volume;\n      this.value += 1;\n\n    this.slope = Number((Math.round(this.slopemax * Math.cos(Math.asin(next)) * this.rounding_digits) / this.rounding_digits).toFixed(this.numdigits));\n\n    if(this.freq == 100){\n      // console.log(!!this.hash[this.slope]);\n      if(this.hash[this.slope]){\n        this.ctx.fillStyle='#000';\n        this.ctx.beginPath();\n        this.ctx.arc(this.i, 225 * (next < 1 ? -1 : 1) * this.hash[this.slope] + 450, 5, 0, 2 * Math.PI);\n        this.ctx.closePath();\n        this.ctx.fill();\n      }\n\n      this.ctx.fillStyle='#00f';\n      this.ctx.beginPath();\n      this.ctx.arc(this.i, 225 * next + 450, 5, 0, 2 * Math.PI);\n      this.ctx.closePath();\n      this.ctx.fill();\n      this.i++;\n    }\n\n    //add a decay functino for this.value. can be dependent on volume or freq or something\n  }\n}\n\n//------------------------------------------------------------------------------\n\nclass VolumeQueue{\n  constructor(length){\n    this.queue = [];\n    this.length = length;\n    this.volume = 1;\n  }\n  add(val){\n    if(this.queue.length === length)\n      this.queue.shift();\n    this.queue.push(val);\n    let sum = 0;\n    for(let i = 0;i < this.queue.length;i++)\n      sum+=this.queue[i];\n    this.volume = sum / this.queue.length;\n    if(this.volume === 0)\n      this.volume = 0.00000001;\n  }\n}\n\nmodule.exports = SoundNodes;\n\n\n//# sourceURL=webpack:///./lib/sound_nodes.js?");

/***/ })

/******/ });