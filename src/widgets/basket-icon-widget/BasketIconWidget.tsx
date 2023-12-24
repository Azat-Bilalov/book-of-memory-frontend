import { useEnteredBindingId } from "@/entities/binding/model";
import cn from "classnames";
import EmptyFolderIcon from "./EmptyFolderIcon.svg";
import FillingFolderIcon from "./FillingFolderIcon.svg";

import s from "./BasketIconWidget.module.scss";
import { useIsAuth } from "@/entities/session/model";
import { Link } from "react-router-dom";

export type BasketIconWidgetProps = {
  className?: string;
};

export const BasketIconWidget = ({ className }: BasketIconWidgetProps) => {
  const isAuth = useIsAuth();
  const enteredBindingId = useEnteredBindingId();

  if (!isAuth) {
    return null;
  }

  return (
    <Link
      to="/book-of-memory-frontend/basket"
      className={cn(s.root, !enteredBindingId && s.root_disabled, className)}
    >
      <img
        src={enteredBindingId ? FillingFolderIcon : EmptyFolderIcon}
        alt=""
        title={enteredBindingId ? "Документы в корзине" : "Корзина пуста"}
        className={s.root__icon}
      />
    </Link>
  );
};
