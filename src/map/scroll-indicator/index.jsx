import './scroll-indicator.css';
import { useEffect, useRef } from 'react';
import PlusSign from './plus-sign';
import MinusSign from './minus-sign';

function ScrollIndicator({ mapBoxContainerRef, valueUpdate }) {
    const ballRef = useRef(null);
    const minVal = 0;
    const maxVal = 100;
    
    useEffect(() => {
        valueUpdate(maxVal);
        let value = maxVal;
        ballRef.current.setAttribute('style', `right: ${value}%`);

        mapBoxContainerRef.current.addEventListener('wheel', (e) => {
            const delta = parseInt(Math.sign(e.deltaY));
            if (value + delta < maxVal + 1 && delta > 0) {
                value += delta;
                valueUpdate(value);
                ballRef.current.setAttribute('style', `right: ${value}%`);
            } else if (value + delta > minVal - 1 && delta < 0) {
                value += delta;
                valueUpdate(value);
                ballRef.current.setAttribute('style', `right: ${value}%`);
            }
        });
    }, [mapBoxContainerRef, valueUpdate])

    return (
        <div className="scroll-indicator">
        {/* This is needed to allow relative position inside scroll indicator */}
            <div className="scroll-container">
                <div className="line"></div>
                <div className="ball" ref={ballRef}></div>
            </div>
        </div>
    );
}

export default ScrollIndicator;