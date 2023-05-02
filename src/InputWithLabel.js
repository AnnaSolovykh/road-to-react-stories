import { useEffect, useRef } from "react";

const InputWithLabel = ({
    id,
    value,
    type="text",
    onInputChange,
    children,
    isFocused
}) => {
    const inputRef = useRef();

    useEffect(()=> {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused])

    return (
        <>
        <label htmlFor={id}>{children}</label>
        &nbsp;
        <input 
            ref={inputRef}
            id={id} 
            type={type}
            value={value}
            onChange={onInputChange}
        />

        <p>
            Seaching for <strong>{value}</strong> 
        </p>
    </>
    )
}
    
;

export default InputWithLabel;
