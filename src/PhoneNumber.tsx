import React, {
  useState,
  useRef,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  forwardRef,
} from "react";
import { normalizePhoneNumber } from "./normalizePhoneNumber";

export interface PhoneInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string;
  onChange?: (formattedValue: string, isValid: boolean) => void;
  error?: string | boolean;
  showError?: boolean;
  /** Custom input component (e.g., antd Input, MUI TextField) */
  inputComponent?: React.ComponentType<any>;
  /** Props to pass to the custom input component */
  inputProps?: Record<string, any>;
  /** Custom wrapper component (e.g., Form.Item, FormControl) */
  wrapperComponent?: React.ComponentType<any>;
  /** Props to pass to the wrapper component */
  wrapperProps?: Record<string, any>;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(({
  value = "",
  onChange,
  error,
  showError = true,
  className = "",
  disabled = false,
  inputComponent: InputComponent,
  inputProps = {},
  wrapperComponent: WrapperComponent,
  wrapperProps = {},
  ...props
}, ref) => {
  const innerRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(
    normalizePhoneNumber(value)
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  const validatePhoneNumber = (phone: string): boolean => {
    const cleanNumber = phone.replace(/\D/g, "");
    return cleanNumber.length === 12 && cleanNumber.startsWith("998");
  };

  useEffect(() => {
    const normalizedValue = normalizePhoneNumber(value);
    setInputValue(normalizedValue);
    setIsValid(validatePhoneNumber(normalizedValue));
  }, [value]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const formattedValue = normalizePhoneNumber(rawValue);
      const valid = validatePhoneNumber(formattedValue);
      
      setInputValue(formattedValue);
      setIsValid(valid);

      if (onChange) {
        onChange(formattedValue, valid);
      }
    },
    [onChange]
  );

  const handleFocus = () => {
    setIsFocused(true);
    if (!inputValue) {
      setInputValue("+998");
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const inputElement = InputComponent ? (
    <InputComponent
      ref={ref || innerRef}
      value={inputValue}
      onChange={handleInputChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      className={className}
      {...inputProps}
      {...props}
    />
  ) : (
    <input
      ref={ref || innerRef}
      type="tel"
      value={inputValue}
      onChange={handleInputChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      className={`phone-input ${className} ${!isValid && showError ? "error" : ""}`}
      {...props}
    />
  );

  if (WrapperComponent) {
    return (
      <WrapperComponent
        {...wrapperProps}
        error={showError ? error : undefined}
      >
        {inputElement}
      </WrapperComponent>
    );
  }

  return inputElement;
});

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
