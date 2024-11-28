# Phone Input Examples

## Basic Usage

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

## With Ant Design (antd)

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

## With Material-UI (MUI)

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

## With Chakra UI

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

## With Form Validation

```tsx
import PhoneNumber from 'phone-mask-uz';
import { useForm } from 'react-hook-form';

function FormExample() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PhoneNumber
        {...register('phone', { required: 'Phone number is required' })}
        error={errors.phone?.message}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## With Custom Styling

```tsx
import PhoneNumber from 'phone-mask-uz';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 8px 12px;
  border: 2px solid ${props => props.error ? 'red' : '#ccc'};
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  
  &:focus {
    border-color: #2196f3;
    outline: none;
  }
`;

function StyledExample() {
  const [phone, setPhone] = useState('');
  
  return (
    <PhoneNumber
      value={phone}
      onChange={(value) => setPhone(value)}
      inputComponent={StyledInput}
    />
  );
}
