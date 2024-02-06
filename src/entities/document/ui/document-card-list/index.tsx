import React from "react";
import { DocumentCard } from "../document-card";
import { DocumentModel } from "../../model";

interface DocumentListProps {
  documents: DocumentModel[];
  onAddToBasket?: (document: DocumentModel) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onAddToBasket,
}) => {
  return (
    <div className="container d-md-flex d-grid flex-wrap justify-content-center gap-3">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          onAddToBasket={onAddToBasket}
        />
      ))}
    </div>
  );
};

export default DocumentList;
