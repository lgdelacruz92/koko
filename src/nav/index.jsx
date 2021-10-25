import './nav.css';
import { useRef, useEffect } from 'react';

export default function Nav({ hamburgerClick, searchAction, uploadClick }) {
    const inputRef = useRef(null);

    useEffect(() => {
        const inputRefEl = inputRef.current;
        const enterEventHandler = e => {
            if (e.keyCode === 13) { // Enter is pressed
                searchAction(inputRefEl.value.toLowerCase());
                inputRefEl.value = '';
            }
        }
        inputRefEl.addEventListener('keyup', enterEventHandler);
        return () => {
            inputRefEl.removeEventListener('keyup', enterEventHandler);
        }
    }, [searchAction]);

    return <div className="navbar">
        <div className="nav-buttons">
            <button className="hamburger" onClick={hamburgerClick}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="white"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
            </button>
        <button className="upload" onClick={uploadClick} id="nav-upload-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="white"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z"/></svg>
            </button>
        </div>
        <div className="search-input">
            {/* magnifying class icon */}
            <span className="icon" onClick={() => {
                searchAction(inputRef.current.value.toLowerCase());
                inputRef.current.value = '';
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="white"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            </span>
            <input type="text" className="search-input" placeholder="Search" ref={inputRef}/>
        </div>
    </div>
}