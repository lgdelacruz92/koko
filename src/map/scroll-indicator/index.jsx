import './scroll-indicator.css';

function ScrollIndicator(props) {
    return (
        <div className="scroll-indicator">
            {/* This is needed to allow relative position inside scroll indicator */}
            <div className="scroll-container">
                <div className="line"></div>
                <div className="ball"></div>
            </div>
        </div>
    );
}

export default ScrollIndicator;