import './map-editor.css';
import Map from '../map';

export default function MapEditor({ mapId }) {
    return <div className="map-editor">
        <Map id={mapId}/>
    </div>
}