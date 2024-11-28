# phone-mask-uz Examples

## Basic Usage

```tsx
import { PhoneInput } from 'phone-mask-uz';
import { useState } from 'react';

function BasicExample() {
  const [phone, setPhone] = useState('');
  
  return (
    <PhoneInput
      value={phone}
      onChange={(value, isValid) => {
        setPhone(value);
        console.log('Is valid:', isValid);
      }}
      placeholder="+998 (__) ___ __ __"
    />
  );
}
```

## With Operator Detection

```tsx
import { PhoneInput } from 'phone-mask-uz';
import { useState } from 'react';

function OperatorExample() {
  const [phone, setPhone] = useState('');
  
  return (
    <PhoneInput
      value={phone}
      showOperator={true}
      onChange={(value, isValid, operator) => {
        setPhone(value);
        console.log('Operator:', operator); // Beeline, Ucell, etc.
      }}
    />
  );
}
```

## Custom Format

```tsx
import { PhoneInput } from 'phone-mask-uz';
import { useState } from 'react';

function CustomFormatExample() {
  const [phone, setPhone] = useState('');
  
  return (
    <PhoneInput
      value={phone}
      format="+998-##-###-##-##" // Custom format
      onChange={(value, isValid) => setPhone(value)}
    />
  );
}
```

## With Error Handling

```tsx
import { PhoneInput } from 'phone-mask-uz';
import { useState } from 'react';

function ErrorHandlingExample() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  
  return (
    <PhoneInput
      value={phone}
      error={error}
      onChange={(value, isValid) => {
        setPhone(value);
        setError(isValid ? '' : 'Invalid phone number');
      }}
    />
  );
}
```

## With Material-UI Integration

```tsx
import { PhoneInput } from 'phone-mask-uz';
import { TextField } from '@mui/material';
import { useState } from 'react';

function MaterialUIExample() {
  const [phone, setPhone] = useState('');
  
  return (
    <PhoneInput
      value={phone}
      onChange={(value) => setPhone(value)}
      inputComponent={TextField}
      inputProps={{
        variant: 'outlined',
        label: 'Phone Number',
        fullWidth: true
      }}
    />
  );
}
```

## With Ant Design Integration

```tsx
import { PhoneInput } from 'phone-mask-uz';
import { Input } from 'antd';
import { useState } from 'react';

function AntDesignExample() {
  const [phone, setPhone] = useState('');
  
  return (
    <PhoneInput
      value={phone}
      onChange={(value) => setPhone(value)}
      inputComponent={Input}
      inputProps={{
        size: 'large',
        style: { width: '100%' }
      }}
    />
  );
}
```

## Full Featured Example

```tsx
import { PhoneInput } from 'phone-mask-uz';
import { useState } from 'react';

function FullFeaturedExample() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  
  return (
    <div>
      <PhoneInput
        value={phone}
        error={error}
        showOperator={true}
        format="+998 (##) ### ## ##"
        onChange={(value, isValid, operator) => {
          setPhone(value);
          setError(isValid ? '' : 'Invalid phone number');
          console.log('Current operator:', operator);
        }}
        placeholder="+998 (__) ___ __ __"
        className="custom-phone-input"
        wrapperComponent={({ children }) => (
          <div className="input-wrapper">
            {children}
          </div>
        )}
      />
      
      {/* Additional UI elements */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
```

## Styling Examples

### Basic CSS

```css
.phone-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
}

.phone-input.error {
  border-color: #ff4d4f;
}

.phone-input.focused {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.phone-input.disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
```

### With Styled Components

```tsx
import styled from 'styled-components';
import { PhoneInput } from 'phone-mask-uz';

const StyledPhoneInput = styled(PhoneInput)`
  input {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    
    &.error {
      border-color: #ff4d4f;
    }
    
    &:focus {
      border-color: #1890ff;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
    
    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  }
`;
```

## TypeScript Usage

```tsx
import { PhoneInput, PhoneInputProps } from 'phone-mask-uz';
import { useState } from 'react';

// Custom props interface extending PhoneInputProps
interface CustomPhoneInputProps extends PhoneInputProps {
  label?: string;
}

function TypeScriptExample({ label, ...props }: CustomPhoneInputProps) {
  const [phone, setPhone] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  
  const handleChange: PhoneInputProps['onChange'] = (value, valid, operator) => {
    setPhone(value);
    setIsValid(valid);
  };
  
  return (
    <div>
      {label && <label>{label}</label>}
      <PhoneInput
        value={phone}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
