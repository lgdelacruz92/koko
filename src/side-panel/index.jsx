import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import './side-panel.css';

export default function SidePanel({ show }) {

    // Kinda shitty. I can probably manually build something better.
    return <div className={"side-panel" + (show ? ' show-side-panel' : '')}> 
        <FormControl fullWidth sx={{ m: 1 }} style={show ? { display: 'inline'} : { display: 'none' }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
            id="outlined-adornment-amount"
            onChange={e => console.log(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            />
        </FormControl>
    </div>
}