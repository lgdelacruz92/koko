import './legend.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Legend({ geo }) {
    const [values, setValues] = useState({ min: '', max: '' });
    useEffect(() => {
        const sessionToken = localStorage.getItem('session');
        axios.get(process.env.REACT_APP_SERVER + '/legend/' + sessionToken)
            .then(res => {
                setValues(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [geo]);

    return <div className="legend-container">
        <div className="legend-view">
            <div className="max-label">
                <span>{values.max}</span>
            </div>
            <div className="min-label">
                <span>{values.min}</span>
            </div>
        </div>
    </div>;
}