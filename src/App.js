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
        let styles = {
                width: screen.availWidth,
                height: screen.availHeight,
                background: this.state.background
        };

        if (this.state.fullscreen === false) { 
            return (
                <div className="main" style={styles}> 
                    <div className="header">
                        <button className="btn clear" onClick={this.clearInput}>Clear</button>
                        <button className="btn run" onClick={this.openFullScreen}>Run</button>
                    </div>
                    <textarea className="input" style={{background: this.state.background}} onChange={this.handleChange} placeholder={this.state.placeholder} type="text" value={this.state.text} />
                </div>
                )
        } else {
            return (
            <div className='rotate' style={styles}>
                <button className="btn" onClick={this.closeFullScreen}>Close</button>
                <Textfit>
                  {this.state.text}
                </Textfit>
            </div>
            )
        };
  }
}

export default App;
