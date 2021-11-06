import './embed.css';
import { useContext, useEffect } from 'react';
import { ServicesContext  } from '../services/services';

export default function Embed() {
    const services = useContext(ServicesContext);

    const onClick = e => {
        services.setState(services.state + 1);
    }

    useEffect(() => {
        console.log('rendering embed');
    },[services.state])

    return <div className="embed-to-your-site" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="white"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
        <span>Embed To Your Site</span>
    </div>
}

