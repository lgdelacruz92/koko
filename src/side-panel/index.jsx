import './side-panel.css';

export default function SidePanel({ show }) {

    // Kinda shitty. I can probably manually build something better.
    return <div className={"side-panel" + (show ? ' show-side-panel' : '')}> 
    </div>
}