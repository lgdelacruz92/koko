import './nav.css';
import { useRef, useEffect } from 'react';

export default function Nav({ hamburgerClick, searchAction }) {
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
        <div>
            <button className="hamburger" onClick={hamburgerClick}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
            </button>
        </div>
        <div className="search-input">
            {/* magnifying class icon */}
            <span className="icon" onClick={() => {
                searchAction(inputRef.current.value.toLowerCase());
                inputRef.current.value = '';
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            </span>
            <input type="text" className="search-input" placeholder="Search" ref={inputRef}/>
        </div>
    </div>
}