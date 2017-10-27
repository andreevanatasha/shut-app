import React from 'react';
import { Textfit } from 'react-textfit';
import Swipe from 'react-easy-swipe';
import './App.css';
import { Button } from './Button';
import logo from './img/sa.svg';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: 'An ultimate app for club communication.\nOrder at the bar from the second row. \nTalk to a friend in the crowd. \nUse your phone as a color-coded beacon.',
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
        let background_color = this.state.backgrounds[this.state.background_id];

        if (this.state.fullscreen === false) { 
            return (
                <Swipe
                    onSwipeLeft={this.onSwipeLeft}
                    onSwipeRight={this.onSwipeRight} 
                    allowMouseEvents={true} >
                    <div className="main" style={{backgroundColor: background_color}} > 
                        <div className="header" style={{background: background_color}}>
                            <Button name='clear' disable={this.state.text} action={this.clearInput} />
                            <div className='logo'><img src={logo} className='img' /></div>
                            <Button name='run' disable={this.state.text} action={this.openFullScreen} />
                        </div>
                        <textarea 
                            className="input" 
                            style={{background: background_color}} 
                            onChange={this.handleChange} 
                            placeholder={this.state.placeholder} 
                            type="text" 
                            value={this.state.text} />
                        <div className='store'>
                            <img src="https://devimages-cdn.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" className='store_badge' />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Get_it_on_Google_play.svg" className='store_badge'/>
                        </div>
                        <div className="credits">By 🙍 <a href="http://google.com" style={{color: '#ffffff'}}>Natasha Andreeva</a> and 🙇 <a href="http://google.com" style={{color: '#ffffff'}}>Pasha Ugamochi</a> with love from St. Petersburg, Russia.</div>
                    </div>
                </Swipe>
                )
        } else {
            return (
               <Swipe
                    onSwipeLeft={this.onSwipeLeft}
                    onSwipeRight={this.onSwipeRight} 
                    allowMouseEvents={true} >
                    <div className='fullscreen' style={{backgroundColor: background_color}} >
                    {/*height: 20% on the header ain't a neato solution but since we won't have rotation on web and won't have landscape mode on mobile it'll do*/}
                        <div className="header" style={{background: background_color, flexDirection: 'row-reverse'}}>
                            <Button name='close' disable={this.state.text} action={this.closeFullScreen} />
                        </div>
                        <div style={{width: '98%', flex: 1, margin: 'auto'}}>
                        <div style={{display: 'table', width: '100%', height: '100%'}}>
	                        <Textfit max={500} style={{display: 'table-cell', height: '100%', width: '100%', textAlign: 'center', lineHeight: 1, verticalAlign: 'middle'}}>
	                          {this.state.text}
	                        </Textfit>
                        </div>
                        </div>
                    </div>
                </Swipe> 
            )
        }
    }
}

export default App;
