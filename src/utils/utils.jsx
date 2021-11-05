
import axios from 'axios';

export const assert = (bool, msg) => {
    if (!bool) {
        return { success: bool, message: msg };
    } else {
        return { success: bool, message: null };
    }
}

/**
 * Reads a file and returns lines as array of strings
 * 
 * @async function
 * @param filepath
 * @return {[String]}
 */
export const readFile = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            const lines = event.target.result.split('\n');
            resolve(lines);
        });
        reader.readAsText(file);
    });
}

const getMetadata = () => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('session');
        axios.get(process.env.REACT_APP_SERVER + '/session_token_metadata/' + token)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const postUpdate = metadata => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('session');
        const params = { token, metadata };
        axios.post(process.env.REACT_APP_SERVER + '/session_token_metadata', params)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    })
}

export const updateTitle = title => {
    getMetadata()
        .then(metadata => {
            if (metadata.data.title !== title) {
                const newMetadata = {...metadata.data};
                newMetadata.title = title;
                postUpdate(newMetadata);
            }
        })
        .catch(err => {
            console.log(err);
        })
}

export const updateSubTitle = subtitle => {
    getMetadata()
        .then(metadata => {
            if (metadata.data.subtitle !== subtitle) {
                const newMetadata = {...metadata.data};
                newMetadata.subtitle = subtitle;
                postUpdate(newMetadata);
            }
        })
        .catch(err => {
            console.log(err);
        })
}