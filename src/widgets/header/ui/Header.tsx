import { useLocation } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

import logoSvg from "@assets/svg/logo.svg";
import s from "./Header.module.scss";

export const Header = () => {
  const location = useLocation();

  return (
    <header className={s.header}>
      <Navbar data-bs-theme="dark" className={s.navbar}>
        <Container>
          <Navbar.Brand
            href="/book-of-memory-frontend/"
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
                href="/book-of-memory-frontend/"
                className={
                  location.pathname === "/book-of-memory-frontend/"
                    ? "active"
                    : ""
                }
              >
                Документы
              </Nav.Link>
              <Nav.Link
                disabled
                href="/bindings"
                className={location.pathname === "/bindings" ? "active" : ""}
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
