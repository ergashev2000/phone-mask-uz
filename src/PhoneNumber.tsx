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
  inputComponent?: React.ComponentType<any>;
  inputProps?: Record<string, any>;
  wrapperComponent?: React.ComponentType<any>;
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
  placeholder = "+998 __ ___ __ __",
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
      if (!rawValue.startsWith("+998")) {
        return;
      }
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
    if (!inputValue || inputValue === "+998") {
      setInputValue("+998");
      if (onChange) {
        onChange("+998", false);
      }
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (inputValue === "+998") {
      setInputValue("");
      if (onChange) {
        onChange("", false);
      }
    }
  };

  const getInputClassName = useCallback(() => {
    const classes = ["phone-input"];
    if (className) classes.push(className);
    if (isFocused) classes.push("focused");
    if (!isValid && showError) classes.push("error");
    return classes.join(" ");
  }, [className, isFocused, isValid, showError]);

  const inputElement = InputComponent ? (
    <InputComponent
      ref={ref || innerRef}
      value={inputValue}
      onChange={handleInputChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      className={getInputClassName()}
      placeholder={placeholder}
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
      placeholder={placeholder}
      className={getInputClassName()}
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