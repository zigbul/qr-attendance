const LoginPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const credentials = Object.fromEntries(formData);

    console.log(credentials);
    form.reset();
  };

  return (
    <section>
      <h1>Welcome to login page!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Login</p>
          <input type="text" placeholder="Enter login" name="login" />
        </div>
        <div>
          <p>Password</p>
          <input type="password" placeholder="Enter password" name="password" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
