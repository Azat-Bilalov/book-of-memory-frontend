import React from "react";
import video from "@assets/videos/hero-background.mp4";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useRole } from "@/entities/session/model";

import s from "./Hero.module.scss";

interface Props {}

export const Hero: React.FC<Props> = () => {
  const role = useRole();

  return (
    <div className={s.hero} id="hero">
      <video
        className={s.heroVideo}
        autoPlay
        loop
        muted
        poster="https://assets.codepen.io/6093409/river.jpg"
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className={s.heroContent}>
        <h1 className={s.heroTitle}>Книга памяти</h1>
        <p className={s.heroText}>
          Цель проекта – предоставить возможность посетителям портала получить
          наиболее полную документальную информацию об участниках Великой
          Отечественной войны при помощи новых интерактивных инструментов.
        </p>

        <div className="d-flex justify-content-center gap-2">
          <Link to="/book-of-memory-frontend/veterans">
            <Button variant="outline-light">Список ветеранов</Button>
          </Link>
          <Link to="/book-of-memory-frontend/documents">
            <Button variant="outline-light">Список документов</Button>
          </Link>
          {role && (
            <Link to="/book-of-memory-frontend/bindings">
              <Button variant="outline-light">Список заявок</Button>
            </Link>
          )}
        </div>

        {role && (
          <div className="d-flex justify-content-center gap-2">
            <Link to="/book-of-memory-frontend/documents/add">
              <Button variant="outline-light">Добавить документ</Button>
            </Link>
            <Link to="/book-of-memory-frontend/veterans/add">
              <Button variant="outline-light">Добавить ветерана</Button>
            </Link>
          </div>
        )}

        {role === "moderator" && (
          <Link to="/book-of-memory-frontend/documents/table">
            <Button variant="outline-light">Таблица документов</Button>
          </Link>
        )}

        {!role && (
          <div className="d-flex justify-content-center gap-2">
            <Link to="/book-of-memory-frontend/login">
              <Button variant="outline-light">Войти</Button>
            </Link>
            <Link to="/book-of-memory-frontend/register">
              <Button variant="outline-light">Зарегистрироваться</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
