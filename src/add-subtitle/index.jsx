import './add-subtitle.css';
import TextField from '@mui/material/TextField';
import { updateSubTitle } from '../utils/utils';

export default function AddSubtitle({ onSubtitleUpdate }) {
    const onChange = e => { 
        updateSubTitle(e.target.value);
        onSubtitleUpdate(e);
    }
    return <TextField
        className="add-subtitle"
        label="Subtitle"
        variant="outlined"
        onChange={onChange}
    />
}

