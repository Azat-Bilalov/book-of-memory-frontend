import React from "react";
import { DocumentListWidget } from "@/widgets/document-list-widget";
import { BasketIconWidget } from "@/widgets/basket-icon-widget";

const DocumentListPage: React.FC = () => {
  return (
    <>
      <DocumentListWidget />
      <BasketIconWidget />
    </>
  );
};

export default DocumentListPage;
