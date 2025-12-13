import { type FormProps } from '../../types';
import './Form.css';

const Form = ({ children }: FormProps) => {
  return <div className="form">{children}</div>;
};

export default Form;
