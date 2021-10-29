import './map-editor.css';
import Map from '../map';
import MapControls from '../map-controls';
import { useState } from 'react';

export default function MapEditor({ stateFips }) {
    const [currentStateFips, setCurrentStateFips] = useState(stateFips);
    const onUpdateFips = state => {
        setCurrentStateFips(state.fips);
    }

    return <div className="map-editor">
        <MapControls updateState={onUpdateFips} stateFips={currentStateFips}/>
        <Map stateFips={currentStateFips}/>
    </div>
}