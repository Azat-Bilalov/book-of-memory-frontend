import { useLoginMutation } from "@/entities/session/api";
import { capitalize } from "@/shared/lib";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const [login, { isLoading, data, error }] = useLoginMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const passwd = formData.get("passwd") as string;

    login({ email, passwd });
  };

  React.useEffect(() => {
    console.log(data, error);
  }, [data, error]);

  return (
    <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Почта</Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="example@mail.ru"
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          name="passwd"
          type="password"
          placeholder="*****"
          required
        />
      </Form.Group>

      <p className="text-danger">
        {error && "data" in error && capitalize(error.data as string)}
      </p>

      <Button variant="primary" type="submit">
        Войти
        {isLoading && "..."}
      </Button>

      <Link className="text-center" to="/book-of-memory-frontend/register">
        Нет аккаунта? Зарегистрируйтесь
      </Link>

      {data && <Navigate to="/book-of-memory-frontend/" replace={true} />}
    </Form>
  );
};
