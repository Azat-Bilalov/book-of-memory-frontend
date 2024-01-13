import { Header } from "@/widgets/header";
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Header />
      <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h1 className="display-1">404</h1>
        <h2 className="h1">Страница не найдена</h2>
        <p className="text-muted">
          Возможно, вы ввели неправильный адрес или страница была удалена
        </p>
        <Link
          to="/book-of-memory-frontend/"
          className="btn btn-outline-primary"
        >
          На главную
        </Link>
      </Container>
    </>
  );
};

export default NotFoundPage;
