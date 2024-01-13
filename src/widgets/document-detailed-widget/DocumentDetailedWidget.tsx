import { Button, Container } from "react-bootstrap";
import Breadcrumb from "@/shared/ui/breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteDocumentMutation,
  useGetDocumentQuery,
} from "@/entities/document/api";
import { API_URL } from "@/shared/config";
import { useRole } from "@/entities/session/model";

export const DocumentDetailedWidget = () => {
  const { id } = useParams<{ id: string }>();

  const { data: document, isLoading } = useGetDocumentQuery(id!);
  const [deleteDocument] = useDeleteDocumentMutation();

  const role = useRole();
  const navigate = useNavigate();

  if (!document) return null;

  return (
    <Container className="d-grid gap-4" style={{ marginTop: "60px" }}>
      {isLoading && <p>Загрузка...</p>}
      <Breadcrumb
        items={[
          { text: "Документы", href: "/book-of-memory-frontend/" },
          { text: document.title, active: true },
        ]}
      />
      <h1 className="h1 text-center">{document?.title}</h1>
      <div className="d-grid d-md-flex justify-content-center gap-3">
        <img
          src={`${API_URL}/files/${document?.imageUrl}`}
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
        {role === "moderator" && (
          <div className="d-flex align-items-center gap-2 justify-content-center">
            <Button
              variant="outline-danger"
              onClick={() => {
                deleteDocument(document.id);
                navigate("/book-of-memory-frontend");
              }}
            >
              Удалить
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => {
                navigate(
                  `/book-of-memory-frontend/documents/${document.id}/edit`
                );
              }}
            >
              Редактировать
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};
