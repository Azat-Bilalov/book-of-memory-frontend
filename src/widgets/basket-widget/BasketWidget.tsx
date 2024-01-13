import { Button, Container } from "react-bootstrap";
import { useDeleteDocumentFromBindingMutation } from "@/entities/document/api";
import { useEnteredBindingId } from "@/entities/binding/model";
import {
  useDeleteBindingMutation,
  useGetBindingQuery,
  useSubmitBindingMutation,
} from "@/entities/binding/api";
import React from "react";
import { DocumentCard } from "@/entities/document/ui/document-card";
import TrashIcon from "./TrashSvg.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { ChooseVeteranForm } from "@/features/veteran/choose-veteran-form";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

export const BasketWidget = () => {
  const navigate = useNavigate();

  const enteredBindingId = useEnteredBindingId();
  const { data: basket, isLoading } = useGetBindingQuery(
    enteredBindingId ?? "1"
  );

  const [deleteDocumentFromBinding] = useDeleteDocumentFromBindingMutation();

  const [submitBasket, { isSuccess: isSuccessSubmit, error: submitError }] =
    useSubmitBindingMutation();
  const [deleteBasket, { isSuccess: isSuccessDelete, error: deleteError }] =
    useDeleteBindingMutation();

  const handleSubmit = () => {
    if (!basket?.veteranId) {
      enqueueSnackbar("Выберите ветерана", { variant: "error" });
    }
    submitBasket(enteredBindingId!);
  };

  const handleDelete = () => {
    deleteBasket(enteredBindingId!);
  };

  React.useEffect(() => {
    if (submitError) {
      enqueueSnackbar("Не удалось оформить заявку", { variant: "error" });
    }
    if (deleteError) {
      enqueueSnackbar("Не удалось удалить заявку", { variant: "error" });
    }
  }, [submitError, deleteError]);

  if (!enteredBindingId || !basket?.documents!.length) {
    return (
      <Container className="d-grid gap-4 mb-4" style={{ marginTop: "100px" }}>
        <h1 className="h1 text-center">Корзина пуста</h1>
        <Button onClick={() => navigate("/book-of-memory-frontend")}>
          Вернуться к документам
        </Button>
      </Container>
    );
  }

  return (
    <Container className="d-grid gap-4" style={{ marginTop: "100px" }}>
      <SnackbarProvider
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        maxSnack={3}
      />

      <ChooseVeteranForm
        className="d-flex justify-content-center gap-3"
        basketId={enteredBindingId}
        activeVeteranId={basket?.veteranId}
      />

      {isLoading && <p>Загрузка...</p>}
      {(isSuccessSubmit || isSuccessDelete) && (
        <Navigate to="/book-of-memory-frontend" />
      )}

      <h1 className="h1 text-center">Составление заявки</h1>
      <div className="d-grid d-md-flex justify-content-center gap-3">
        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
          {basket?.documents.map((document) => (
            <div key={document.id} className="d-flex gap-3 align-items-center">
              <DocumentCard document={document} />
              <img
                src={TrashIcon}
                onClick={() => deleteDocumentFromBinding(document.id)}
                style={{
                  maxWidth: "30px",
                  maxHeight: "30px",
                  cursor: "pointer",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Оформить заявку
        </Button>
        <Button variant="outline-danger" type="submit" onClick={handleDelete}>
          Удалить заявку
        </Button>
      </div>
    </Container>
  );
};
