import './email-popup.css';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import EmailSuccess from '../email-success'

export default function EmailPopup({ option }) {
    const [email, setEmail] = useState('');
    const [emailSuccess, setEmailSuccess] = useState(false);

    const onChange = e => {
        setEmail(e.target.value);
    }

    const onClick = () => {
        const sessionToken = localStorage.getItem('session');
        const params = {
            token: sessionToken,
            email,
        };
        axios.post(process.env.REACT_APP_SERVER + '/request', params)
            .then(() => {
                setEmailSuccess(true);
            })
            .catch(err => {
                console.error(err);
            })
    }

    return <div className="email-popup">
        {!emailSuccess ?
        <div className="send-me-email-container">
                <div>
                    <span>Enter your email and we will send you your {option === 'png' ? 'PNG' : 'code'} soon.</span>
                </div>
                <TextField onChange={onChange} classes={{ root: 'email-text-field' }} id="email-input" placeholder="Email" variant="standard" inputProps={{ style: { textAlign: 'center', color: 'white', class: 'email-input' }}}/>
                <Button onClick={onClick} className="email-send-button" variant="outlined">{option === 'png'? 'Send me png' : 'Send me code'}</Button>
            </div>
        : 
        <EmailSuccess email={email}/> }
    </div>
}

