import { Link, useLocation } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import logoSvg from "@assets/svg/logo.svg";
import { useIsAuth, useName } from "@/entities/session/model";
import { useLogoutMutation } from "@/entities/session/api";

import ExitIcon from "./ExitIcon.svg";

import s from "./Header.module.scss";

export const Header = () => {
  const location = useLocation();
  const isAuth = useIsAuth();
  const name = useName();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={s.header}>
      <Navbar data-bs-theme="dark" className={s.navbar}>
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
                to="/book-of-memory-frontend/"
                className={
                  location.pathname === "/book-of-memory-frontend/"
                    ? "active"
                    : ""
                }
              >
                Документы
              </Nav.Link>
              <Nav.Link
                as={Link}
                disabled={!isAuth}
                to="/book-of-memory-frontend/bindings"
                className={
                  location.pathname === "/book-of-memory-frontend/bindings"
                    ? "active"
                    : ""
                }
              >
                Заявки
              </Nav.Link>
              <Nav.Item className="d-flex align-items-center gap-1">
                {isAuth ? (
                  <>
                    <span className="p-2 rounded text-secondary bg-light">
                      {name}
                    </span>
                    <img
                      src={ExitIcon}
                      alt=""
                      width="24"
                      height="24"
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                      title="Выйти"
                    />
                  </>
                ) : (
                  <Link to="/book-of-memory-frontend/login">
                    <Button variant="outline-light">Войти</Button>
                  </Link>
                )}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
