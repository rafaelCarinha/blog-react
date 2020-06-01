import React from 'react';
import './App.css';
import Navigation from './components/Navbar';
import Routes from './Routes';

function App() {

    return (
        <React.Fragment>
            <div className="App">
                <Navigation />
                <Routes />
            </div>
        </React.Fragment>

    );
}

export default App;