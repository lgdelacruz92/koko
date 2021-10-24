import './feature.css';

export default function Feature({ title, description, clickAction }) {
    return <div className="feature" onClick={clickAction}>
        <div><span className="title">{title}</span></div>
        <div><span className="description">{description}</span></div>
    </div>

}