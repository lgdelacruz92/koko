import './scroll-indicator.css';
import { useEffect } from 'react';

function ScrollIndicator({ mapBoxContainerRef, valueUpdate }) {
    const minVal = 0;
    const maxVal = 100;
    
    useEffect(() => {
        valueUpdate(maxVal);
        let value = maxVal;
        mapBoxContainerRef.current.addEventListener('wheel', (e) => {
            const delta = parseInt(Math.sign(e.deltaY));
            if (value + delta < maxVal + 1 && delta > 0) {
                value += delta;
                valueUpdate(value);
            } else if (value + delta > minVal - 1 && delta < 0) {
                value += delta;
                valueUpdate(value);
            }
        });
    }, [mapBoxContainerRef, valueUpdate])

    return (
        <div className="scroll-indicator">
            {/* This is needed to allow relative position inside scroll indicator */}
            <div className="scroll-container">
                <div className="line"></div>
                <div className="ball"></div>
            </div>
        </div>
    );
}

export default ScrollIndicator;