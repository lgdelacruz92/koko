import './state-select.css';
import { useState } from 'react';

import BasicSelect from '../basic-select';
export default function StateSelect() {
    const dummyPayload = {
        states: [
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

    const [stateIndex, setStateIndex] = useState(0);

    const onSelectChange = e => {
        const index = dummyPayload.states.findIndex(s => s.name === e.target.value);
        setStateIndex(index);
    }

    return <BasicSelect options={dummyPayload.states} label="States" value={dummyPayload.states[stateIndex].name} handleChange={onSelectChange}/>
}

