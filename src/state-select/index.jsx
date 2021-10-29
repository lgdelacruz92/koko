import './state-select.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import BasicSelect from '../basic-select';
export default function StateSelect({ updateState, stateFips }) {
    const [states, setStates] = useState([]);
    const [stateIndex, setStateIndex] = useState(null);

    const onSelectChange = e => {
        const index = states.findIndex(s => s.name === e.target.value);
        updateState(states[index]);
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER + '/states')
            .then(res => {
                setStates([...res.data.states]);
                setStateIndex(res.data.states.findIndex(s => s.fips === stateFips));
            })
    }, [setStates, setStateIndex, stateFips])

    return <BasicSelect
        options={states}
        label="States"
        value={states.length > 0 && stateIndex !== null ? states[stateIndex].name : 'Florida'}
        handleChange={onSelectChange}/>
}

