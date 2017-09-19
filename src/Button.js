import React from 'react';
import trash from './img/trash.svg';
import megaphone from './img/megaphone.svg';
import close from './img/close-browser.svg';

export class Button extends React.Component {

    render() {
        let assets = {
            'run': megaphone,
            'clear': trash,
            'close': close
        };

        if (this.props.disable === '') {
            return (
                <div className={'btn '+this.props.name}> 
                    <img alt={this.props.name} src={assets[this.props.name]} className='img' style={{opacity: '0.75'}} />  
                </div>
                )
        } else {
            return (
                <div className={'btn '+this.props.name} onClick={this.props.action}> 
                    <img alt={this.props.name} src={assets[this.props.name]} className='img' />  
                </div>
                )
        }
    }
}