# Phone Mask UZ

A flexible and easy-to-use phone number input component for React applications with built-in Uzbekistan phone number formatting and validation. Seamlessly integrates with popular UI libraries like Ant Design, Material-UI, Chakra UI, and more.

![NPM Version](https://img.shields.io/npm/v/phone-mask-uz)
![License](https://img.shields.io/npm/l/phone-mask-uz)

## Features

- 📱 Automatic formatting for Uzbekistan phone numbers
- ✅ Built-in validation
- 🔄 Seamless integration with popular UI libraries
- 🎨 Highly customizable
- 📦 Lightweight
- 💪 Written in TypeScript
- ⚡ Easy to use

## Installation

```bash
# npm
npm install phone-mask-uz

# yarn
yarn add phone-mask-uz

# pnpm
pnpm add phone-mask-uz
```

## Basic Usage

You can import the component in two ways:

### Default Import
```tsx
import PhoneNumber from 'phone-mask-uz';

function App() {
  const [phone, setPhone] = useState('');
  
  return (
    <PhoneNumber
      value={phone}
      onChange={(value, isValid) => {
        setPhone(value);
        console.log('Is valid:', isValid);
      }}
    />
  );
}
```

### Named Import
```tsx
import { PhoneInput } from 'phone-mask-uz';

function App() {
  const [phone, setPhone] = useState('');
  
  return (
    <PhoneInput
      value={phone}
      onChange={(value, isValid) => {
        setPhone(value);
        console.log('Is valid:', isValid);
      }}
    />
  );
}
```

## Integration Examples

### With Ant Design (antd)

```tsx
import PhoneNumber from 'phone-mask-uz';
import { Form, Input } from 'antd';

function AntdExample() {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Form.Item
        name="phone"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <PhoneNumber
          inputComponent={Input}
          inputProps={{
            size: 'large',
            placeholder: '+998 __ ___ __ __',
          }}
        />
      </Form.Item>
    </Form>
  );
}
```

### With Material-UI (MUI)

```tsx
import PhoneNumber from 'phone-mask-uz';
import { TextField, FormControl } from '@mui/material';

function MUIExample() {
  const [phone, setPhone] = useState('');
  
  return (
    <PhoneNumber
      value={phone}
      onChange={(value, isValid) => setPhone(value)}
      inputComponent={TextField}
      inputProps={{
        variant: 'outlined',
        placeholder: '+998 __ ___ __ __',
        fullWidth: true,
      }}
      wrapperComponent={FormControl}
      wrapperProps={{
        fullWidth: true,
      }}
    />
  );
}
```

### With Chakra UI

```tsx
import PhoneNumber from 'phone-mask-uz';
import { Input, FormControl } from '@chakra-ui/react';

function ChakraExample() {
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(true);
  
  return (
    <PhoneNumber
      value={phone}
      onChange={(value, valid) => {
        setPhone(value);
        setIsValid(valid);
      }}
      inputComponent={Input}
      inputProps={{
        placeholder: '+998 __ ___ __ __',
      }}
      wrapperComponent={FormControl}
      wrapperProps={{
        isInvalid: !isValid,
      }}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | '' | The input value |
| onChange | (value: string, isValid: boolean) => void | - | Callback fired when the value changes |
| error | string \| boolean | - | Error message or state |
| showError | boolean | true | Whether to show error state |
| inputComponent | React.ComponentType | - | Custom input component (e.g., antd Input, MUI TextField) |
| inputProps | object | {} | Props to pass to the custom input component |
| wrapperComponent | React.ComponentType | - | Custom wrapper component (e.g., Form.Item, FormControl) |
| wrapperProps | object | {} | Props to pass to the wrapper component |
| disabled | boolean | false | Whether the input is disabled |
| className | string | '' | Additional CSS class |
| placeholder | string | '+998 __ ___ __ __' | Input placeholder text |

Plus all standard HTML input props (except 'onChange' and 'value').

## Utility Functions

The package also exports utility functions:

```typescript
import { normalizePhoneNumber, isValidPhoneNumber } from 'phone-mask-uz';

// Format phone number
const formatted = normalizePhoneNumber('998901234567'); // '+998 90 123 45 67'

// Validate phone number
const isValid = isValidPhoneNumber('+998 90 123 45 67'); // true
```

## Validation

The component automatically validates Uzbekistan phone numbers:
- Must start with +998
- Must be exactly 12 digits (excluding formatting)
- Returns validation state through onChange callback

## Formatting

Phone numbers are automatically formatted as: `+998 XX XXX XX XX`

Example:
- Input: `998901234567`
- Formatted: `+998 90 123 45 67`

## Browser Support

- Chrome (and Chromium based browsers)
- Firefox
- Safari
- Edge

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 
