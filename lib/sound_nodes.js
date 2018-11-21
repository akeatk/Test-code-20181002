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
        this.nodes[j].sendNext(slope);
      }

      this.prev_val = array[i];
      this.prev_slope = slope;
    }
  }
  printData(){
    console.log(this.nodes.map((node)=>[node.freq,node.value]));
    for(let i = 0;i < this.nodes.length;i++){
      this.ctx.fillStyle='#f0f';
      this.ctx.beginPath();
      this.ctx.arc(10+i*10, 10*Math.log(1+500*this.nodes[i].value) + 10, 5, 0, 2 * Math.PI);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }
}

//------------------------------------------------------------------------------

class SoundNode{
  constructor(freq, parent){
    this.parent = parent;
    this.freq = freq;

    //w
    this.wavelength_const = 2 * Math.PI * freq / 44100;

    //w/2
    const trig_const = this.wavelength_const / 2;

    const tan = Math.tan(trig_const);
    const cot = 1 / tan;
    const csc = 1 / Math.sin(trig_const);
    const sec = 1 / Math.cos(trig_const);

    this.const1 = Math.pow(tan, 2);
    this.const2 = Math.pow(cot, 2);
    this.const3 = 2 * Math.pow(csc, 2);
    this.const4 = 2 * Math.pow(sec, 2);
    this.const5 = Math.pow(csc, 2) * Math.pow(sec, 2);
    this.const6 = 2;

    this.value = 0;
  }

  sendNext(slope){
    //wolfram equation
    // γ-δ=-2αx * sin( (2 * acos(γ/(αx)) - α) / 2) * sin(α/2)
    //slope = y2
    //this.parent.prev_slope = previous slope            p  y1

    const prev = this.parent.prev_slope;

    const sum = this.const1 * slope * slope +
        this.const2 * slope * slope -
        this.const3 * slope * prev +
        this.const4 * slope * prev +
        this.const5 * prev * prev +
        this.const6 * slope * slope;

    let amp;
    if(sum > 0){
      amp = Math.sqrt(sum) / (2 * this.wavelength_const) * mic_step_interval;
      if(amp){
        let a = 1 - Math.abs(this.value - amp) / this.value;
        const diff = amp - this.value;

        if(a < 0.01)
          a = 0.01;

        this.value += diff * a;
      }
    }

    // const delta = (slope - this.parent.prev_slope) / this.div_const;
    // if(this.freq === 100)
    //   console.log(slope,slope-this.parent.prev_slope,this.div_const,delta);
    //
    // if(delta <= 1 && delta >= -1){
    //   const amplitude = slope /
    //       this.wavelength_const /
    //       Math.cos(Math.asin(delta) + this.trig_const);
    //
    //   if(this.freq === 100)
    //     console.log(amplitude);
    //
    //   //make it vary based on distance from "val"
    //   if(amplitude <= 1)
    //     this.value += amplitude;
    // }
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
