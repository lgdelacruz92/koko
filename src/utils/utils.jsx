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