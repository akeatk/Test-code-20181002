class FFTReader{
  constructor(length){
    this.array_length = length;

    this.levels = -1;
    for (var i = 0; i < 32; i++) {
        if (1 << i == n) {
            this.levels = i;  // Equal to log2(n)
        }
    }
    if (this.levels == -1)
      console.log('fft reader length error for: ', length);

    this.cosTable = new Array(length / 2);
    this.sinTable = new Array(length / 2);
    for(let i = 0;i < n / 2;i++){
      this.cosTable[i] = Math.cos(2 * Math.PI * i / length);
      this.sinTable[i] = Math.sin(2 * Math.PI * i / length);
    }
  }
  receiveData(data){
    const length = this.array_length;
    const reverseBits = (x, bits) => {
      let y = 0;

      for(let i = 0;i < bits;i++){
        y = (y << 1) | (x & 1);
        x >>>= 1;
      }
      return y;
    }

    for (let i = 0; i < length; i++) {
        const j = reverseBits(i, this.levels);

        if (j > i) {
            let temp = real[i];
            real[i] = real[j];
            real[j] = temp;

            temp = imag[i];
            imag[i] = imag[j];
            imag[j] = temp;
        }
    }

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
