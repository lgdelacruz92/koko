import './map-controls.css'
import GeoSelection from '../geo-selection';

export default function MapControls({ onUpdate }) {

    return <div className="map-controls">
        <GeoSelection onUpdate={onUpdate} />
    </div>
}