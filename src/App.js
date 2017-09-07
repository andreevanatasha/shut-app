import React from 'react';
import { Textfit } from 'react-textfit';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            placeholder: 'Type anything',
            background: '#f28ec2',
            fullscreen: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.closeFullScreen = this.closeFullScreen.bind(this);
        this.openFullScreen = this.openFullScreen.bind(this);
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    clearInput() {
        this.setState({text: ''});
    }

    openFullScreen() {
        this.setState({fullscreen: true});
    }

    closeFullScreen() {
        this.setState({fullscreen: false});
    }


    render () {

        let rotate, screenWidth, screenHeight;
        screenWidth = window.innerWidth
        screenHeight = window.innerHeight;

        if (screenWidth < screenHeight) {
            rotate = {
                width: screenHeight,
                height: screenWidth,
                background: this.state.background,
                transform: "rotate(90deg)",
                transformOrigin: "bottom left",
                top: "-100vw"
            };
        } else {
             rotate = {
                width: screenWidth,
                height: screenHeight,
                background: this.state.background
            };
        };

        if (this.state.fullscreen === false) { 
            return (
                <div className="main" style={{background: this.state.background}} > 
                    <div className="header" style={{background: this.state.background}}>
                        <button className="btn clear" onClick={this.clearInput}>Clear</button>
                        <button className="btn run" onClick={this.openFullScreen} disabled={!this.state.text}>Run</button>
                    </div>
                    <textarea 
                        className="input" 
                        style={{background: this.state.background}} 
                        onChange={this.handleChange} 
                        placeholder={this.state.placeholder} 
                        type="text" 
                        value={this.state.text} />
                </div>
                )
        } else {
            return (
            <div className='fullscreen' style={rotate}>
                <button className="btn close" onClick={this.closeFullScreen}>Close</button>
                <Textfit max={500} style={{height: '100%'}}>
                  {this.state.text}
                </Textfit>
            </div>
            )
        };
    }
}

export default App;
