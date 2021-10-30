import ScrollIndicator from '../map/scroll-indicator';
import '../App.css';
import './stories.css';

export default {
    title: 'Scroll Indicator',
    component: ScrollIndicator
}

export const ScrollIndicatorNormal = () => <ScrollIndicator value={30} />

export const ScrollIndicatorScrolling = () => {

    return <div style={{ background: 'lightblue', width: '100vw', height: '100vh' }}>
        <ScrollIndicator value={30} />
    </div>
} 


