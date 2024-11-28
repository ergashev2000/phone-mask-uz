import React, { useState, useEffect, useCallback, useRef, forwardRef } from "react";
import { normalizePhoneNumber, isValidPhoneNumber, getOperatorName } from "./normalizePhoneNumber";

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value: string;
  onChange: (value: string, isValid: boolean, operator?: string | null) => void;
  error?: string;
  format?: string;
  showOperator?: boolean;
  inputComponent?: React.ComponentType<any>;
  inputProps?: Record<string, any>;
  wrapperComponent?: React.ComponentType<any>;
  wrapperProps?: Record<string, any>;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(({
  value,
  onChange,
  error,
  format = "+998 (##) ### ## ##",
  showOperator = false,
  disabled = false,
  className = "",
  inputComponent: InputComponent,
  inputProps = {},
  wrapperComponent: WrapperComponent,
  wrapperProps = {},
  placeholder = format,
  ...props
}, ref) => {
  const innerRef = useRef<HTMLInputElement>(null);
  const combinedRef = (ref || innerRef) as React.RefObject<HTMLInputElement>;

  const [inputValue, setInputValue] = useState(
    normalizePhoneNumber(value, format)
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [operator, setOperator] = useState<string | null>(null);

  useEffect(() => {
    const normalizedValue = normalizePhoneNumber(value, format);
    setInputValue(normalizedValue);
    setIsValid(isValidPhoneNumber(normalizedValue));
    if (showOperator) {
      setOperator(getOperatorName(normalizedValue));
    }
  }, [value, format, showOperator]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const formattedValue = normalizePhoneNumber(rawValue, format);
      const valid = isValidPhoneNumber(formattedValue);
      const currentOperator = showOperator ? getOperatorName(formattedValue) : null;

      setInputValue(formattedValue);
      setIsValid(valid);
      setOperator(currentOperator);

      if (onChange) {
        onChange(formattedValue, valid, currentOperator);
      }
    },
    [onChange, format, showOperator]
  );

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const getInputClassName = () => {
    return [
      className,
      error ? "error" : "",
      isFocused ? "focused" : "",
      disabled ? "disabled" : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  const inputStyle = {
    ...inputProps.style,
    color: error ? 'red' : undefined,
    borderColor: error ? 'red' : undefined
  };

  const renderInput = () => (
    <div style={{ position: 'relative' }}>
      {InputComponent ? (
        <InputComponent
          {...inputProps}
          ref={combinedRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          className={getInputClassName()}
          placeholder={placeholder}
          style={inputStyle}
          {...props}
        />
      ) : (
        <input
          {...props}
          ref={combinedRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          className={getInputClassName()}
          style={inputStyle}
        />
      )}
      {error && (
        <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
          {error}
        </div>
      )}
      {showOperator && operator && (
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>
          Operator: {operator}
        </div>
      )}
    </div>
  );

  return WrapperComponent ? (
    <WrapperComponent {...wrapperProps}>{renderInput()}</WrapperComponent>
  ) : (
    renderInput()
  );
});

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;