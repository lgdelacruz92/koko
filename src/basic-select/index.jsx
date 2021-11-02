import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './basic-select.css';

export default function BasicSelect({ label, options, value, handleChange }) {
  return (
    <Box sx={{ minWidth: 120 }} className="basic-selection-component">
      <FormControl fullWidth style={{ color: 'white' }}>
        <InputLabel id="selection-label" style={{ color: 'white' }}>{label}</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={value.id}
          label="Age"
          style={{ color: 'white' }}
          onChange={handleChange}
        >
            {options.map((option, i) => {
                return <MenuItem style={{ color: 'white' }} key={i} value={option.id} name={option.title}>{option.title}</MenuItem>
            })}
        </Select>
      </FormControl>
    </Box>
  );
}