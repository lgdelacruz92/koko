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

    const searchAction = (searchQuery) => {
        console.log(searchQuery);
    }

    return (
        <div className="App">
            <SidePanel show={showSidePanel} data={{ features: [] }}/>
            <div className="main-panel">
                <Nav hamburgerClick={hamburgerClick} searchAction={searchAction}/>
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
