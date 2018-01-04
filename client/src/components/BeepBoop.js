import React from 'react';
import socketIOClient from 'socket.io-client';
import ParkeringsPlads from './ParkeringsPlads';

class BeepBoop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pData: [],
      endpoint: 'http://localhost:3001/',
      style: {
        optaget: {
          color: 'red',
          backgroundColor: 'red',
          width: 100,
          height: 100,
          border: '3px solid black',
        },
        ledig: {
          color: 'green',
          backgroundColor: 'green',
          width: 100,
          height: 100,
          border: '3px solid black',
        },
        gridContainer: {
          display: 'grid',
          gridTemplateColumns: '120px 120px',
        },
      },
    };
    this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('openSpace', data => this.setState({ pData: data }));
  }

  render() {
    return (
      <div>
        <h2>Parkeringsplads:</h2>
        <div style={this.state.style.gridContainer}>
          <div>
            <ParkeringsPlads pData={this.state.pData[0]} style={this.state.style} />
            <ParkeringsPlads pData={this.state.pData[1]} style={this.state.style} />
          </div>
          <div>
            <ParkeringsPlads pData={this.state.pData[3]} style={this.state.style} />
            <ParkeringsPlads pData={this.state.pData[2]} style={this.state.style} />
          </div>
        </div>
      </div>
    );
  }
}

export default BeepBoop;
