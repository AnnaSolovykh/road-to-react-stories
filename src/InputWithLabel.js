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
        if (isFocused) {
            inputRef.current.focus();
        }
    }, [isFocused])
    // wherever these is a change in [isFocused], we code gets run 
    // if isFocused is true, it gets focused on the input element
    //.current represents the input element

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

        {/* DECLARATIVE code: 
        using code which says what to do
        React is declarative 

        IMPERATIVE code: 
        writing  code which specifies how to do
        

        Here we want the mouse cursor to focus on input field.
        If we add autoFocus to the input field, this is the DECLARATIVE way. 
        <input 
            id={id} 
            type={type}
            value={value}
            onChange={onInputChange}
            autofocus
        />

        Here is this code we will make it IMPERATIVE using useRef.
        */}

        <p>
            Seaching for <strong>{value}</strong> 
        </p>
    </>
    )
}
    
;

export default InputWithLabel;
