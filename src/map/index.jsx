import { useEffect, useRef } from 'react';
import ScrollIndicator from './scroll-indicator';
import Legend from './legend';
import ZoomOut from './zoom-out';
import './map.css';

function popUp(e, json) {
    if (window.popupTimeout) {
        clearTimeout(window.popupTimeout);
    }
    const popup = document.querySelector('.state-info-popup');
    popup.setAttribute('style', [
        'display: inline-block',
        `top: ${e.clientY}px`,
        `left: ${e.clientX}px`,
        'transform: translate(0%, -150%)'
    ].join(';'));

    // Update the values
    popup.querySelector('#state').innerText = json.state_name;
    popup.querySelector('#county').innerText = json.county_name;
    popup.querySelector('#value').innerText = `${json.value}%`;

    window.popupTimeout = setTimeout(() => {
        popup.setAttribute('style', 'display: none');
    }, 2000);
}

function Map({ id }) {
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

    const onZoomOutClick = e => {
        mapViewBox.current.setAttribute('viewBox', '0 0 1000 1000');
    }

    useEffect(() => {
        let mouseDown = false;
        let startX = 0;
        let startY = 0;
        let startViewBoxX = 0;
        let startViewBoxY = 0;

        const mapViewBoxEl = mapViewBox.current;

        // Actions for cleanup
        const mouseDownAction =  e => {
            mouseDown = true;
            startX = e.clientX;
            startY = e.clientY;
            const attr = mapViewBoxEl.getAttribute('viewBox');
            const attrArray = attr.split(' ');
            startViewBoxX = parseInt(attrArray[0]);
            startViewBoxY = parseInt(attrArray[1]);
        }

        const mouseMoveAction = e => {
            if (mouseDown) {
                const attr = mapViewBoxEl.getAttribute('viewBox');
                const attrArray = attr.split(' ');
                const changeX = parseInt(e.clientX - startX);
                const changeY = parseInt(e.clientY - startY);
                mapViewBoxEl.setAttribute('viewBox', `${-changeX + startViewBoxX} ${-changeY + startViewBoxY} ${attrArray[2]} ${attrArray[3]}`);
                mapViewBoxEl.setAttribute('style', 'cursor: grab');
            }
        }

        const mouseUpAction = e => {
            mouseDown = false;
            mapViewBoxEl.setAttribute('style', '');
        }

        // Attach event listeners
        mapViewBoxEl.addEventListener('mousedown', mouseDownAction);
        mapViewBoxEl.addEventListener('mousemove', mouseMoveAction);
        mapViewBoxEl.addEventListener('mouseup', mouseUpAction);

        // in case mapViewBox failed to put mouse up
        const body = document.querySelector('body');
        body.addEventListener('mouseup', mouseUpAction);

        // event callback for paths
        const pathEventCallback = e => {
            const fips = e.target.getAttribute('id');
            const state_fips = fips.substring(0, 2);
            const county_fips = fips.substring(2);
            fetch(process.env.REACT_APP_SERVER + `/state/${state_fips}/county/${county_fips}`)
                .then(resp => {
                    return resp.json();
                })
                .then(json => {
                    popUp(e, json);
                })
                .catch(e => {
                    console.log(e);
                })
        }

        fetch(process.env.REACT_APP_SERVER + '/svgs/' + id)
            .then(res => {
                return res.json();
            })
            .then(json => {
                mapViewBoxEl.innerHTML = json.svg.svg;
                mapViewBoxEl.setAttribute('fill', 'none');

                const pathEls = mapViewBoxEl.querySelectorAll('path');
                pathEls.forEach(pathEl => {
                    pathEl.addEventListener('mouseover', pathEventCallback);
                });
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                if (mapViewBoxEl.innerHTML === '') {
                    console.log('error')
                }
            })

        return () => {
            // clean event listeners
            const pathEls = mapViewBoxEl.querySelectorAll('path');
            pathEls.forEach(pathEl => {
                pathEl.removeEventListener('mouseover', pathEventCallback);
            });

            // clean mapViewBoxEl listeners
            mapViewBoxEl.removeEventListener('mousedown', mouseDownAction);
            mapViewBoxEl.removeEventListener('mousemove', mouseMoveAction);
            mapViewBoxEl.removeEventListener('mouseup', mouseUpAction);

            // clean event listener on body
            body.removeEventListener('mouseup', mouseUpAction);
        }
    },[id]);

    return (
        <div className="map-container" ref={mapBoxContainer}>
            <ScrollIndicator mapBoxContainerRef={mapBoxContainer} valueUpdate={onScrollUpdate}></ScrollIndicator>
            <Legend />
            <svg className="map-view-box" ref={mapViewBox} viewBox="0 0 1000 1000" fill="#000">
            </svg>
            <ZoomOut onClick={onZoomOutClick}/>
        </div> 
    )
}

export default Map
