import './legend.css';
import { useEffect, useRef } from 'react';

export default function Legend() {
    const maxLabelRef = useRef(null);
    const minLabelRef = useRef(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER + '/legend')
            .then(resp => {
                return resp.json();
            })
            .then(json => {
                maxLabelRef.current.innerHTML = `<span>Max ~${json.max}%</span>`;
                minLabelRef.current.innerHTML = `<span>Max ~${json.min}%</span>`;
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return <div className="legend-container">
        <div className="legend-view">
            <div ref={maxLabelRef} className="max-label">
                <span>Max</span>
            </div>
            <div ref={minLabelRef} className="min-label">
                <span>Min</span>
            </div>
        </div>
    </div>;
}