import type { SelectHTMLAttributes } from 'react';
import './FormSelect.css';

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const FormSelect = (props: FormSelectProps) => {
  return (
    <select className="form-select" {...props} name="type">
      <option value="Лекция">Лекция</option>
      <option value="Семинар">Семинар</option>
    </select>
  );
};

export default FormSelect;
