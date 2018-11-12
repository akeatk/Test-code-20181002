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

    this.wavelength_const = 2 * Math.PI / 44100 * freq;
    //prev_slope = this.parent.prev_slope;

  }

  sendNext(next){
    const val = Number(next.toFixed(this.numdigits));

    if(this.hash[this.current] && this.hash[this.current].includes(val))
      this.value += 1;

    this.current = val;
        if(this.freq == 100){
          // console.log(!!this.hash[this.slope]);
          if(this.hash[this.slope]){
            this.ctx.fillStyle='#000';
            this.ctx.beginPath();
            this.ctx.arc(this.i, 175 * (next < 1 ? -1 : 1) * this.hash[this.slope] + 350, 5, 0, 2 * Math.PI);
            this.ctx.closePath();
            this.ctx.fill();
          }

          this.ctx.fillStyle='#00f';
          this.ctx.beginPath();
          this.ctx.arc(this.i, 175 * next + 350, 5, 0, 2 * Math.PI);
          this.ctx.closePath();
          this.ctx.fill();
          this.i++;
        }

    // const val = Number((Math.round(Math.abs(next) * this.rounding_digits) / this.rounding_digits).toFixed(this.numdigits));
    // if(this.hash[this.slope] && this.hash[this.slope] === val)
    //   // this.value += this.parent.volqueue.volume;
    //   this.value += 1;
    //
    // this.slope = Number((Math.round(this.slopemax * Math.cos(Math.asin(next)) * this.rounding_digits) / this.rounding_digits).toFixed(this.numdigits));


    //add a decay functino for this.value. can be dependent on volume or freq or something

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
