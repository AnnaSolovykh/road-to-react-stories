const InputWithLabel = ({
    id,
    value,
    type="text",
    onInputChange,
    children
}) => (
    <>
        <label htmlFor={id}>{children}</label>
        &nbsp;
        <input 
            id={id} 
            type={type}
            value={value}
            onChange={onInputChange}
        />
        <p>
            Seaching for <strong>{value}</strong> 
        </p>
    </>
);

export default InputWithLabel;
