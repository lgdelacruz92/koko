import './add-title.css';
import TextField from '@mui/material/TextField';

export default function AddTitle({ onTitleUpdate }) {
    return <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        onChange={onTitleUpdate}
    />
}

