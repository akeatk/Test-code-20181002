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

eval("const canvas = document.getElementsByTagName(\"canvas\")[0];\nconst ctx = canvas.getContext(\"2d\");\ncanvas.height = 500;\ncanvas.width = 1500;\n\n// function clickCanvas(e) {\n//     const x = e.clientX - canvas.offsetLeft;\n//     const y = e.clientY - canvas.offsetTop;\n//     pond.click(x,y);\n// }\n\n//asks for audio from mic then processes the audio and stuffs\nnavigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{\n  const context = new AudioContext();\n  const SAMPLE_RATE = context.sampleRate;\n  const FFT_SIZE = null || 2048;\n\n  const analyser = context.createAnalyser();\n  analyser.smoothingTimeConstant = 0;\n  analyser.fftSize = FFT_SIZE;\n\n\n  const processor = context.createScriptProcessor(FFT_SIZE*2, 1, 1);\n  let frequency_array = [];\n  processor.onaudioprocess = e => {\n    frequency_array = new Uint8Array(analyser.frequencyBinCount);\n\n    analyser.getByteFrequencyData(frequency_array);\n    ctx.fillStyle='#0ff';\n    ctx.fillRect(0, 0,canvas.width,canvas.height);\n    ctx.fillStyle='#f00';\n    for(let i = 0;i < frequency_array.length;i++){\n      ctx.fillRect(1*i+1,0,1,1*frequency_array[i]);\n    }\n  }\n\n  const source = context.createMediaStreamSource(stream);\n  source.connect(analyser);\n  analyser.connect(processor);\n  processor.connect(context.destination)\n});\n\n//------------------------------------------------------------------------------\n\nif(false){}\n\n//------------------------------------------------------------------------------\n\n// window.AudioContext = window.AudioContext || window.webkitAudioContext;\n// var context = new AudioContext();\n// var analyser = context.createAnalyser();\n//\n// navigator.webkitGetUserMedia({ audio: true }, function (stream) {\n//     var source = context.createMediaStreamSource(stream);\n//     source.connect(analyser);\n//     analyser.connect(context.destination);\n//\n//     setInterval(function () {\n//         var array = new Uint8Array(analyser.frequencyBinCount);\n//         analyser.getByteFrequencyData(array);\n//         console.log(array);\n//     }, 1000);\n// }, function () { });\n\nif(false){ var Mic, Microphone; }\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });