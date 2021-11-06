import './email-success.css';
export default function EmailSuccess({ email }) {
    return <div className="email-success">
        <span className="email-success">Thank you {email}. We'll be sure to email you shortly.</span>
    </div>
}

