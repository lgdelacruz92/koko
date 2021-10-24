import './upload-file.css';
import { Paper, Button } from '@mui/material';
import { useState } from 'react';


export default function UploadFile() {
    const [workflowIndex, setWorkflowIndex] = useState(0);
    const workflowPicker = index => {
        if (index === 0) {
            return <div>work-flow 1</div>;
        } else if (index === 1) {
            return <div>work-flow 2</div>;
        } else if (index === 2) {
            return <div>work-flow 3</div>
        } else {
            return <div>work-flow 4</div>
        }
    }

    return <Paper className="upload-file-dialog" elevation={3}>
        <div className="workflow">
            {workflowPicker(workflowIndex)}
        </div>
        <div className="actions">
            <span><Button onClick={() => {
                if (workflowIndex - 1 >= 0) {
                    setWorkflowIndex(workflowIndex - 1);
                }
            }}>Back</Button></span>
            <span><Button onClick={() => {
                if (workflowIndex + 1 < 4) {
                    setWorkflowIndex(workflowIndex + 1);
                }
            }}>Next</Button></span>
        </div>
    </Paper>;
}