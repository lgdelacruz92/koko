import './side-panel.css';
import Feature from './feature';
import { useRef, useEffect } from 'react';

export default function SidePanel({ show, data }) {
    const sidePanelRef = useRef(null);
    const sidePanelContainerRef = useRef(null);

    useEffect(() => {
        const sidePanelChanged = e => {
            const sidePanel = e.filter(observed => {
                return observed.target === sidePanelRef.current
            })[0];
            if (sidePanel.contentRect['width'] > 250) {
                sidePanelContainerRef.current.setAttribute('style', '');
            } else {
                sidePanelContainerRef.current.setAttribute('style', 'display: none');
            }
        }
        new ResizeObserver(sidePanelChanged).observe(sidePanelRef.current);
    }, []);

    return <div className={"side-panel" + (show ? ' show-side-panel' : '')} ref={sidePanelRef}>
        <div ref={sidePanelContainerRef}>
            { data.features.map(feature => {
                return <Feature
                    key={feature.id}
                    title={feature.title}
                    description={feature.description}
                />
            })}
        </div>
    </div>
}