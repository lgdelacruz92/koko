import { useEffect, useRef } from 'react';
import ScrollIndicator from './scroll-indicator';
import './map.css';

function Map() {
    const mapViewBox = useRef(null);
    const mapBoxContainer = useRef(null);
    const minZoom = 1000;
    const maxZoom = 300;

    const onScrollUpdate = (val) => {
        const viewBoxAttr = mapViewBox.current.getAttribute('viewBox');
        const viewBoxDim = viewBoxAttr.split(' ');

        // map val to min max zooms
        const range = minZoom - maxZoom; // backward but min is bigger
        const rangeVal = range * (val / 100); // 100 is scroll indicator max
        const zoomVal = rangeVal + maxZoom; // offset it based on min
        const newViewBoxDim = [viewBoxDim[0], viewBoxDim[1], zoomVal, zoomVal];
        mapViewBox.current.setAttribute('viewBox', newViewBoxDim.join(' '));
    }

    useEffect(() => {
        let mouseDown = false;
        let startX = 0;
        let startY = 0;
        let startViewBoxX = 0;
        let startViewBoxY = 0;

        mapViewBox.current.addEventListener('mousedown', e => {
            mouseDown = true;
            startX = e.clientX;
            startY = e.clientY;
            const attr = mapViewBox.current.getAttribute('viewBox');
            const attrArray = attr.split(' ');
            startViewBoxX = parseInt(attrArray[0]);
            startViewBoxY = parseInt(attrArray[1]);
        });
        mapViewBox.current.addEventListener('mousemove', e => {
            if (mouseDown) {
                const attr = mapViewBox.current.getAttribute('viewBox');
                const attrArray = attr.split(' ');
                const changeX = parseInt(e.clientX - startX);
                const changeY = parseInt(e.clientY - startY);
                mapViewBox.current.setAttribute('viewBox', `${-changeX + startViewBoxX} ${-changeY + startViewBoxY} ${attrArray[2]} ${attrArray[3]}`);
            }
        });
        mapViewBox.current.addEventListener('mouseup', e => {
            mouseDown = false;
        });

        // in case mapViewBox failed to put mouse up
        const body = document.querySelector('body');
        body.addEventListener('mouseup', e => {
            mouseDown = false;
        });

        
        fetch(process.env.REACT_APP_SERVER)
            .then(res => {
                return res.text();
            })
            .then(text => {
                const tempEl = document.createElement('div');
                tempEl.innerHTML = text;
                const svgEl = tempEl.querySelector('svg');
                const svgPaths = svgEl.innerHTML;
                mapViewBox.current.innerHTML = svgPaths;
                mapViewBox.current.setAttribute('fill', 'none');
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                if (mapViewBox.current.innerHTML === '') {
                    console.log('error')
                }
            })
    },[]);

    return (
        <div className="map-container" ref={mapBoxContainer}>
            <ScrollIndicator mapBoxContainerRef={mapBoxContainer} valueUpdate={onScrollUpdate}></ScrollIndicator>
            <svg className="map-view-box" ref={mapViewBox} viewBox="0 0 1000 1000" fill="#000">
                <text className="please-wait-message" text-anchor="middle" x="50%" y="50%">Please wait...</text>
            </svg>
        </div> 
    )
}

export default Map
