import './map-controls.css'
import GeoSelection from '../geo-selection';
import UploadCountyData from '../upload-csv';

export default function MapControls({ onUpdate, geo }) {

    return <div className="map-controls">
        <div className="control-block">
            <UploadCountyData csvUploaded={() => onUpdate(geo)} />
        </div>
        <div className="control-block">
            <GeoSelection onUpdate={onUpdate} />
        </div>
    </div>
}