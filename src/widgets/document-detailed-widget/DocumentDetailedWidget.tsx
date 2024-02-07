import React from "react";
import { DocumentModel } from "@/entities/document/model";
import { fetchDocument } from "@/entities/document/api";
import { Container } from "react-bootstrap";
import Breadcrumb from "@/shared/ui/breadcrumb";
import { useParams } from "react-router-dom";
import { API_URL } from "@/shared/config";

export const DocumentDetailedWidget = () => {
  const [document, setDocument] = React.useState<DocumentModel | null>(null);
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (!id) return;
    const document = fetchDocument(id);
    if (!document) {
      throw new Error("Документ не найден");
    }
    setDocument(document);
  }, [id]);

  if (!document) {
    return null;
  }

  const imageSrc = document.imageUrl.includes("data")
    ? document.imageUrl
    : `${API_URL}/${document.imageUrl}`;

  return (
    <Container className="d-grid gap-4 mb-3" style={{ marginTop: "60px" }}>
      <Breadcrumb
        items={[
          { text: "Документы", href: "/book-of-memory-frontend/documents" },
          { text: document.title, active: true },
        ]}
      />
      <h1 className="h1 text-center">{document?.title}</h1>
      <div className="d-grid d-md-flex justify-content-center gap-3">
        <img
          src={imageSrc}
          style={{
            maxWidth: "300px",
            maxHeight: "300px",
            objectFit: "cover",
            justifySelf: "center",
          }}
          className="rounded-3"
        />
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="text-center">{document?.description}</p>
        </div>
      </div>
    </Container>
  );
};
