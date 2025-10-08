import React , { useRef, useEffect } from "react";

function AutoFocusInput() {
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <input type="text" placeholder="Votre nom" ref={inputRef} />
    );
}

export default AutoFocusInput;
