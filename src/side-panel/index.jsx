import './side-panel.css';
import Feature from './feature';

export default function SidePanel({ show }) {
    return <div className={"side-panel" + (show ? ' show-side-panel' : '')}>
        <Feature />
    </div>
}