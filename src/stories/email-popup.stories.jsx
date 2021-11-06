import EmailPopup from '../email-popup';
import '../App.css';
import './stories.css';

export default {
    title: 'Email Popup',
    component: EmailPopup
}

export const EmailPopupPng = () => <EmailPopup option="png"/>

export const EmailPopupCode = () => <EmailPopup option="code"/>
