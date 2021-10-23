import "./App.css";
import Map from "./map";
import Nav from './nav';

function App() {
  return (
    <div className="App">
        <div className="main-panel">
            <Nav />
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
