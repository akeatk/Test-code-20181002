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
/***/ (function(module, exports) {

eval("const canvas = document.getElementsByTagName(\"canvas\")[0];\ncanvas.height = 500;\ncanvas.width = 500;\n\n// function clickCanvas(e) {\n//     const x = e.clientX - canvas.offsetLeft;\n//     const y = e.clientY - canvas.offsetTop;\n//     pond.click(x,y);\n// }\n\n\nconst ctx = canvas.getContext(\"2d\");\n// const player = document.getElementById('player');\n\nlet handleSuccess = function(stream) {\n\n  // //this works. However, I don't understand the set interval part\n  // //am I missing info or getting duplicates of I don't time it right?\n  // const context = new AudioContext();\n  // const analyser = context.createAnalyser();\n  // const source = context.createMediaStreamSource(stream);\n  //\n  // source.connect(analyser);\n  // analyser.connect(context.destination);\n\n\n  // setInterval(function () {\n  //     var array = new Uint8Array(analyser.frequencyBinCount);\n  //     analyser.getByteFrequencyData(array);\n  //     console.log(array);\n  // }, 1000);\n\n\n  var context = new AudioContext();\n  var source = context.createMediaStreamSource(stream);\n  var processor = context.createScriptProcessor(1024, 1, 1);\n\n  source.connect(processor);\n  processor.connect(context.destination);\n  let a = true;\n  processor.onaudioprocess = function(e) {\n    if(a)\n    // Do something with the data, i.e Convert this to WAV\n    console.log(e.inputBuffer);\n    a=false;\n  }\n\n  // console.log(window);\n  // player.src=stream;\n\n  // if (window.URL) {\n  //   player.src = window.URL.createObjectURL(stream);\n  // } else {\n  //   player.src = stream;\n  // }\n};\n\nnavigator.mediaDevices.getUserMedia({ audio: true, video: false })\n  .then(handleSuccess);\n\n\n// window.AudioContext = window.AudioContext || window.webkitAudioContext;\n// var context = new AudioContext();\n// var analyser = context.createAnalyser();\n//\n// navigator.webkitGetUserMedia({ audio: true }, function (stream) {\n//     var source = context.createMediaStreamSource(stream);\n//     source.connect(analyser);\n//     analyser.connect(context.destination);\n//\n//     setInterval(function () {\n//         var array = new Uint8Array(analyser.frequencyBinCount);\n//         analyser.getByteFrequencyData(array);\n//         console.log(array);\n//     }, 1000);\n// }, function () { });\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });