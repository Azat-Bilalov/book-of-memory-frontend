import { Veteran } from "../model";
import cn from "classnames";
import NoAvatarImage from "@/assets/images/no-avatar.png";
import { API_URL } from "@/shared/config";

export type VeteranCardProps = {
  veteran: Veteran;
  className?: string;
};

export const VeteranCard = ({ veteran, className }: VeteranCardProps) => {
  return (
    <div className={cn("d-flex flex-row align-items-center gap-2", className)}>
      <img
        className="card-img-left"
        src={`${API_URL}/files/${veteran.imageUrl}` ?? NoAvatarImage}
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
          {veteran.lastName} {veteran.firstName} {veteran.patronymic}
        </h4>
        <p>{new Date(veteran.birthDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};
