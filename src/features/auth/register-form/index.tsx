import { useRegisterMutation } from "@/entities/session/api";
import { capitalize } from "@/shared/lib";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

export const RegisterForm: React.FC = () => {
  const [register, { isLoading, data, error }] = useRegisterMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const passwd = formData.get("passwd") as string;

    register({ first_name, last_name, email, passwd });
  };

  React.useEffect(() => {
    console.log(data, error);
  }, [data, error]);

  return (
    <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      <Form.Group controlId="formBasicFirstName">
        <Form.Label>Имя</Form.Label>
        <Form.Control
          name="first_name"
          type="text"
          placeholder="Иван"
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicLastName">
        <Form.Label>Фамилия</Form.Label>
        <Form.Control
          name="last_name"
          type="text"
          placeholder="Иванов"
          required
        />
      </Form.Group>

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
        Зарегистрироваться
        {isLoading && "..."}
      </Button>

      <Link className="text-center" to="/book-of-memory-frontend/login">
        Есть аккаунт? Войдите
      </Link>

      {data && <Navigate to="/book-of-memory-frontend/" replace={true} />}
    </Form>
  );
};
