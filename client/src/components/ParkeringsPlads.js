import React from 'react';

class ParkeringsPlads extends React.Component {
    constructor(props){
        super(props);

    }
    
    render(){
        let style 
        if(this.props.pData){
            style = this.props.style.ledig;
        } else {
            style = this.props.style.optaget;
        }
        return(<h1 style={ style }>{ JSON.stringify(this.props.pData) }</h1>);
    }
}

export default ParkeringsPlads;