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
            <span className={'login-label'}>{label} </span>
            <input
                className={'login-input'}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                required={required}
                onChange={onChange}
            ></input>
        </div>
    );
};

export default LoginInput;
