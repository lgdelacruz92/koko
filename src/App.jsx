import "./App.css";
import MapEditor from "./map-editor";
import EmailPopup from "./email-popup";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { ServicesContext } from './services/services';

const theme = createTheme({
    pallete: {
        mode: 'dark'
    }
});

function App() {
    const [emailPopUp, setEmailPopUp] = useState('');

    const onAppClick = e => {
        const targetClassName = e.target.getAttribute('class');
        const targetId = e.target.getAttribute('id');
        console.log(e.target, e.currentTarget);
        if (targetClassName) {
            let ignore = targetClassName.includes('save-as-png');
            ignore |= targetClassName.includes('save-as-png-svg');
            ignore |= targetClassName.includes('save-as-png-text');
            ignore |= targetClassName.includes('send-me-email-container');
            ignore |= targetClassName.includes('email-send-button');
            ignore |= targetClassName.includes('email-text-field');
            ignore |= targetClassName.includes('embed-to-your-site');
            ignore |= targetClassName.includes('embed-to-your-site-icon');
            ignore |= targetClassName.includes('embed-to-your-site-text');
            if (ignore) {
                return;
            }
        }
        if (targetId) {
            let ignore = targetId === 'email-input';
            if (ignore) {
                return;
            }
        }

        const currentTargetClassName = e.currentTarget.getAttribute('class');
        if (currentTargetClassName === 'App') {
            setEmailPopUp('');
        }
    }

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
        <ServicesContext.Provider value={{ setEmailPopUp, emailPopUp }}>
            <ThemeProvider theme={theme}>
                <div className="App" onClick={onAppClick}>
                    <div className="main-panel">
                    <MapEditor/>
                    <div className="state-info-popup">
                        <div id="state">CA</div>
                        <div id="county">Santa Barbara</div>
                        <div id="value">Value</div>
                    </div>
                    </div>
                    { emailPopUp === 'png' || emailPopUp === 'code'?
                        <div className="email-popup-container">
                            <EmailPopup option={emailPopUp}/>
                        </div>
                        :
                        <div>
                        </div>
                    }
                </div>
            </ThemeProvider>
        </ServicesContext.Provider>
    );
}

export default App;
