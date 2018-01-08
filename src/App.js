import React from 'react';
import { Textfit } from 'react-textfit';
import Swipe from 'react-easy-swipe';
import './App.css';
import { Button } from './Button';
import logo from './img/sa.svg';
import appstore from './img/app-store.svg';
import googleplay from './img/google-play.svg';
const defaultText = 'An ultimate app for silent communication. \nOrder at the bar from the second row. \nTalk to a friend in the crowd. \nUse your phone as a color-coded beacon.';


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: defaultText,
            placeholder: 'Type anything. \nSwipe to change background.',
            background_id: 0,
            fullscreen: false,
            backgrounds: [
                '#0000ff',
                '#FE2370',
                '#3AF4D5',
                '#090707',
                '#f9dd37'
            ],
            backgrounds_number: 4,
            orientation: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.closeFullScreen = this.closeFullScreen.bind(this);
        this.openFullScreen = this.openFullScreen.bind(this);
        this.onSwipeLeft = this.onSwipeLeft.bind(this);
        this.onSwipeRight = this.onSwipeRight.bind(this);
        this.changeOrientation = this.changeOrientation.bind(this);
        this.setDefaultText = this.setDefaultText.bind(this);
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    changeOrientation(){
        //console.log(window.screen.orientation.type)
        this.setState({fullscreen: false, orientation: window.screen.orientation.type});
    }

    clearInput() {
        this.setState({text: ''});
    }

    setDefaultText() {
        this.setState({text: defaultText});
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
        let store_badge_class

        if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) 
        {
            store_badge_class = 'store_badge safari';
        } else {
            store_badge_class = 'store_badge';
        };

        if (this.state.fullscreen === false) { 
            return (
                <Swipe
                    onSwipeLeft={this.onSwipeLeft}
                    onSwipeRight={this.onSwipeRight} 
                    allowMouseEvents={true} >
                    <div className="main" style={{backgroundColor: background_color}} > 
                        <div className="header" style={{background: background_color}}>
                            <Button name='clear' disable={this.state.text} action={this.clearInput} />
                            <div className='logo' onClick={this.setDefaultText} ><img alt='SHUT APP' src={logo} className='img' /></div>
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
                            <a href="https://itunes.apple.com/app/id1312977489"><img alt='Download on the App Store' src={appstore} className={store_badge_class} /></a>
                            <a href="https://play.google.com/store/apps/details?id=today.shutapp"><img alt='Get it on Google Play' src={googleplay} className={store_badge_class} /></a>
                        </div>
                        <div className="credits">By <span role="img" aria-label="girl">🙍</span> <a href="http://natashaa.me/" style={{color: '#ffffff'}}>Natasha Andreeva</a> and <span role="img" aria-label="bow">🙇</span> <a href="https://www.behance.net/ugamochi" style={{color: '#ffffff'}}>Pasha Ugamochi</a> with love from St. Petersburg, Russia.</div>
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
                        <div className="fullscreen_text" >
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
