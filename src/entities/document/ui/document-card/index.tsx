import cn from "classnames";
import { DocumentModel } from "../../model";
import { API_URL } from "@/shared/config";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export type DocumentCardProps = {
  document: DocumentModel;
  onAddToBasket?: (document: DocumentModel) => void;
  className?: string;
};

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  className,
  onAddToBasket,
}) => {
  const imageSrc = document.imageUrl.includes("data")
    ? document.imageUrl
    : `${API_URL}/${document.imageUrl}`;

  return (
    <>
      <div className={cn("card flex-row d-md-flex d-none w-100", className)}>
        <img
          className="card-img-left"
          src={imageSrc}
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
        <div className="card-body w-100">
          <h4 className="card-title h4-sm">{document.title}</h4>
          <p className="card-text">{document.description}</p>
          <Link
            to={`/book-of-memory-frontend/document/${document.id}`}
            className="btn btn-outline-primary"
          >
            Подробнее
          </Link>
          {onAddToBasket && (
            <Button
              onClick={() => onAddToBasket(document)}
              variant="outline-success mx-2"
            >
              Добавить в заявку
            </Button>
          )}
        </div>
      </div>
      <Card className="d-md-none" style={{ width: "20rem" }}>
        <Card.Img variant="top" src={`${API_URL}/${document.imageUrl}`} />
        <Card.Body>
          <Card.Title>{document.title}</Card.Title>
          <Card.Text>{document.description}</Card.Text>
          <Link
            to={`/book-of-memory-frontend/document/${document.id}`}
            className="btn btn-outline-primary"
          >
            Подробнее
          </Link>
          {onAddToBasket && (
            <Button
              onClick={() => onAddToBasket(document)}
              variant="outline-success mx-2"
            >
              Добавить в заявку
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
};
