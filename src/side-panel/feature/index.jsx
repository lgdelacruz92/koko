import './feature.css';

export default function Feature({ title, description }) {

    return <div className="feature">
        <div><span className="title">{title}</span></div>
        <div><span className="description">{description}</span></div>
    </div>

}