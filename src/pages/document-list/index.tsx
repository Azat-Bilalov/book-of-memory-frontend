import React from "react";
import { DocumentListWidget } from "@/widgets/document-list-widget";
import { BasketIconWidget } from "@/widgets/basket-icon-widget/BasketIconWidget";

const DocumentListPage: React.FC = () => {
  return (
    <div>
      <DocumentListWidget />
      <BasketIconWidget />
    </div>
  );
};

export default DocumentListPage;
