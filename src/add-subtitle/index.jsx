import './add-subtitle.css';
import TextField from '@mui/material/TextField';

export default function AddSubtitle({ onSubtitleUpdate }) {
    return <TextField
        id="outlined-basic"
        label="Subtitle"
        variant="outlined"
        onChange={onSubtitleUpdate}
    />
}

