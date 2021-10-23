import './legend.css';
import { useEffect, useRef } from 'react';

export default function Legend() {
    const maxLabelRef = useRef(null);
    const minLabelRef = useRef(null);

    useEffect(() => {
        let route = window.location.href.includes('florida') ? 'florida' : '';
        fetch(process.env.REACT_APP_SERVER + '/legend/percent/' + route)
            .then(resp => {
                return resp.json();
            })
            .then(json => {
                maxLabelRef.current.innerHTML = `<span>Max ~${json.max}%</span>`;
                minLabelRef.current.innerHTML = `<span>Min ~${json.min}%</span>`;
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