import React from "react";
import { Hero } from "@/widgets/hero";
import { DocumentListWidget } from "@/widgets/document-list-widget";
import { BasketIconWidget } from "@/widgets/basket-icon-widget/BasketIconWidget";

const DocumentListPage: React.FC = () => {
  return (
    <div>
      <Hero />
      <DocumentListWidget />
      <BasketIconWidget />
    </div>
  );
};

export default DocumentListPage;
