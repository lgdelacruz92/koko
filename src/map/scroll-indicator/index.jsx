import './scroll-indicator.css';
import { useEffect, useRef } from 'react';

function ScrollIndicator({ mapBoxContainerRef, valueUpdate }) {
    const ballRef = useRef(null);
    const lineRef = useRef(null);
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

        const lineRect = lineRef.current.getBoundingClientRect();
        const lineXMin = lineRect.x;
        const lineXMax = lineRect.x + lineRect.width;
        let mouseDown = false;
        ballRef.current.addEventListener('mousedown', e => {
            mouseDown = true;
        });

        document.body.addEventListener('mousemove', e => {
            if (mouseDown && lineXMin <= e.clientX && e.clientX <= lineXMax) {
                const valPx = e.clientX - lineXMin;
                const percentOffset = (valPx / (lineXMax - lineXMin)) * 100; // percentage moved
                const percentFromRight = parseInt(100 - percentOffset);
                valueUpdate(percentFromRight);
                ballRef.current.setAttribute('style', `right: ${percentFromRight}%`);
            } 
        });

        ballRef.current.addEventListener('mouseup', e => {
            mouseDown = false;
        });

        document.body.addEventListener('mouseup', e => {
            mouseDown = false;
        });
    }, [mapBoxContainerRef, valueUpdate])

    return (
        <div className="scroll-indicator">
        {/* This is needed to allow relative position inside scroll indicator */}
            <div className="scroll-container">
                <div className="line" ref={lineRef}></div>
                <div className="ball" ref={ballRef}></div>
            </div>
        </div>
    );
}

export default ScrollIndicator;