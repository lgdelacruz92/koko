import "./App.css";
import MapEditor from "./map-editor";

function App() {

    return (
        <div className="App">
            <div className="main-panel">
            <MapEditor/>
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
