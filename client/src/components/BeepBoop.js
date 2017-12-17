import React from 'react';

class BeepBoop extends React.Component{
  state = {data: []};
  constructor(props) {
    super(props);
    // state = {data: []};
    this.componentDidMount.bind(this);
  };

  componentDidMount() {
    fetch('/length')
      .then(res => res.json())
      .then(data => this.setState({ data }));
  };
  
  render(){
    return(
      <div>
        <p>Sloop doop im be da beep boop </p>
        <h1>{this.state.data}</h1>
      </div>
    );
  }
};

export default BeepBoop;