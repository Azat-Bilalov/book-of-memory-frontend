import { Button, Container } from "react-bootstrap";
import Breadcrumb from "@/shared/ui/breadcrumb";
import { Link, useParams } from "react-router-dom";
import {
  useAddDocumentToBindingMutation,
  useGetDocumentQuery,
} from "@/entities/document/api";
import { capitalize } from "@/shared/lib";

export const DocumentDetailedWidget = () => {
  const { id } = useParams<{ id: string }>();
  const { data: document, isLoading } = useGetDocumentQuery(id!);
  const [addDocumentToBinding, { isSuccess, error }] =
    useAddDocumentToBindingMutation();

  const handleAddToOrder = () => {
    addDocumentToBinding(id!);
  };

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
          src={`http://localhost:8080/${document?.imageUrl}`}
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
          <Button
            variant="outline-success"
            className="w-100"
            onClick={handleAddToOrder}
          >
            Добавить в корзину
          </Button>
          {isSuccess && (
            <p className="text-success">
              Документ добавлен в{" "}
              <Link to="/book-of-memory-frontend/basket">корзину</Link>
            </p>
          )}
          {error && "data" in error && (
            <p className="text-danger">{capitalize(error.data as string)}</p>
          )}
        </div>
      </div>
    </Container>
  );
};
