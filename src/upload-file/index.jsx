import './upload-file.css';
import { Paper, Button } from '@mui/material';
import { useState } from 'react';
import CsvPreview from '../csv-preview';
import { assert } from '../utils/utils';

const isNumber = val => /^\d+$/.test(val);

const validateCsvLine = (line, lineno) => {
    const tokens = line.split(',');
    const warningMsg = 'If you have headers on your csv, please delete it.';
    lineno += 1;
    let okay = assert(tokens.length === 3, `At line ${lineno} invalid number of columns in your csv`);
    if (!okay.success) {
        return okay;
    }
    okay = assert(tokens[0].length === `${parseFloat(tokens[0])}`.length, `Invalid value for 'Value' at line ${lineno}. Must be float. ${warningMsg}`);
    if (!okay.success) {
        return okay;
    }
    okay = assert(isNumber(tokens[1]), `Invalid value for 'State Fips' at line ${lineno}. Must be int. ${warningMsg}`);
    if (!okay.success) {
        return okay;
    }
    okay = assert(tokens[1].length === 2, `Invalid value for 'State Fips' at line ${lineno}. 'State Fips' are two digit integers. ${warningMsg}`);
    if (!okay.success) {
        return okay;
    }
    okay = assert(isNumber(tokens[2]), `Invalid value for 'County Fips' at line ${lineno}. Must be int. ${warningMsg}`);
    if (!okay.success) {
        return okay;
    }
    okay = assert(tokens[2].length === 3, `Invalid value for 'County Fips' at line ${lineno}. 'County Fips' are three digit integers. ${warningMsg}`);
    return okay;
}

const validateCsv = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        const lines = event.target.result.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (!validateCsvLine(lines[i], i).success) {
                callback(validateCsvLine(lines[i], i));
                return;
            }
        };
        callback({ success: true, message: null, lines });
    });
    reader.readAsText(file);
}

const convertLinesToData = lines => {
    return lines.map(line => {
        const tokens = line.split(',');
        return { 
            value: tokens[0],
            state_fips: tokens[1],
            county_fips: tokens[2]
        }
    });
}

export default function UploadFile({ doneClick }) {
    const [workflowIndex, setWorkflowIndex] = useState(0);
    const [fileUploaded, setFileUploaded] = useState(null);
    const [fileInvalid, setFileInvalid] = useState('');
    const [fileLines, setFileLines] = useState([]);
    const WORKFLOW_LIMIT = 2;

    const workflowPicker = index => {
        if (index === 0) {
            return <div className="upload-file-workflow">
                <label className="csv-upload">
                    Upload CSV
                    <input type="file" accept="text/csv" onChange={e => {
                        const resultCallback = result => {
                            if (result.success) {
                                setFileUploaded(e.target.files[0].name);
                                setFileInvalid('');
                                setFileLines(result.lines);
                            } else {
                                setFileUploaded('Invalid data.');
                                setFileInvalid(result.message);
                            }
                        }
                        validateCsv(e.target.files[0], resultCallback);
                    }}></input>
                </label>
                <div className="file-uploaded">{fileUploaded ? (fileUploaded === 'Invalid data.' ? csvDebugMessage() : fileUploaded) : ''}</div>
            </div>;
        } else if (index === 1) {
            if (csvIsValid()) {
                return <div><CsvPreview data={convertLinesToData(fileLines)} /></div>;
            }
            else if (fileInvalid.length > 0) {
                return <div className="no-csv"><span>{fileInvalid}</span></div>
            }
            else {
                return <div className="no-csv"><span>No csv uploaded</span></div>
            }
        }
    }

    const csvDebugMessage = () => {
        return <div style={{ color: 'red', margin: '1rem' }}>
            <span>{fileUploaded + ' ' +  fileInvalid}</span>
        </div>
    }

    const csvIsValid = () => {
        return fileUploaded && fileUploaded !== 'Invalid data.'
    }

    const isLastWorkflow = () => {
        return workflowIndex === WORKFLOW_LIMIT - 1;
    }

    const onBackClick = () => {
        if (workflowIndex - 1 >= 0) {
            setWorkflowIndex(workflowIndex - 1);
        }
    }

    const onForwardClick = () => {
        if (workflowIndex + 1 < WORKFLOW_LIMIT) {
            setWorkflowIndex(workflowIndex + 1);
        } else if (isLastWorkflow()) {
            doneClick();
        }
    }

    const nextDisabled = () => {
        return !isLastWorkflow() && !csvIsValid();
    }

    return <Paper className="upload-file-dialog" elevation={3}>
        <div className="workflow">
            {workflowPicker(workflowIndex)}
        </div>
        <div className="actions">
            <span><Button onClick={onBackClick}>Back</Button></span>
            <span><Button onClick={onForwardClick} disabled={nextDisabled()}>{isLastWorkflow() ? 'Done' : 'Next'}</Button></span>
        </div>
    </Paper>;
}