import './legend.css';
import { useState, useEffect } from 'react';

export default function Legend({ geo }) {
    const [values, setValues] = useState({ min: '', max: '' });
    useEffect(() => {

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