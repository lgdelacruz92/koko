import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ label, options, value, handleChange }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="selection-label">{label}</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={value.id}
          label="Age"
          onChange={handleChange}
        >
            {options.map((option, i) => {
                return <MenuItem key={i} value={option.id} name={option.title}>{option.title}</MenuItem>
            })}
        </Select>
      </FormControl>
    </Box>
  );
}