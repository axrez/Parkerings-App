import React from 'react';

class ParkeringsPlads extends React.Component {


    render(){
        let style;
        if(this.props.pData){
            style = this.props.style.ledig.color;
        } else {
            style = this.props.style.optaget.color;
        }

        return(<h1 style={{ color: style }}>{ JSON.stringify(this.props.pData) }</h1>);
    }
}

export default ParkeringsPlads;