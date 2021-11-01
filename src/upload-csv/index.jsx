import './upload-csv.css';
import { readFile } from '../utils/utils';
import axios from 'axios';

/**
 * This can only handle csv data for counties at the moment.
 * @param {Function} csvUploaded (called when csv is uploaded)
 * @return React.Component
 */
export default function UploadCountyData({ csvUploaded }) {

    /**
     * This converts file into lines
     * @param {File} file 
     * @returns Promise
     */
    const _convertToData = file => {
        return new Promise(async (resolve, reject) => {
            try {
                const lines = await readFile(file);

                // TODO: maybe validate csv here in the future
                const dataArray = lines.map(line => {
                    const tokens = line.replace('\n','').split(',');
                    return { fips: tokens[0], value: tokens[1]}
                })
                resolve(dataArray)
            }
            catch (e) {
                console.error(e);
                reject(e);
            }
        })
    }

    /**
     * The event handler with upload csv is clicked
     * Note: There is no system in place to validate csv
     * @param {Event} e 
     */
    const uploadFile = e => {
        console.log(e.target.value);
        _convertToData(e.target.files[0])
            .then(dataArray => {
                axios.post(process.env.REACT_APP_SERVER + '/use', { data: dataArray })
                    .then(res => {
                        localStorage.setItem('session', res.data.session);
                        csvUploaded();
                    })
                    .catch(err => {
                        console.error(err);
                    });
            })
            .catch(err => console.error(err));
    }

    return <button className="upload">
        <label className="csv-upload">
            <div className="upload-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z"/></svg>
                Upload CSV
            </div>
            <input type="file" accept="text/csv" onClick={e => {
                e.target.value = '';
            }} onChange={uploadFile}></input>
        </label>
    </button>
}

