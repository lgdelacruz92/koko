import './map-editor.css';
import Map from '../map';
import MapControls from '../map-controls';
import { useState } from 'react';

export default function MapEditor() {
    const [mapProperties, setMapProperties] = useState({
        geo: { id: 51, title: 'All US Counties', type: 'County'},
        title: '',
        subtitle: ''
    }); // initial geoid is all US states

    const onUpdate = newMapProperties => {
        const currentProp = JSON.stringify(mapProperties);
        const newProp = JSON.stringify(newMapProperties);
        if (currentProp !== newProp) {
            setMapProperties(newMapProperties);
        }
    }

    return <div className="map-editor">
        <MapControls onUpdate={onUpdate} mapProperties={mapProperties}/>
        <Map mapProperties={mapProperties}/>
    </div>
}