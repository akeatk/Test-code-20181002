//Cooley-Tukey decimation-in-time radix-2 algorithm
class Turkey{
  constructor(n){
    if(Math.log2(n) % 1 > 0)
      throw "invalid turkey size";

    this.levels = Math.log2(n);
    this.n = n;

    this.cosTable = new Array(n / 2);
    this.sinTable = new Array(n / 2);
    for(let i = 0;i < n / 2;i++){
      this.cosTable[i] = Math.cos(2*Math.PI  * i / n);
      this.sinTable[i] = Math.sin(2*Math.PI  * i / n);
    }
  }

  run(real, imag){
    let n = this.n;

    for(let i = 0;i < n;i++){
      const j = this._reverseBits(i, this.levels);

      if(j > i){
        let temp = real[i];
  			real[i] = real[j];
  			real[j] = temp;

  			temp = imag[i];
  			imag[i] = imag[j];
  			imag[j] = temp;
      }
    }

    for(let size = 2;size <= n;size *= 2){// logn
      let halfsize = size / 2;
      let tablestep = n / size;
      for(let i = 0;i < n;i += size){// n / logn
        for(let j = i, k = 0; j < i + halfsize; j++, k+= tablestep){ //
    				let l = j + halfsize;
    				let tpre =  real[l] * this.cosTable[k] + imag[l] * this.sinTable[k];
    				let tpim = -real[l] * this.sinTable[k] + imag[l] * this.cosTable[k];

    				real[l] = real[j] - tpre;
    				imag[l] = imag[j] - tpim;
    				real[j] += tpre;
    				imag[j] += tpim;
        }
      }
    }

  }

  reverse(real, imag){
    this.run(imag, real);
  }

  _reverseBits(x, bits) {
    var y = 0;
    for (var i = 0; i < bits; i++) {
      y = (y << 1) | (x & 1);
      x >>>= 1;
    }
    return y;
  }
}

//Bluestein's chirp z-transform algorithm
class Zombie{
  constructor(n){
    this.n = n;
    this.m = 1;
    while(this.m < n * 2 + 1)
      this.m *= 2;

      console.log(this.m, ' ask;dlfj ', this.n)
    this.cosTable = new Array(n);
    this.sinTable = new Array(n);
    for(let i = 0;i < n;i++){
      const j = i * i % (n * 2);
      this.cosTable[i] = Math.cos(Math.PI * j / n);
      this.sinTable[i] = Math.sin(Math.PI * j / n);
    }

    this.areal = new Array(this.m);
    this.aimag = new Array(this.m);

    this.breal = new Array(this.m);
    this.bimag = new Array(this.m);

    this.creal = new Array(this.m);
    this.cimag = new Array(this.m);

    this.turkey = new Turkey(this.m);
  }

  run(real, imag){
    this._zeroArrays();

  	for (var i = 0; i < this.n; i++) {
  		this.areal[i] =  real[i] * this.cosTable[i] + imag[i] * this.sinTable[i];
  		this.aimag[i] = -real[i] * this.sinTable[i] + imag[i] * this.cosTable[i];
  	}

  	this.breal[0] = this.cosTable[0];
  	this.bimag[0] = this.sinTable[0];
  	for (var i = 1; i < this.n; i++) {
  		this.breal[i] = this.breal[this.m - i] = this.cosTable[i];
  		this.bimag[i] = this.bimag[this.m - i] = this.sinTable[i];
  	}

    this._convolveComplex();

  	for(let i = 0; i < this.m; i++) {
  		real[i] =  this.creal[i] * this.cosTable[i] + this.cimag[i] * this.sinTable[i];
  		imag[i] = -this.creal[i] * this.sinTable[i] + this.cimag[i] * this.cosTable[i];
  	}
  }

  _convolveComplex(){

    this.turkey.run(this.areal, this.aimag);
    this.turkey.run(this.breal, this.bimag);

    for(let i = 0;i < this.m;i++){
      const temp = this.areal[i] * this.breal[i] - this.aimag[i] * this.bimag[i];
      this.aimag[i] = this.aimag[i] * this.breal[i] + this.areal[i] * this.bimag[i];
      this.areal[i] = temp;
    }
    this.turkey.reverse(this.areal, this.aimag);

    for(let i = 0;i < this.m;i++){
      this.creal[i] = this.areal[i] / this.m;
      this.cimag[i] = this.aimag[i] / this.m;
    }
  }

  _zeroArrays(){
    for(let i = 0;i < this.m;i++)
      this.areal[i] = this.breal[i] = this.aimag[i] = this.bimag[i] = 0;
  }
}

class FFTReader{
  constructor(length, type){
    if(type === 1){//turkey hard-set
      this.fft = new Turkey(length);
    }
    else if(type === 2){//zombie hard-set
      this.fft = new Zombie(length);
    }
    else if(Math.log2(length) % 1 === 0){
      this.fft = new Turkey(length);
    }
    else{
      this.fft = new Zombie(length);
    }
  }

  run(real, imag){
    this.fft.run(real, imag);
  }

  receiveData(data){
    //process fft to freqs, then to notes(?)
    // freq = samplerate * bucket# / samplesize
    //samplerate = 44100
    //samplesize = 2^n

    //4410 === .1 seconds
    /*
      input sizes
      2048
      4096
    */

    //32768 ideal bucket size = 1.3458
      // starting note freq = 23.1246514195 safe = * 2
    //16384 pref bucket size = 2.691
      // starting note freq = 46.249302839
    //8192 is not good bucket size = 5.3833
      // starting note freq = 92.4986056779


    //transfer the exact freq finder using the square root function?

    //figure out a way to account for or use fft spread/spectral leakage
  }
}


module.exports = FFTReader;
