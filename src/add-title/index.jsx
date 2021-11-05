import './add-title.css';
import TextField from '@mui/material/TextField';
import { updateTitle } from '../utils/utils';

export default function AddTitle({ onTitleUpdate }) {
    const onChange = e => {
        updateTitle(e.target.value);
        onTitleUpdate(e);
    }
    return <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        onChange={onChange}
    />
}

