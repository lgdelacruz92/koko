import './map-editor.css';
import Map from '../map';
import MapControls from '../map-controls';

export default function MapEditor({ mapId }) {
    return <div className="map-editor">
        <MapControls />
        <Map id={mapId}/>
    </div>
}