import { Link, useLocation } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import logoSvg from "@assets/svg/logo.svg";
import s from "./Header.module.scss";
import { selectIsAuthorized } from "@/entities/session/model";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "@/entities/session/api";
import { selectEnteredBindingId } from "@/entities/binding/model";
import EmptyBasketIcon from "./EmptyBasketSvg.svg";
import FillingBasketIcon from "./FillingBasketSvg.svg";

export const Header = () => {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuthorized);
  const enteredBindingId = useSelector(selectEnteredBindingId);
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
                className={location.pathname === "/bindings" ? "active" : ""}
              >
                История заявок
              </Nav.Link>
              {isAuth && (
                <Nav.Link
                  as={Link}
                  to="/book-of-memory-frontend/basket"
                  className="mx-2 d-flex align-items-center"
                >
                  {enteredBindingId ? (
                    <img
                      src={FillingBasketIcon}
                      alt=""
                      width={24}
                      height={24}
                    />
                  ) : (
                    <img src={EmptyBasketIcon} alt="" width={24} height={24} />
                  )}
                </Nav.Link>
              )}
              <Nav.Item className="d-flex align-items-center">
                {isAuth ? (
                  <Button variant="outline-light" onClick={handleLogout}>
                    Выйти
                  </Button>
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
