import "./App.css";
import MapEditor from "./map-editor";
import Nav from './nav';
import SidePanel from './side-panel';
import UploadFile from './upload-file';
import { useState } from 'react';
import axios from 'axios';

function App() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [features, setFeatures] = useState([]);
    const [showUploadFile, setShowUploadFile] = useState(false);
    const [majorError, setMajorError] = useState(false);

    const hamburgerClick = () => {
        setShowSidePanel(!showSidePanel);
    }

    const searchAction = (searchQuery) => {
        // console.log(searchQuery);
        fetch(process.env.REACT_APP_SERVER + '/search?query=' + searchQuery)
            .then(res => res.json())
            .then(json => {
                setFeatures(json.response);
                setShowSidePanel(true);
            })
            .catch(err => console.log(err));
    }

    const handleUploadClick = e => {
        if (e.currentTarget.getAttribute('id') === 'nav-upload-button') {
            setShowUploadFile(true);
        }
    }

    const appClick = e => {
        if (showUploadFile && e.target.classList.contains('map-view-box')) {
            setShowUploadFile(false);
        }
    }

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

    return (
        <div className="App" onClick={appClick}>
            <SidePanel show={showSidePanel} data={{ features }}/>
            <div className="main-panel">
                <Nav hamburgerClick={hamburgerClick} 
                    searchAction={searchAction}
                    uploadClick={handleUploadClick}
                />
                { !majorError ? <MapEditor/> : <div>Major error happened. If this persist, please contact us.</div> }
                <div className="state-info-popup">
                    <div id="state">CA</div>
                    <div id="county">Santa Barbara</div>
                    <div id="value">Value</div>
                </div>
            </div>
            <div id="upload-file">
                {showUploadFile ? 
                    <UploadFile doneClick={doneClick}/> : <div></div>
                }
            </div>
            
        </div>
    );
}

export default App;
