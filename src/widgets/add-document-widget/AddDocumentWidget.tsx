import { useGetDocumentQuery } from "@/entities/document/api";
import { useRole } from "@/entities/session/model";
import { DocumentForm } from "@/features/document/ui/DocumentForm";
import { Container } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";

export const AddDocumentWidget = () => {
  const { id } = useParams();
  const role = useRole();

  const { data: document } = useGetDocumentQuery(id ?? "");

  if (id && role !== "moderator") {
    return <Navigate to="/book-of-memory-frontend/" />;
  }

  return (
    <Container
      className="d-grid gap-4 justify-content-center"
      style={{ marginTop: "90px" }}
    >
      {id ? (
        <h1 className="text-center">Редактирование документа</h1>
      ) : (
        <h1 className="text-center">Добавление документа</h1>
      )}
      <DocumentForm document={document} />
    </Container>
  );
};
