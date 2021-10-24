import "./App.css";
import Map from "./map";
import Nav from './nav';
import SidePanel from './side-panel';
import UploadFile from './upload-file';
import { useState, useEffect } from 'react';

function App() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [features, setFeatures] = useState([]);
    const [mapId, setMapId] = useState('');
    const [showUploadFile, setShowUploadFile] = useState(false);

    const hamburgerClick = () => {
        setShowSidePanel(!showSidePanel);
    }

    const searchAction = (searchQuery) => {
        // console.log(searchQuery);
        fetch(process.env.REACT_APP_SERVER + '/search?query=' + searchQuery)
            .then(res => res.json())
            .then(json => {
                setFeatures(json.response);
            })
            .catch(err => console.log(err));
    }

    const handleClickAction = id => {
        setMapId(`${id}`);
    }

    const handleUploadClick = () => {
        setShowUploadFile(!showUploadFile);
    }

    useEffect(() => {
        const uploadFileElement = document.querySelector('.App #upload-file');
        const bodyOutsideClickHandler = () => {
            uploadFileElement.remove();
        }
        if (uploadFileElement) {
            document.body.addEventListener('click', bodyOutsideClickHandler);
        } else {
            document.body.removeEventListener('click', bodyOutsideClickHandler);
        }

        return () => {
            document.body.removeEventListener('click', bodyOutsideClickHandler);
        }
    })

    return (
        <div className="App">
            <SidePanel show={showSidePanel} data={{ features }} clickAction={id => handleClickAction(id) }/>
            <div className="main-panel">
                <Nav hamburgerClick={hamburgerClick} 
                    searchAction={searchAction}
                    uploadClick={handleUploadClick}
                />
                <Map id={mapId}/>
                <div className="state-info-popup">
                    <div id="state">CA</div>
                    <div id="county">Santa Barbara</div>
                    <div id="value">Value</div>
                </div>
            </div>
            {
                showUploadFile ? <div id="upload-file">
                    <UploadFile />
                </div>

                :

                ''
            }
            
        </div>
    );
}

export default App;
