const interval = 1/44100;

const rounding_digits = 100;
// let rounding_digits = Math.pow(10,Math.round(1+Math.log(freq)/2));

class SoundNodes{
  constructor(start,end,interval){
    this.nodes = [];
    //initialize all soundnodeds
    //44100 per second
    this.volume = 0;
  }
  sendData(array){
    //given raw sound data and passes it through sound nodes
    //first run through all data and get a "volume"
    //before passing the data to the nodes, divide the data by the "volume"
    //each node will have a hash with key=slope, value = next val
  }
}

class SoundNode{
  constructor(freq, parent){
    this.parent = parent;
    //generate key:val hash starting at slope=0, val = 1
      //using cos might be easier for this one?
    //round the slope and vals so there is leeway for error
    interval = 1/44100;
    const wavelength = 1/freq;
    //wavelength = 34500(speed of sound) / frequency
    this.hash = {};
    let prev = Math.cos(2 * Math,PI * (-interval));
    let current = 1;
    let next = Math.cos(2 * Math,PI * interval);

    let slope;
    for(let i = 0;i < wavelength;i+=interval){
      slope = Math.round((next-prev) / interval / 2 * rounding_digits) / rounding_digits;

      this.hash[slope] = Math.round(next * rounding_digits) / rounding_digits;

      prev = current;
      current = next;
      next = Math.cos(2 * Math.PI * (interval + i));
    }

    this.slope = 0;
    this.prev = 0;
    this.current = 0;
    this.next = 0;
    this.value = 0;
  }

  sendNext(next){
    this.slope = Math.round((this.next - this.prev) / interval / 2 * rounding_digits ) / rounding_digits;

    this.prev = this.current;
    this.current = this.next;
    this.next = next;

    //activate "nerve" to increase signal to "ear"
    if(this.hash[this.slope] == Math.round(next * rounding_digits) / rounding_digits)
      this.value += this.parent.volume;

    //add a decay functino for this.value. can be dependent on volume or freq or something
  }
}

module.exports = SoundNodes;
