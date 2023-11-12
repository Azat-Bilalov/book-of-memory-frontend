import cn from "classnames";
import { DocumentModel } from "../../models";
import { API_URL } from "@/shared/config";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export type DocumentCardProps = {
  document: DocumentModel;
  className?: string;
};

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  className,
}) => {
  return (
    <>
      <div className={cn("card flex-row d-md-flex d-none w-100", className)}>
        <img
          className="card-img-left"
          src={`${API_URL}/${document.imageUrl}`}
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
        </Card.Body>
      </Card>
    </>
  );
};
