import './map-controls.css'
import GeoSelection from '../geo-selection';
import UploadCsv from '../upload-csv';

export default function MapControls({ onUpdate, onUploadCsv }) {

    return <div className="map-controls">
        <GeoSelection onUpdate={onUpdate} />
        <UploadCsv uploadClick={onUploadCsv} />
    </div>
}