import React from 'react';
import socketIOClient from 'socket.io-client';
import ParkeringsPlads from './ParkeringsPlads';

class BeepBoop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pData: [],
      endpoint: 'http://10.112.226.2:3001/',
      style: {
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
            <ParkeringsPlads pData={this.state.pData[0]} />
            <ParkeringsPlads pData={this.state.pData[1]} />
          </div>
          <div>
            <ParkeringsPlads pData={this.state.pData[3]} />
            <ParkeringsPlads pData={this.state.pData[2]} />
          </div>
        </div>
      </div>
    );
  }
}

export default BeepBoop;
