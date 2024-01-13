import { Veteran } from "../model";
import cn from "classnames";
import NoAvatarImage from "@/assets/images/no-avatar.png";

export type VeteranCardProps = {
  veteran: Veteran;
  className?: string;
};

export const VeteranCard = ({ veteran, className }: VeteranCardProps) => {
  return (
    <div className={cn("d-flex flex-row align-items-center gap-2", className)}>
      <img
        className="card-img-left"
        src={veteran.imageUrl ?? NoAvatarImage}
        style={{
          width: "96px",
          height: "96px",
          objectFit: "cover",
          borderRadius: "15%",
        }}
        onError={(e) => {
          e.currentTarget.src = NoAvatarImage;
        }}
      />
      <div className="d-flex flex-column">
        <h4 className="h4-sm">
          {veteran.firstName} {veteran.lastName} {veteran.patronymic}
        </h4>
        <p>{new Date(veteran.birthDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};
