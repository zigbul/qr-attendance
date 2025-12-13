import type { FormInputProps } from '../../types';
import './FormInput.css';

const FormInput = (props: FormInputProps) => {
  return <input className="form-input" {...props} />;
};

export default FormInput;
