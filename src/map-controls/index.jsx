import './map-controls.css'
import GeoSelection from '../geo-selection';
import UploadCsv from '../upload-csv';

export default function MapControls({ onUpdate, onUploadCsv }) {

    return <div className="map-controls">
        <div className="control-block">
            <UploadCsv uploadClick={onUploadCsv} />
        </div>
        <div className="control-block">
            <GeoSelection onUpdate={onUpdate} />
        </div>
    </div>
}