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

eval("const SoundNodes = __webpack_require__(/*! ./sound_nodes.js */ \"./lib/sound_nodes.js\");\n\nconst canvas = document.getElementsByTagName(\"canvas\")[0];\nconst ctx = canvas.getContext(\"2d\");\ncanvas.height = 700;\ncanvas.width = 2100;\n\n// read mouse click on canvas\n// function clickCanvas(e) {\n//     const x = e.clientX - canvas.offsetLeft;\n//     const y = e.clientY - canvas.offsetTop;\n//     pond.click(x,y);\n// }\n\n\n//------------------------------------------------------------------------------\n//test code for sound nodes\n\nif(true){\n//formulas of getting amplitude from 2 slopes\n\n/* key\nα = W = wavelength constant\n  sin(x*w) ; w = 1/(pi * 2) ; wavelength = 1 ; freq = 1\n\nβ = step size\n  44100 per second, so step size = 1/44100\n\nγ = SLOPE 2 (inputed value)\n\nλ = previous slope\n\nσ = slope diff (input - previous slope) || γ - λ\n\nε = slope diff / constants\n  ε = σ / (2*α*sin(-αβ/2))\n*/\n\n/* pre divided 1slope and slope diff formula (input and diff/constants)\n\n*/\nif(false){}\n//-----------------------------------\n\nlet sn = new SoundNodes(20,200,10,ctx);\n\nlet ar = [];\nconst freq1 = 100;\nconst waveconst1 = Math.PI * 2 / 44100 * freq1;\nfor(let i = 0;i < 882;i++){\n  ar.push(Math.sin(waveconst1 * i));\n}\n// console.log(ar);\nsn.printData();\nsn.sendData(ar);\nsn.printData();\n\nctx.fillStyle='#f00';\nfor(let i = 0;i < ar.length;i++){\n  ctx.fillStyle='#f00';\n  ctx.beginPath();\n  ctx.arc(i, canvas.height/4 * ar[i] + canvas.height / 2, 5, 0, 2 * Math.PI);\n  ctx.closePath();\n  ctx.fill();\n}\nsn.nodes.map((node)=>[node.freq,node.value])\n\n\n}\n\n\n\n\n\n\n\n\n//------------------------------------------------------------------------------\n//for sound nodes\nif(false){}\n\n\n//------------------------------------------------------------------------------\n//for fft\nif(false){}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//------------------------------------------------------------------------------\n\nif(false){}\n\n//------------------------------------------------------------------------------\n\n// window.AudioContext = window.AudioContext || window.webkitAudioContext;\n// var context = new AudioContext();\n// var analyser = context.createAnalyser();\n//\n// navigator.webkitGetUserMedia({ audio: true }, function (stream) {\n//     var source = context.createMediaStreamSource(stream);\n//     source.connect(analyser);\n//     analyser.connect(context.destination);\n//\n//     setInterval(function () {\n//         var array = new Uint8Array(analyser.frequencyBinCount);\n//         analyser.getByteFrequencyData(array);\n//         console.log(array);\n//     }, 1000);\n// }, function () { });\n\nif(false){ var Mic, Microphone; }\n\n//------------------------------------------------------------------------------\n\nif(false){ var webaudio_tooling_obj; }\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ }),

/***/ "./lib/sound_nodes.js":
/*!****************************!*\
  !*** ./lib/sound_nodes.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const mic_step_interval = 1/44100;// this is c\n\nclass SoundNodes{\n  constructor(start,end,step_size,ctx){\n    this.ctx = ctx;\n    this.nodes = [];\n    for(let i = start;i <= end;i+=step_size){\n      this.nodes.push(new SoundNode(i, this));\n    }\n\n    //initialize all soundnodes\n    //44100 per second\n\n    this.prev_val = 0;\n    this.prev_slope = 0;\n    console.log('ready');\n  }\n  sendData(array){\n    //given raw sound data and passes it through sound nodes\n    //first run through all data and get a \"volume\"\n    //before passing the data to the nodes, divide the data by the \"volume\"\n    //each node will have a hash with key=slope, value = next val\n    for(let i = 0;i < array.length;i++){\n      const slope = (array[i] - this.prev_val) / mic_step_interval;\n\n      for(let j = 0;j < this.nodes.length;j++){\n        this.nodes[j].sendNext(slope);\n      }\n\n      this.prev_val = array[i];\n      this.prev_slope = slope;\n    }\n  }\n  printData(){\n    console.log(this.nodes.map((node)=>[node.freq,node.value]));\n  }\n}\n\n//------------------------------------------------------------------------------\n\nclass SoundNode{\n  constructor(freq, parent){\n    this.parent = parent;\n    this.freq = freq;\n\n    //w\n    this.wavelength_const = 2 * Math.PI * freq / 44100;\n\n    //w/2\n    const trig_const = this.wavelength_const / 2;\n\n    const tan = Math.tan(trig_const);\n    const cot = 1 / tan;\n    const csc = 1 / Math.sin(trig_const);\n    const sec = 1 / Math.cos(trig_const);\n\n    this.const1 = Math.pow(tan, 2);\n    this.const2 = Math.pow(cot, 2);\n    this.const3 = 2 * Math.pow(csc, 2);\n    this.const4 = 2 * Math.pow(sec, 2);\n    this.const5 = Math.pow(csc, 2) * Math.pow(sec, 2);\n    this.const6 = 2;\n\n    this.value = 0;\n  }\n\n  sendNext(slope){\n    //wolfram equation\n    // γ-δ=-2αx * sin( (2 * acos(γ/(αx)) - α) / 2) * sin(α/2)\n    //slope = y2\n    //this.parent.prev_slope = previous slope            p  y1\n\n    const prev = this.parent.prev_slope;\n\n    const sum = this.const1 * slope * slope +\n        this.const2 * slope * slope -\n        this.const3 * slope * prev +\n        this.const4 * slope * prev +\n        this.const5 * prev * prev +\n        this.const6 * slope * slope;\n\n    let amp;\n    if(sum > 0){\n      amp = Math.sqrt(sum) / (2 * this.wavelength_const) * mic_step_interval;\n      if(amp){\n        let a = 1 - Math.abs(this.value - amp) / this.value;\n        const diff = amp - this.value;\n\n        if(a < 0.01)\n          a = 0.01;\n\n        this.value += diff * a;\n      }\n    }\n\n    if(this.freq === 110)\n      console.log(slope, sum, amp);\n\n    // const delta = (slope - this.parent.prev_slope) / this.div_const;\n    // if(this.freq === 100)\n    //   console.log(slope,slope-this.parent.prev_slope,this.div_const,delta);\n    //\n    // if(delta <= 1 && delta >= -1){\n    //   const amplitude = slope /\n    //       this.wavelength_const /\n    //       Math.cos(Math.asin(delta) + this.trig_const);\n    //\n    //   if(this.freq === 100)\n    //     console.log(amplitude);\n    //\n    //   //make it vary based on distance from \"val\"\n    //   if(amplitude <= 1)\n    //     this.value += amplitude;\n    // }\n  }\n}\n\n//------------------------------------------------------------------------------\n\nclass VolumeQueue{\n  constructor(length){\n    this.queue = [];\n    this.length = length;\n    this.volume = 1;\n  }\n  add(val){\n    if(this.queue.length === length)\n      this.queue.shift();\n    this.queue.push(val);\n    let sum = 0;\n    for(let i = 0;i < this.queue.length;i++)\n      sum+=this.queue[i];\n    this.volume = sum / this.queue.length;\n    if(this.volume === 0)\n      this.volume = 0.00000001;\n  }\n}\n\nmodule.exports = SoundNodes;\n\n\n//# sourceURL=webpack:///./lib/sound_nodes.js?");

/***/ })

/******/ });