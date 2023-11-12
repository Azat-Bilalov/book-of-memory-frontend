import React from "react";

import s from "./Hero.module.scss";
import video from "@assets/videos/hero-background.mp4";

interface Props {}

export const Hero: React.FC<Props> = () => {
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
      </div>
    </div>
  );
};
