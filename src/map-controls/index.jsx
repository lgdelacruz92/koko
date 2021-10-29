import './map-controls.css'
import StateSelect from '../state-select';

export default function MapControls({ updateState, stateFips }) {

    return <div className="map-controls">
        <StateSelect updateState={updateState} stateFips={stateFips}/>
    </div>
}