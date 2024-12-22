import React from 'react';

const FormInput = ({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
    required = false,
    id,
    className = "form-input",
    suggestions = [],
    showSuggestions = false, // showSuggestions als prop
    onSuggestionClick = () => {}
}) => {
    return (
        <div className="form-input-wrapper">
            <label>
                {label}
                <input
                    className={className}
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                />
            </label>
            {showSuggestions && suggestions.length > 0 && ( // Zeigt Vorschläge nur an, wenn showSuggestions true ist
                <div className="form-input-suggestions">
                    <ul>
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => onSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FormInput;
