import React from "react";
import { DocumentModel } from "@/entities/document/models";
import DocumentSearch from "@/features/document/ui";
import { fetchDocuments } from "@/entities/document/api";
import { Container } from "react-bootstrap";
import DocumentList from "@/entities/document/ui/document-card-list";
import { useSearchParams } from "react-router-dom";

export const DocumentListWidget = () => {
  const [documents, setDocuments] = React.useState<DocumentModel[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const onSearch = (query: string) => {
    if (query === "") {
      setSearchParams({});
      return;
    }
    setSearchParams({ query });
  };

  React.useEffect(() => {
    const query = searchParams.get("query");
    fetchDocuments(query).then((documents: DocumentModel[]) =>
      setDocuments(documents)
    );
  }, [searchParams]);

  return (
    <Container className="mt-2 d-grid gap-4">
      <DocumentSearch
        onSearch={onSearch}
        defaultQuery={searchParams.get("query") || ""}
      />
      <DocumentList documents={documents} />
    </Container>
  );
};
