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
            return <img alt={this.props.name} src={assets[this.props.name]} className={'btn '+this.props.name} style={{opacity: '0.75'}} />  
        } else {
            return <img alt={this.props.name} src={assets[this.props.name]} className={'btn '+this.props.name} onClick={this.props.action} />  
        }
    }
}