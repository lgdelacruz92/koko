import './scroll-indicator.css';

function ScrollIndicator({ value }) {

    const min = 0;
    const max = 100;
    const ballStyle = () => {
        let offset = value;
        if (value > max) {
            offset = 100;
        }
        if (value < min) {
            offset = 0
        }

        return { right: `${max - offset}%` };
    }

    return (
        <div className="scroll-indicator">
        {/* This is needed to allow relative position inside scroll indicator */}
            <div className="scroll-container">
                <div className="line"></div>
                <div className="ball" style={ballStyle()}></div>
            </div>
        </div>
    );
}

export default ScrollIndicator;