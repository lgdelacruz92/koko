import "./App.css";
import MapEditor from "./map-editor";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ServicesContext } from './services/services';
import { useState, useEffect } from 'react';

const theme = createTheme({
    pallete: {
        mode: 'dark'
    }
});

function App() {
    const [state, setState] = useState(1);

    useEffect(() => {
        console.log('rendering app');
    }, [state]);

    return (
        <ServicesContext.Provider value={{hello: 'hello', setState, state }}>
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
        </ServicesContext.Provider>
    );
}

export default App;
