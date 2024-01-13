import { Button, Form } from "react-bootstrap";
import { Document } from "@/entities/document/model";
import {
  useCreateDocumentMutation,
  useUpdateDocumentMutation,
} from "@/entities/document/api";
import { API_URL } from "@/shared/config";
import { useNavigate } from "react-router-dom";

export type DocumentFormProps = {
  className?: string;
  document?: Document;
};

export const DocumentForm: React.FC<DocumentFormProps> = ({
  className,
  document,
}) => {
  const [addDocument] = useCreateDocumentMutation();
  const [updateDocument] = useUpdateDocumentMutation();

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (document?.id) {
      updateDocument({
        id: document.id,
        body: formData,
      });
      navigate("/book-of-memory-frontend/documents/" + document.id);
    } else {
      addDocument(formData);
      navigate("/book-of-memory-frontend");
    }
  };

  return (
    <Form className={className} onSubmit={handleSubmit}>
      {document?.imageUrl && (
        <div className="d-flex justify-content-center mb-3">
          <img
            src={`${API_URL}/files/${document?.imageUrl}`}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
        </div>
      )}
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Название документа</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Название документа"
          defaultValue={document?.title}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Описание документа</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          placeholder="Описание документа"
          defaultValue={document?.description}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Изображение</Form.Label>
        <Form.Control
          type="file"
          placeholder="Изображение"
          name="image"
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Сохранить
      </Button>
    </Form>
  );
};
