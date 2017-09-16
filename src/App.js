import React from 'react';
import { Textfit } from 'react-textfit';
import Swipe from 'react-easy-swipe';
import './App.css';
import trash from './img/trash.svg';
import megaphone from './img/megaphone.svg';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            placeholder: 'Type anything. \nSwipe to change background.',
            background_id: 0,
            fullscreen: false,
            backgrounds: [
                '#0000ff',
                '#FE2370',
                '#3AF4D5',
                '#090707'
            ],
            backgrounds_number: 3,
            orientation: 'portrait'
        };

        this.handleChange = this.handleChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.closeFullScreen = this.closeFullScreen.bind(this);
        this.openFullScreen = this.openFullScreen.bind(this);
        this.onSwipeLeft = this.onSwipeLeft.bind(this);
        this.onSwipeRight = this.onSwipeRight.bind(this);
        this.changeOrientation = this.changeOrientation.bind(this);
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    changeOrientation(){
        this.setState({orientation: window.orientation});
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

    onSwipeLeft() {
        let current_background = this.state.background_id;

        if (current_background === 0) {
            this.setState({background_id: this.state.backgrounds_number});
        } else {
            current_background -= 1;
            this.setState({background_id: current_background});
        };
    }

    onSwipeRight() {
        let current_background = this.state.background_id;

        if (current_background === this.state.backgrounds_number) {
            this.setState({background_id: 0});
        } else {
            current_background += 1;
            this.setState({background_id: current_background});
        };
    }

    componentDidMount() {
        window.addEventListener('orientationchange', this.changeOrientation);
    }

    componentWillUnmount() {
        window.removeEventListener('orientationchange', this.changeOrientation);
    }

    render() {
        let rotate, screenWidth, screenHeight, background_color;
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;
        background_color = this.state.backgrounds[this.state.background_id];

        if (screenWidth < screenHeight) {
            rotate = {
                width: screenHeight,
                height: screenWidth,
                background: background_color,
                transform: "rotate(90deg)",
                transformOrigin: "bottom left",
                top: "-100vw"
            };
        } else {
             rotate = {
                width: screenWidth,
                height: screenHeight,
                background: background_color
            };
        };

        if (this.state.fullscreen === false) { 
            return (
                <Swipe
                    onSwipeLeft={this.onSwipeLeft}
                    onSwipeRight={this.onSwipeRight} >
                    <div className="main" style={{backgroundColor: background_color}} > 
                        <div className="header" style={{background: background_color}}>
                            <img src={trash} className='btn clear' onClick={this.clearInput} disabled={!this.state.text} />
                            <img src={megaphone} className="btn run" onClick={this.openFullScreen} disabled={!this.state.text} />
                        </div>
                        <textarea 
                            className="input" 
                            style={{background: background_color}} 
                            onChange={this.handleChange} 
                            placeholder={this.state.placeholder} 
                            type="text" 
                            value={this.state.text} />
                    </div>
                </Swipe>
                )
        } else {
            return (
               <Swipe
                    onSwipeLeft={this.onSwipeLeft}
                    onSwipeRight={this.onSwipeRight} >
                    <div className='fullscreen' style={rotate}>
                        <button className="btn close" onClick={this.closeFullScreen}>Close</button>
                        <div style={{display: 'table', height: '98%', width: '98%', margin: 'auto'}}>
	                        <Textfit max={500} style={{height: '100%', display: 'table-cell', textAlign: 'center', lineHeight: 1, verticalAlign: 'middle', width: '100%'}}>
	                          {this.state.text}
	                        </Textfit>
                        </div>
                    </div>
                </Swipe> 
            )
        }
    }
}

export default App;
