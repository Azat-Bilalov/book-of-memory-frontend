import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import logoSvg from "@assets/svg/logo.svg";
import { useIsAuth, useName, useRole } from "@/entities/session/model";
import { useLogoutMutation } from "@/entities/session/api";
import cn from "classnames";

import ExitIcon from "./ExitIcon.svg";

import s from "./Header.module.scss";
import React from "react";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = useIsAuth();
  const name = useName();
  const role = useRole();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout();
    navigate("/book-of-memory-frontend/");
  };

  return (
    <header className={s.header}>
      <Navbar
        expand="lg"
        data-bs-theme="dark"
        className={cn(s.navbar, {
          [s.navbarTransparent]:
            location.pathname === "/book-of-memory-frontend/",
        })}
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
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {isAuth && role === "moderator" && (
              <Nav className="ms-auto">
                <Nav.Link
                  as={Link}
                  to="/book-of-memory-frontend/documents/add"
                  className={
                    location.pathname ===
                    "/book-of-memory-frontend/documents/add"
                      ? "active"
                      : ""
                  }
                >
                  Добавить документ
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/book-of-memory-frontend/veterans/add"
                  className={
                    location.pathname ===
                    "/book-of-memory-frontend/veterans/add"
                      ? "active"
                      : ""
                  }
                >
                  Добавить ветерана
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/book-of-memory-frontend/documents/table"
                  className={
                    location.pathname ===
                    "/book-of-memory-frontend/documents/table"
                      ? "active"
                      : ""
                  }
                >
                  Таблица документов
                </Nav.Link>
              </Nav>
            )}
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/book-of-memory-frontend/veterans"
                className={
                  location.pathname === "/book-of-memory-frontend/veterans"
                    ? "active"
                    : ""
                }
              >
                Ветераны
              </Nav.Link>
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
