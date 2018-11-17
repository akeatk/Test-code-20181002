const mic_step_interval = 1/44100;// this is c

class SoundNodes{
  constructor(start,end,step_size,ctx){
    this.ctx = ctx;
    this.nodes = [];
    for(let i = start;i <= end;i+=step_size){
      this.nodes.push(new SoundNode(i, this));
    }

    //initialize all soundnodes
    //44100 per second

    this.prev_val = 0;
    this.prev_slope = 0;
    console.log('ready');
  }
  sendData(array){
    //given raw sound data and passes it through sound nodes
    //first run through all data and get a "volume"
    //before passing the data to the nodes, divide the data by the "volume"
    //each node will have a hash with key=slope, value = next val
    for(let i = 0;i < array.length;i++){
      const slope = (array[i] - this.prev_val) / mic_step_interval;

      for(let j = 0;j < this.nodes.length;j++){
        this.nodes[j].sendNext(current_val);
      }

      this.prev_val = array[i];
      this.prev_slope = slope;
    }
  }
  printData(){
    console.log(this.nodes.map((node)=>[node.freq,node.value]));
    console.log(this.volqueue.volume);
  }
}

//------------------------------------------------------------------------------

class SoundNode{
  constructor(freq, parent){
    this.ctx = ctx;
    this.parent = parent;
    this.freq = freq;

    this.wavelength_const = 2 * Math.PI / 44100 * freq;//w
    //mic_step_interval = 1/44100                        c
    //this.parent.prev_slope = previous slope            p


    const trig_const = this.wavelength_const * mic_step_interval / 2;

    const secant = Math.sec(trig_const);
    const tangent = Math.tan(trig_const);

    this.const0 = 2 * this.wavelength_const * Math.sin(-trig_const);
    this.const1 = Math.pow(this.wavelength_const, 2) * Math.pow(secant, 2);
    this.const2 = Math.pow(tangent, 2);
    this.const3 = 2 * this.wavelength_const * tangent * secant;
  }

  sendNext(slope){
    const sigma = (slope - this.parent.prev_slope) / this.const0;

    const sum = this.const1 * sigma * sigma +
      this.const2 * slope * slope +
      this.const3 * slope * sigma +
      slope * slope;

    if(sum > 0){
      const amplitude = Math.sqrt(sum) / this.wavelength_const;

      //make it vary based on distance from "val"
      if(sum <= 1)
        this.val += sum;
    }
  }
}

//------------------------------------------------------------------------------

class VolumeQueue{
  constructor(length){
    this.queue = [];
    this.length = length;
    this.volume = 1;
  }
  add(val){
    if(this.queue.length === length)
      this.queue.shift();
    this.queue.push(val);
    let sum = 0;
    for(let i = 0;i < this.queue.length;i++)
      sum+=this.queue[i];
    this.volume = sum / this.queue.length;
    if(this.volume === 0)
      this.volume = 0.00000001;
  }
}

module.exports = SoundNodes;
