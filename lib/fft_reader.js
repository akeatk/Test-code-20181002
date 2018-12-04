class FFTReader{
  constructor(){

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
