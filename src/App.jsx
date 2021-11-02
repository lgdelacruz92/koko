import "./App.css";
import MapEditor from "./map-editor";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    pallete: {
        mode: 'dark'
    }
});

function App() {

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
