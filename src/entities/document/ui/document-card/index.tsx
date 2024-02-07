import cn from "classnames";
import { DocumentModel } from "../../model";
import { API_URL } from "@/shared/config";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import s from "./index.module.scss";

export type DocumentCardProps = {
  document: DocumentModel;
  onAddToBasket?: (document: DocumentModel) => void;
  className?: string;
};

const noDocumentImage =
  "https://media.istockphoto.com/id/1227108087/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5-%D0%B4%D0%BE%D0%BF%D1%83%D1%81%D0%BA%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0-%D0%BD%D0%B5%D1%82-%D0%B7%D0%BD%D0%B0%D0%BA%D0%B0-%D1%84%D0%B0%D0%B9%D0%BB%D0%B0-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80.jpg";

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
          className={cn("card-img-left", s.document__brokenImage)}
          src={imageSrc}
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
          onError={(e) => {
            e.currentTarget.src = noDocumentImage;
          }}
          alt="Документ"
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
        <Card.Img variant="top" src={document.imageUrl} />
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
