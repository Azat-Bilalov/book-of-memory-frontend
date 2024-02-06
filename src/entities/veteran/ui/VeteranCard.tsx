import { VeteranModel } from "../model";
import cn from "classnames";

export type VeteranCardProps = {
  veteran: VeteranModel;
  className?: string;
};

const NoAvatarImage = "https://predpohod.ru/images/noavatar.png";

export const VeteranCard = ({ veteran, className }: VeteranCardProps) => {
  return (
    <div className={cn("d-flex flex-row align-items-center gap-2", className)}>
      <img
        className="card-img-left"
        src={veteran.imageUrl ? veteran.imageUrl : NoAvatarImage}
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
        <h4 className="h4-sm">{veteran.name}</h4>
        <p>{veteran.birthDate}</p>
      </div>
    </div>
  );
};
