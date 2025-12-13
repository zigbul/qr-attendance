import { type FormProps } from '../../types';

import './FormTitle.css';

const FormTitle = ({ children }: FormProps) => {
  return <h1 className="form-title">{children}</h1>;
};

export default FormTitle;
