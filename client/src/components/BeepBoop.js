import React from 'react';
import socketIOClient from 'socket.io-client';
import ParkeringsPlads from './ParkeringsPlads';

class BeepBoop extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      pData: [],
      endpoint: "http://localhost:3001/",
      style: {
        optaget: {
          color: 'red'
        },
        ledig: {
          color: 'green'
        } 
      }
    };
    // state = {data: []};
    this.componentDidMount.bind(this);
  };

  componentDidMount() {
    // fetch('/length')
    //   .then(res => res.json())
    //   .then(data => this.setState({ data }));
    const socket = socketIOClient(this.state.endpoint);
    socket.on("openSpace", data => this.setState({ pData: data }));
  };
  
  sortData(pData) {
    if(this.state.pData[1] ){
      console.log("true");
    } else {
      console.log("false");
    }
  }

  render(){
    this.sortData(this.state.pData);
    return(
      <div>
        <p>Sloop doop im be da beep boop </p>
        <ParkeringsPlads pData = { this.state.pData[0] } style = { this.state.style }/>
        <ParkeringsPlads pData = { this.state.pData[1] } style = { this.state.style }/>
        <ParkeringsPlads pData = { this.state.pData[2] } style = { this.state.style }/>
        <ParkeringsPlads pData = { this.state.pData[3] } style = { this.state.style }/>
      </div>
    );
  }
};

export default BeepBoop;