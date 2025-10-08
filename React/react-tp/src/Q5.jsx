import React, { useState } from 'react';

function Timer() {
    const [seconds, setSeconds] = useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2>Timer: {seconds} seconds</h2>
        </div>
    );
}

export default Timer;