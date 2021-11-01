import './map-editor.css';
import Map from '../map';
import MapControls from '../map-controls';
import { useState } from 'react';

export default function MapEditor() {
    const [geo, setGeo] = useState(null); // initial geoid is all US states

    const onUpdate = geo => {
        console.log(geo);
        setGeo(geo);
    }

    return <div className="map-editor">
        <MapControls onUpdate={onUpdate}/>
        <Map geo={geo}/>
    </div>
}