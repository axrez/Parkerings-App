import React from 'react';
import PropTypes from 'prop-types';

const style = {
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
};

const ParkeringsPlads = ({ pData }) => {
  const pStyle = pData ? style.ledig : style.optaget;
  return (<h1 style={pStyle}>{ JSON.stringify(pData) }</h1>);
};

ParkeringsPlads.propTypes = {
  pData: PropTypes.bool.isRequired,
};

export default ParkeringsPlads;
