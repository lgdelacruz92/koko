import './map-controls.css'
export default function MapControls() {
    const dummyPayload = {
        states: [
            {
                name: 'US',
                toggled: false,
            },
            {
                name: 'Florida',
                toggled: false,
            },
            {
                name: 'California',
                toggled: false,
            }
        ],
    }

    const formAction = e => {
        console.log(e);
        e.preventDefault();
    }

    return <div className="map-controls">
        <form onSubmit={formAction}>
            <label htmlFor="cars">:</label>
            <select name="cars" id="cars">
            {dummyPayload.states.map((p,i) => {
                return <option key={i} value={p.name}>{p.name}</option>
            })}
            </select>
            <input type="submit" value="Submit" />
        </form>
    </div>
}