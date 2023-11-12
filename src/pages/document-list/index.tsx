import React from "react";
import { Hero } from "@/widgets/hero";
import { DocumentListWidget } from "@/widgets/document-list-widget";

const DocumentListPage: React.FC = () => {
  return (
    <div>
      <Hero />
      <DocumentListWidget />
    </div>
  );
};

export default DocumentListPage;
