import './map-editor.css';
import Map from '../map';
import MapControls from '../map-controls';
import UploadFile from '../upload-file';
import { useState } from 'react';
import axios from 'axios';

export default function MapEditor() {
    const [geo, setGeo] = useState(null); // initial geoid is all US states
    const [showUploadFile, setShowUploadFile] = useState(null); //
    const [majorError, setMajorError] = useState(false);


    const doneClick = data => {
        setShowUploadFile(false);

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        }

        axios.post(process.env.REACT_APP_SERVER + '/use', { data }, config)
            .then(response => {
                localStorage.setItem('session', response.data.session);
            })
            .catch(e => {
                setMajorError(true);
            });
    }

    const onUpdate = geo => {
        setGeo(geo);
    }

    const onUploadCsv = e => {
        debugger;
        if (e.currentTarget.getAttribute('id') === 'nav-upload-button') {
            setShowUploadFile(true);
        }
    }

    return <div className="map-editor">
        <MapControls onUpdate={onUpdate} onUploadCsv={onUploadCsv}/>
        { majorError ? <div>Something horrible went wrong. Please contact us.</div> : <Map geo={geo}/> }
        <div id="upload-file">
            {showUploadFile ? 
                <UploadFile doneClick={doneClick}/> : <div></div>
            }
        </div>
    </div>
}