import "./App.css";
import MapEditor from "./map-editor";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';

const theme = createTheme({
    pallete: {
        mode: 'dark'
    }
});

function App() {
    useEffect(() => {
        /**
         * Override ctrl + s or cmd + s because it opens up browser save dialog
         */

        /**
         * If cmd or ctrl is down this is true
         * @param {Event} e 
         * @returns {Boolean}
         */
        const metaIsDown = e => {
            return navigator.userAgentData.platform.match(/mac/gu) ? e.metaKey : e.ctrlKey
        }

        /**
         * If cmd + s  or ctrl + s do not show default save option for browsers
         */
        const preventDefaultSaveShortcut = e => {
            if (metaIsDown(e) && e.key === 's') {
                e.preventDefault();
            }
        }

        window.addEventListener("keydown", function(e) {
            preventDefaultSaveShortcut(e);
        }, false);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <div className="main-panel">
                <MapEditor/>
                <div className="state-info-popup">
                    <div id="state">CA</div>
                    <div id="county">Santa Barbara</div>
                    <div id="value">Value</div>
                </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
