# 📱 Phone Mask UZ

<div align="center">
  <img src="https://img.shields.io/npm/v/phone-mask-uz" alt="NPM Version" />
  <img src="https://img.shields.io/npm/l/phone-mask-uz" alt="License" />
  <img src="https://img.shields.io/npm/dt/phone-mask-uz" alt="Downloads" />
  <img src="https://img.shields.io/bundlephobia/min/phone-mask-uz" alt="Size" />
</div>

<p align="center">
  <b>React Phone Number Input Component for Uzbekistan</b><br>
  <sub>Seamlessly integrates with Ant Design, Material-UI, Chakra UI, and other UI libraries</sub>
</p>

<br>

## ✨ Features

- 🎯 Automatic formatting for Uzbekistan phone numbers
- ✅ Built-in validation
- 🔄 Works with all UI libraries
- 🎨 Fully customizable
- 📦 Lightweight (< 5KB)
- 💪 Written in TypeScript
- ⚡ Easy to use

## 🚀 Installation

```bash
npm install phone-mask-uz
```

<details>
<summary>Install with other package managers</summary>

```bash
# Yarn
yarn add phone-mask-uz

# pnpm
pnpm add phone-mask-uz
```
</details>

## 💻 Usage

### 1️⃣ Basic Example

```tsx
import PhoneNumber from 'phone-mask-uz';

function App() {
  const [phone, setPhone] = useState('');
  
  return (
    <PhoneNumber
      value={phone}
      onChange={(value, isValid) => setPhone(value)}
      placeholder="+998 __ ___ __ __"
    />
  );
}
```

### 2️⃣ With Ant Design

```tsx
import PhoneNumber from 'phone-mask-uz';
import { Form, Input } from 'antd';

function App() {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Form.Item name="phone">
        <PhoneNumber
          inputComponent={Input}
          inputProps={{ size: 'large' }}
        />
      </Form.Item>
    </Form>
  );
}
```

<details>
<summary>Usage with Material-UI and Chakra UI</summary>

#### Material-UI

```tsx
import PhoneNumber from 'phone-mask-uz';
import { TextField } from '@mui/material';

function App() {
  return (
    <PhoneNumber
      inputComponent={TextField}
      inputProps={{ variant: 'outlined' }}
    />
  );
}
```

#### Chakra UI

```tsx
import PhoneNumber from 'phone-mask-uz';
import { Input } from '@chakra-ui/react';

function App() {
  return (
    <PhoneNumber
      inputComponent={Input}
    />
  );
}
```
</details>

## 🎛 Props

### Essential Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | '' | Input value |
| onChange | (value: string, isValid: boolean) => void | - | Callback when value changes |
| placeholder | string | '+998 __ ___ __ __' | Input placeholder text |

<details>
<summary>Additional Props</summary>

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| error | string \| boolean | - | Error message or state |
| showError | boolean | true | Show error state |
| inputComponent | React.ComponentType | - | Custom input component (Antd Input, MUI TextField) |
| inputProps | object | {} | Props for input component |
| wrapperComponent | React.ComponentType | - | Wrapper component |
| wrapperProps | object | {} | Props for wrapper component |
| disabled | boolean | false | Disable input |
| className | string | '' | CSS class |
</details>

## 🛠 Utility Functions

```typescript
import { normalizePhoneNumber, isValidPhoneNumber } from 'phone-mask-uz';

// Format phone number
normalizePhoneNumber('998901234567'); // '+998 90 123 45 67'

// Validate phone number
isValidPhoneNumber('+998 90 123 45 67'); // true
```

## ✅ Validation

- Must start with +998
- Must be exactly 12 digits
- Validation state returned through onChange callback

## 🎨 Formatting

Number format: `+998 XX XXX XX XX`

**Example:**
- Input: `998901234567`
- Result: `+998 90 123 45 67`

## 🌐 Browser Support

- Google Chrome
- Mozilla Firefox
- Safari
- Microsoft Edge

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## 📄 License

MIT 
