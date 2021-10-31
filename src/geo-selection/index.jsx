import './geo-selection.css';
import BasicSelect from '../basic-select';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function GeoSelection({ onUpdate, initialValue }) {
    const [options, setOptions] = useState([{ id: 51, title: 'All US Counties', type: 'County'}]);
    const [selected, setSelected] = useState({ id: 51, title: 'All US Counties', type: 'County'});

    const onSelect = e => {
        const index = options.findIndex(o => o.id === e.target.value);
        if (index > -1) {
            setSelected(options[index]);
        }
    }

    useEffect(() => {
        const getList = async () => {
            const response = await axios.get(process.env.REACT_APP_SERVER + '/geo');
            setOptions(response.data);
        }
        getList();
    }, []);

    useEffect(() => {
        const startOptionIndex = initialValue ? initialValue : 0;
        if (options.length > 0) {
            setSelected(options[startOptionIndex]);
        }
    }, [options, initialValue])

    useEffect(() => {
        onUpdate(selected);
    }, [onUpdate, selected])

    return <BasicSelect
    options={options}
    label="Geographies"
    value={selected}
    handleChange={onSelect}/>
}

