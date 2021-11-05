import './map-editor.css';
import Map from '../map';
import MapControls from '../map-controls';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MapEditor() {
    const [geo, setGeo] = useState({ id: 51, title: 'All US Counties', type: 'County'}); // initial geoid is all US states
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');

    const onUpdate = newMapProperties => {
        if (newMapProperties.geo.id !== geo.id) {
            setGeo({...newMapProperties.geo});
        }
        else if (newMapProperties.title !== title) {
            setTitle(newMapProperties.title);
        }
        else if (newMapProperties.subtitle !== subtitle) {
            setSubtitle(newMapProperties.subtitle);
        }
    }

    useEffect(() => {
        const handleTitle = titles => {
            if (titles.title) {
                setTitle(titles.title);
            }
            if (titles.subtitle) {
                setSubtitle(titles.subtitle);
            }
        }
        console.log('rendering');
        const sessionToken = localStorage.getItem('session');

        if (sessionToken) {
            // fetch metadata
            axios.get(process.env.REACT_APP_SERVER + '/session_token_metadata/' + sessionToken)
                .then(response => {
                    const metadata = response.data;
                    handleTitle(metadata);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [geo]);

    return <div className="map-editor">
        <MapControls onUpdate={onUpdate} mapProperties={{ geo, title, subtitle }}/>
        <Map mapProperties={{ geo, title, subtitle }}/>
    </div>
}