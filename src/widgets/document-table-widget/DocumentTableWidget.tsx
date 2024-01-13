import { Button, Container, Table } from "react-bootstrap";
import { fromUUIDToInt } from "@/entities/binding/lib/fromUUIDToInt";
import { Link } from "react-router-dom";
import cn from "classnames";
import {
  useDeleteDocumentMutation,
  useGetDocumentsQuery,
} from "@/entities/document/api";
import { Document } from "@/entities/document/model";
import React from "react";
import { API_URL } from "@/shared/config";

import s from "./DocumentTableWidget.module.scss";

export const DocumentTableWidget = () => {
  const { data, isLoading } = useGetDocumentsQuery("");
  const [deleteDocument] = useDeleteDocumentMutation();

  const [selectedDocument, setSelectedDocument] =
    React.useState<Document | null>(null);

  const handleDelete = () => {
    if (!selectedDocument) {
      return;
    }
    deleteDocument(selectedDocument.id);
  };

  return (
    <Container className="d-grid gap-4 mb-4" style={{ marginTop: "80px" }}>
      {isLoading && <p>Загрузка...</p>}
      <h1 className="h1 text-center">Таблица документов</h1>

      <Table bordered hover>
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Название</th>
            <th>Описание</th>
            <th>Изображение</th>
          </tr>
        </thead>
        <tbody>
          {data?.documents.map((document) => (
            <tr
              key={document.id}
              className={cn({
                "table-success": selectedDocument?.id === document.id,
              })}
              onClick={() => setSelectedDocument(document)}
            >
              <td>{fromUUIDToInt(document.id)}</td>
              <td>{document.title}</td>
              <td>{document.description}</td>
              <td>
                <img
                  src={`${API_URL}/files/${document.imageUrl}`}
                  alt="document"
                  style={{ height: "64px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Контроллеры */}
      {selectedDocument && (
        <div
          className={cn(
            "d-flex justify-content-center gap-3",
            s.rootControllers
          )}
        >
          <Link
            to={`/book-of-memory-frontend/documents/${selectedDocument.id}`}
          >
            <Button variant="outline-primary">Просмотреть</Button>
          </Link>
          <Link
            to={`/book-of-memory-frontend/documents/${selectedDocument.id}/edit`}
          >
            <Button variant="outline-warning">Редактировать</Button>
          </Link>
          <Button variant="outline-danger" onClick={handleDelete}>
            Удалить
          </Button>
        </div>
      )}
    </Container>
  );
};
