import { useEnteredBindingId } from "@/entities/binding/model";
import cn from "classnames";
import { Link } from "react-router-dom";

import s from "./BasketIconWidget.module.scss";

import FillingFolderIcon from "./FillingFolderIcon.svg";
import EmptyFolderIcon from "./EmptyFolderIcon.svg";

export type BasketIconWidgetProps = {
  className?: string;
};

export const BasketIconWidget = ({ className }: BasketIconWidgetProps) => {
  const enteredBindingId = useEnteredBindingId();

  return (
    <Link
      to={`/book-of-memory-frontend/binding/${enteredBindingId}`}
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
