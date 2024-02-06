import React from "react";
import { BindingDetailedWidget } from "@/widgets/binding-detailed-widget";
import { useEnteredBindingId } from "@/entities/binding/model";
import { useParams } from "react-router-dom";
import { BasketWidget } from "@/widgets/basket-widget";

const BindingDetailedPage: React.FC = () => {
  const { id } = useParams();
  const enteredBindingId = useEnteredBindingId();

  return (
    <div>
      {enteredBindingId?.toString() === id ? (
        <BasketWidget />
      ) : (
        <BindingDetailedWidget />
      )}
    </div>
  );
};

export default BindingDetailedPage;
