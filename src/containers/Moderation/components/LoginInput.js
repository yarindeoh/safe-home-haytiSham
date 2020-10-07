import React from 'react';

const LoginInput = ({
    name,
    type,
    placeholder,
    label,
    value,
    required,
    onChange
}) => {
    return (
        <div className={'login-input-wrap'}>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                required={required}
                onChange={onChange}
            ></input>
            <span>{label} </span>
        </div>
    );
};

export default LoginInput;
