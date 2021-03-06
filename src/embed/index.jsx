import './embed.css';
import { ServicesContext } from '../services/services';
import { useContext } from 'react';

export default function Embed() {
    const services = useContext(ServicesContext);

    const onClick = () => {
        services.setEmailPopUp('code');
    }

    return <div onClick={onClick} className="embed-to-your-site">
        <svg className="embed-to-your-site-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="white"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
        <span className="embed-to-your-site-text">Embed To Your Site</span>
    </div>
}

