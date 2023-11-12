import React from "react";
import { DocumentCard } from "../document-card";
import { DocumentModel } from "../../models";

interface DocumentListProps {
  documents: DocumentModel[];
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  return (
    <div className="container d-md-flex d-grid flex-wrap justify-content-center gap-3">
      {documents.map((document) => (
        <DocumentCard key={document.id} document={document} />
      ))}
    </div>
  );
};

export default DocumentList;
