import type { FormEvent, ReactNode } from 'react';
import './FormBody.css';

const FormBody = ({
  handleSubmit,
  children,
}: {
  handleSubmit: (e: FormEvent) => Promise<void>;
  children: ReactNode;
}) => {
  return (
    <form className="form-body" onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default FormBody;
