import "./App.css";
import Map from "./map";
import Nav from './nav';
import SidePanel from './side-panel';
import { useState } from 'react';

function App() {
    const [showSidePanel, setShowSidePanel] = useState(false);

    const hamburgerClick = () => {
        setShowSidePanel(!showSidePanel);
    }

    return (
        <div className="App">
            <SidePanel show={showSidePanel} />
            <div className="main-panel">
                <Nav hamburgerClick={hamburgerClick}/>
                <Map />
                <div className="state-info-popup">
                    <div id="state">CA</div>
                    <div id="county">Santa Barbara</div>
                    <div id="value">Value</div>
                </div>
            </div>
        </div>
    );
}

export default App;
