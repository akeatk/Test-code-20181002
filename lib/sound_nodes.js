const mic_step_interval = 1/44100;

class SoundNodes{
  constructor(start,end,step_size,ctx){
    this.ctx = ctx;
    this.nodes = [];
    for(let i = start;i <= end;i+=step_size){
      this.nodes.push(new SoundNode(i,this,ctx));
    }

    //initialize all soundnodeds
    //44100 per second
    this.volqueue = new VolumeQueue(5);

    this.prev = 0;
    this.current = 0;
    this.next = 0;
    console.log('ready');
  }
  sendData(array){
    //given raw sound data and passes it through sound nodes
    //first run through all data and get a "volume"
    //before passing the data to the nodes, divide the data by the "volume"
    //each node will have a hash with key=slope, value = next val
    for(let i = 0;i < array.length;i++){
      this.prev = this.current;
      this.current = this.next;
      this.next = array[i];

      if(this.current > 0 && this.prev < this.current && this.next < this.current)
        this.volqueue.add(this.current);
      if(this.current < 0 && this.prev > this.current && this.next > this.current)
        this.volqueue.add(-this.current);

      // if(
      //   (this.prev < this.current && this.next < this.current) ||
      //   (this.prev > this.current && this.next > this.current)
      // ){
      //   if(this.current > 0)
      //     this.volqueue.add(this.current);
      //   else
      //     this.volqueue.add(-this.current);
      // }

      let current_val = this.current / this.volqueue.volume;

      for(let j = 0;j < this.nodes.length;j++){
        this.nodes[j].sendNext(current_val);
      }
    }
  }
  printData(){
    console.log(this.nodes.map((node)=>[node.freq,node.value]));
    console.log(this.volqueue.volume);
  }
}

//------------------------------------------------------------------------------

class SoundNode{
  constructor(freq, parent,ctx){
    this.ctx = ctx;
    this.parent = parent;
    this.freq = freq;
    //generate key:val hash starting at slope=0, val = 1
      //using cos might be easier for this one?
    //round the slope and vals so there is leeway for error
    const wavelength = 1/freq;

    this.rounding_digits = 1000;
    this.numdigits = Math.log10(this.rounding_digits);
    // this.rounding_digits = Math.pow(10,Math.round(1+Math.log(freq)/2));

    this.hash = {};
    this.slopemax = 2 * Math.PI / 44100 / wavelength;
    const roundedslopemax = Number((Math.round(this.slopemax * this.rounding_digits) / this.rounding_digits).toFixed(this.numdigits));
    const increment = 1 / this.rounding_digits;

    let current = 1;
    let slope = -roundedslopemax;
    let ax = 100;

    if(freq === 100){
      console.log('0000000000000000000000000000000000000000000000000000000');
      console.log(this.slopemax);
    }
    for(let i = -roundedslopemax + increment;i <= roundedslopemax + increment;i += increment){
      const nextslope = Number((i).toFixed(this.numdigits));

      //THE NEXT VALUE SHOULD BE 1/44100 + CURRENT X VALUE, NOT 1 STEP OF THE SLOPE. WTF ME
      const xval = Math.acos(nextslope / this.slopemax) / this.slopemax;
      if(this.freq === 100){
        console.log('freq = ',this.freq,'slopemax = ',this.slopemax,'xval = ',xval);
      }
      const val = Number((Math.round(Math.sin(xval * this.slopemax) * this.rounding_digits) / this.rounding_digits).toFixed(this.numdigits));

      if(this.freq === 100){
        this.ctx.fillStyle='#f0f';
        this.ctx.beginPath();
        this.ctx.arc(ax, 225 * val + 450, 5, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
        ax++;
      }

      this.hash[slope] = Math.abs(val);
      slope = nextslope;
    }
    if(this.freq === 180 || this.freq === 40)
      console.log(this.hash);

    //----------------------------------------

    this.slope = 0;

    this.value = 0;

    this.i=100;
  }

  sendNext(next){
    const val = Number((Math.round(Math.abs(next) * this.rounding_digits) / this.rounding_digits).toFixed(this.numdigits));
    if(this.hash[this.slope] && this.hash[this.slope] === val)
      // this.value += this.parent.volqueue.volume;
      this.value += 1;

    this.slope = Number((Math.round(this.slopemax * Math.cos(Math.asin(next)) * this.rounding_digits) / this.rounding_digits).toFixed(this.numdigits));

    if(this.freq == 100){
      // console.log(!!this.hash[this.slope]);
      if(this.hash[this.slope]){
        this.ctx.fillStyle='#000';
        this.ctx.beginPath();
        this.ctx.arc(this.i, 225 * (next < 1 ? -1 : 1) * this.hash[this.slope] + 450, 5, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
      }

      this.ctx.fillStyle='#00f';
      this.ctx.beginPath();
      this.ctx.arc(this.i, 225 * next + 450, 5, 0, 2 * Math.PI);
      this.ctx.closePath();
      this.ctx.fill();
      this.i++;
    }

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
