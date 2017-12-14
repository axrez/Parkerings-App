import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
// import { BrowserRouter } from '../../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/react-router-dom';


class Index extends React.Component {
    render(){
        return(
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        );
    };
};

ReactDOM.render(
    <Index />,
    document.getElementById('root')
);