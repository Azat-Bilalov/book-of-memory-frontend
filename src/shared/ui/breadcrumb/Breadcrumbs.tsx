import React from "react";
import { Link } from "react-router-dom";

import s from "./Breadcrumbs.module.scss";

interface BreadcrumbsProps {
  items: { text: string; href?: string; active?: boolean }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className={s.breadcrumbs}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <div className={s.breadcrumbs__item}>
            {item.active ? (
              <span className={s.breadcrumbs__text}>{item.text}</span>
            ) : (
              <Link to={item.href ?? "#"} className={s.breadcrumbs__text}>
                {item.text}
              </Link>
            )}
          </div>
          {index !== items.length - 1 && (
            <span className={s.breadcrumbs__separator}>/</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
