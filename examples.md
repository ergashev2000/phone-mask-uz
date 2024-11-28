# Phone Input Examples

## Basic Usage
```tsx
import { PhoneInput } from 'your-package-name';

function App() {
  const [phone, setPhone] = useState('');
  
  return (
    <PhoneInput
      value={phone}
      onChange={(value, isValid) => setPhone(value)}
    />
  );
}
```

## With Ant Design (antd)
```tsx
import { PhoneInput } from 'your-package-name';
import { Form, Input } from 'antd';

function AntdExample() {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Form.Item
        name="phone"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <PhoneInput
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
import { PhoneInput } from 'your-package-name';
import { TextField, FormControl } from '@mui/material';

function MUIExample() {
  const [phone, setPhone] = useState('');
  
  return (
    <PhoneInput
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
import { PhoneInput } from 'your-package-name';
import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

function ChakraExample() {
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(true);
  
  return (
    <PhoneInput
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
