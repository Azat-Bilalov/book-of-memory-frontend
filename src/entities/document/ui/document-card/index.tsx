import cn from "classnames";
import { Document } from "../../model";
import { API_URL } from "@/shared/config";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export type DocumentCardProps = {
  document: Document;
  onAddToBasket?: (documentId: string) => void;
  className?: string;
};

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onAddToBasket,
  className,
}) => {
  return (
    <>
      <div className={cn("card flex-row d-md-flex d-none w-100", className)}>
        <img
          className="card-img-left"
          src={`${API_URL}/files/${document.imageUrl}`}
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
        <div className="card-body w-100">
          <h4 className="card-title h4-sm">{document.title}</h4>
          <p className="card-text">{document.description}</p>
          <Link
            to={`/book-of-memory-frontend/documents/${document.id}`}
            className="btn btn-outline-primary me-3"
          >
            Подробнее
          </Link>
          {onAddToBasket && (
            <Button
              variant="outline-success"
              onClick={() => onAddToBasket(document.id)}
            >
              Добавить в корзину
            </Button>
          )}
        </div>
      </div>
      <Card className="d-md-none" style={{ width: "20rem" }}>
        <Card.Img variant="top" src={`${API_URL}/files/${document.imageUrl}`} />
        <Card.Body className="d-flex flex-column justify-content-between gap-2">
          <Card.Title>{document.title}</Card.Title>
          <Card.Text>{document.description}</Card.Text>
          <Link
            to={`/book-of-memory-frontend/documents/${document.id}`}
            className="btn btn-outline-primary"
          >
            Подробнее
          </Link>
          {onAddToBasket && (
            <Button
              variant="outline-success"
              onClick={() => onAddToBasket(document.id)}
            >
              Добавить в корзину
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
};
