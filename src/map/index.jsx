import { useEffect, useState, useRef } from 'react';
import ScrollIndicator from './scroll-indicator';
import ZoomControls from '../zoom-controls';
import Legend from './legend';
import ZoomOut from './zoom-out';
import MapTitle from '../map-title';
import MapSubtitle from '../map-subtitle';
import './map.css';
import axios from 'axios';
import * as d3 from 'd3';

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
    popup.querySelector('#state').innerText = json.state_name ? json.state_name : '';
    popup.querySelector('#county').innerText = json.county_name ? json.county_name : '';
    popup.querySelector('#value').innerText = json.percent ? `${json.percent}%` : '';

    window.popupTimeout = setTimeout(() => {
        popup.setAttribute('style', 'display: none');
    }, 2000);
}

function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

const calcColor = (val, max_val) => {
    const limit = 120;
    return limit - Math.floor(val * limit / max_val);
}

function Map({ mapProperties }) {
    const minZoom = 1060;
    const maxZoom = 300;

    const initialViewBox = `0 0 ${minZoom} ${minZoom}`

    const mapViewBox = useRef(null);
    const [zoomVal, setZoomVal] = useState(0);
    const [viewBox, setViewBox] = useState(initialViewBox);

    const onRecenterClick = () => {
        setViewBox(initialViewBox);
    }

    // event callback for paths
    const pathEventCallback = e => {
        const properties = JSON.parse(e.target.getAttribute('data-properties'));
        popUp(e, properties);
    }

    const handleMouseMove = e => {
        const fips = e.target.getAttribute('id');
        if (e.target.tagName.toLowerCase() === 'path' && fips && fips.length === 5) {
            pathEventCallback(e);
        }
    }

    const onZoomOutClick = () => {
        if (zoomVal - 5 >= 0) {
            setZoomVal(zoomVal - 5); // Zoom out 5 units
        }
    }

    const onZoomInClick = () => {
        if (zoomVal + 5 <= 100) {
            setZoomVal(zoomVal + 5); // Zoom in 5 units
        }
    }

    useEffect(() => {
        const updateViewBox = val => {
            const viewBoxAttr = mapViewBox.current.getAttribute('viewBox');
            const viewBoxDim = viewBoxAttr.split(' ');

            const mappedZoom = scale(val, 0, 100, minZoom, maxZoom);
            const newViewBoxDim = [viewBoxDim[0], viewBoxDim[1], mappedZoom, mappedZoom];
            setViewBox(`${newViewBoxDim.join(' ')}`);
        }

        updateViewBox(zoomVal);
    }, [zoomVal]);

    useEffect(() => {
        if (viewBox === initialViewBox) {
            setZoomVal(0);
        }
    }, [viewBox, initialViewBox])

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

        const sessionKey = localStorage.getItem('session');
        console.log('from map component', mapProperties.geo);
        if (mapProperties.geo.id && sessionKey) {
            const geo = mapProperties.geo;
            const url = `/geo/${geo.type}/geoid/${geo.id}/session/${sessionKey}`;
            axios.get(process.env.REACT_APP_SERVER + url)
            .then(res => {
                const geojson = res.data.formattedGeoJson;
                const countyMaxPercent = parseFloat(geojson.max_val);

                const map = d3.select('#map-view-box');
                map.html('');
                map.selectAll('path')
                    .data(geojson.features)
                    .enter()
                    .append('path')
                    .attr('d', d3.geoPath())
                    .attr('id', county => county.id)
                    .attr('fill', county => {
                        if (county.properties.percent) {
                            const countyPercent = parseFloat(county.properties.percent);
                            const h = calcColor(countyPercent, countyMaxPercent);
                            return `hsl(${h},90%,61%)`
                        }
                        else {
                            return 'black';
                        }
                    })
                    .attr('data-properties', county => {
                        return JSON.stringify(county.properties);
                    })
                    .attr('class', 'svg-county')
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                if (mapViewBoxEl.innerHTML === '') {
                    console.log('error')
                }
            });
        }


        return () => {
            // clean mapViewBoxEl listeners
            mapViewBoxEl.removeEventListener('mousedown', mouseDownAction);
            mapViewBoxEl.removeEventListener('mousemove', mouseMoveAction);
            mapViewBoxEl.removeEventListener('mouseup', mouseUpAction);

            // clean event listener on body
            body.removeEventListener('mouseup', mouseUpAction);
        }
    },[mapProperties.geo]);

    return (
        <div className="map-container">
            <ScrollIndicator value={zoomVal}></ScrollIndicator>
            <Legend />
            <MapTitle title={mapProperties.title}/>
            <MapSubtitle subtitle={mapProperties.subtitle}/>
            <svg id="map-view-box" ref={mapViewBox} onMouseMove={handleMouseMove} viewBox={viewBox} fill="#000">
            </svg>
            <div className="zoom-controls-container">
                <ZoomControls upAction={onZoomInClick} downAction={onZoomOutClick} />
                <ZoomOut onClick={onRecenterClick}/>
            </div>
        </div> 
    )
}

export default Map
