import { Link, useLocation } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import cn from "classnames";

import logoSvg from "@assets/svg/logo.svg";
import s from "./Header.module.scss";

export const Header = () => {
  const location = useLocation();

  return (
    <header className={s.header}>
      <Navbar
        data-bs-theme="dark"
        className={cn(
          s.navbar,
          location.pathname === "/book-of-memory-frontend/" &&
            s.navbar_transparent
        )}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/book-of-memory-frontend/"
            className="text-light d-flex align-center gap-2"
          >
            <img
              alt=""
              src={logoSvg}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Книга памяти
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/book-of-memory-frontend/documents"
                className={
                  location.pathname === "/book-of-memory-frontend/documents"
                    ? "active"
                    : ""
                }
              >
                Документы
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/book-of-memory-frontend/bindings"
                className={
                  location.pathname === "/book-of-memory-frontend/bindings"
                    ? "active"
                    : ""
                }
              >
                Заявки
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
