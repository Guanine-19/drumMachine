import React from 'react';
import logo from './logo.svg';
import './App.css';
const bankOne = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];

const bankTwo = [{
keyCode: 81,
keyTrigger: 'Q',
id: 'Chord-1',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
}, {
keyCode: 87,
keyTrigger: 'W',
id: 'Chord-2',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
}, {
keyCode: 69,
keyTrigger: 'E',
id: 'Chord-3',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
}, {
keyCode: 65,
keyTrigger: 'A',
id: 'Shaker',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
}, {
keyCode: 83,
keyTrigger: 'S',
id: 'Open-HH',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
}, {
keyCode: 68,
keyTrigger: 'D',
id: 'Closed-HH',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
}, {
keyCode: 90,
keyTrigger: 'Z',
id: 'Punchy-Kick',
url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
}, {
keyCode: 88,
keyTrigger: 'X',
id: 'Side-Stick',
url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
}, {
keyCode: 67,
keyTrigger: 'C',
id: 'Snare',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}];

class DrumPadKey extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      playing: false
    }
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount(){
    document.addEventListener('keydown',this.handleKeyPress)
  }
  componentWillUnmount(){
    document.removeEventListener('keydown',this.handleKeyPress)
  }
  handleKeyPress(e){
    if(e.keyCode === this.props.item.keyCode){
      this.playSound();
    }
  }
  playSound(e){
    const sound = document.getElementById(this.props.item.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    setTimeout(()=>this.props.updateDisplayID(this.props.item.id),100);
    setTimeout(()=>{this.props.updateDisplayID('Press Key to Start')},1000);
  }

  render(){
    return(
      <div class="p-2 col-sm-4">
        <button class="drum-pad btn btn-dark" id={this.props.item.id} onClick={this.playSound}>
            <h3>{this.props.item.keyTrigger}</h3>
            <p>{this.props.item.id}</p>
        </button>
        <audio id={this.props.item.keyTrigger} class="clip" src={this.props.item.url}></audio>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      power: false,
      currentBank: bankOne,
      currentBankId: 'Heater Kit',
      currentID: 'Press Key to Start',
      sliderVolume: 0.5
    }
    this.setDisplayID = this.setDisplayID.bind(this)  
    this.setDrumPadVolume = this.setDrumPadVolume.bind(this)  
  }
    setDisplayID(id){
      this.setState({
        currentID: id
      })
    }
    setDrumPadVolume(){
      this.setState({
        sliderVolume: document.getElementById("volume").value
      })
    }
    render(){
      return (
        <div id="drum-machine" class="col-6 d-flex p-4">
          <div id="display" class="col-10">
            <div id="displayedText" class="d-flex fluid p-2 mb-2 justify-content-center">
              <h5>{this.state.currentID}</h5>
            </div>
            <div class="row">
                {this.state.currentBank.map((drumPad)=><DrumPadKey item={drumPad} updateDisplayID={this.setDisplayID}/>)}
            </div>
          </div>
          <div class="col-2 d-flex flex-column align-items-center ml-3 pr-0">
            <input id="volume" type="range" value={this.state.sliderVolume} min="0" max="1" step="0.01" class="form-control-range" onChange={this.setDrumPadVolume} orient="vertical"></input>
            <label>Adjust<br/>Volume</label>
          </div>
        </div>
      )
    }
}



export default App;
