import './upload-file.css';
import { Paper, Button } from '@mui/material';


export default function UploadFile() {
    return <Paper className="upload-file-dialog" elevation={3}>
        <div className="workflow">
            <div className="workflow-item">
                <div className="content">workflow 1</div>
            </div>
        </div>
        <div className="actions">
            <span><Button>Back</Button></span>
            <span><Button onClick={() => {

            }}>Next</Button></span>
        </div>
    </Paper>;
}