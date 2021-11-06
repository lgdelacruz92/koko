import './map-controls.css'
import GeoSelection from '../geo-selection';
import UploadCountyData from '../upload-csv';
import AddTitle from '../add-title';
import AddSubtitle from '../add-subtitle';
import SaveAsPng from '../save-as-png';
import Embed from '../embed';
import LinkToCsvTutorial from '../link-to-csv-tutorial';

export default function MapControls({ onUpdate, mapProperties }) {

    const _onUpdate = (controlBlock, e) => {
        if (mapProperties) {
            if (controlBlock === 'csv-upload') {
                // Needed to update the map
                const newMapProperties = { ...mapProperties };
                newMapProperties.geo = {};
                onUpdate(newMapProperties);
            }
            else if (controlBlock === 'geo-selection') {
                const newMapProperties = { ...mapProperties };
                newMapProperties.geo = e;
                onUpdate(newMapProperties)
            } else if (controlBlock === 'add-title') {
                const newMapProperties = { ...mapProperties };
                newMapProperties.title = e;
                onUpdate(newMapProperties);
            } else if (controlBlock === 'add-subtitle') {
                const newMapProperties = { ...mapProperties };
                newMapProperties.subtitle = e;
                onUpdate(newMapProperties);
            }
        }
    }

    return <div className="map-controls">
        <div className="control-block">
            <UploadCountyData csvUploaded={() => _onUpdate('csv-upload')} />
        </div>
        <div className="control-block">
            <LinkToCsvTutorial/>
        </div>
        <div className="control-block">
            <GeoSelection onUpdate={e => _onUpdate('geo-selection', e)} />
        </div>
        <div className="control-block">
            <AddTitle onTitleUpdate={e => _onUpdate('add-title',e.target.value)}/>
        </div>
        <div className="control-block">
            <AddSubtitle onSubtitleUpdate={e => _onUpdate('add-subtitle',e.target.value)}/>
        </div>
        <div className="control-block">
            <SaveAsPng />
        </div>
        <div className="control-block">
            <Embed />
        </div>
    </div>
}