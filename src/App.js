import React from 'react';
import { Textfit } from 'react-textfit';
import Swipe from 'react-easy-swipe';
import './App.css';
import { Button } from './Button';


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
            orientation: 'portrait',
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
                top: "-100vw",
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
                            <Button name='clear' disable={this.state.text} action={this.clearInput} />
                            <Button name='run' disable={this.state.text} action={this.openFullScreen} />
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
                    //height: 20% on the header ain't a neato solution but since we won't have rotation on web and won't have landscape mode on mobile it'll do
                        <div className="header" style={{background: background_color, flexDirection: 'row-reverse', height: '20%'}}>
                            <Button name='close' disable={this.state.text} action={this.closeFullScreen} />
                        </div>
                        <div style={{display: 'flex', flex: '1', justifyContent: 'center', alignContent: 'center'}}>
	                        <Textfit max={500} style={{height: '100%', width: '100%', textAlign: 'center', lineHeight: 1, width: '100%', alignSelf: 'center'}}>
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
