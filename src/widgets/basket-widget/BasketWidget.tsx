import { Button, Container } from "react-bootstrap";
import {
  deleteDocumentFromBasket,
  removeBasket,
  submitBasket,
  useDocumentsInBasket,
  useEnteredBindingId,
  useSelectedVeteranId,
} from "@/entities/binding/model";
import { DocumentCard } from "@/entities/document/ui/document-card";
import TrashIcon from "./TrashSvg.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { ChooseVeteranForm } from "@/features/veteran/choose-veteran-form";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";

export const BasketWidget = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const enteredBindingId = useEnteredBindingId();
  const documentInBasket = useDocumentsInBasket();
  const selectedVeteranId = useSelectedVeteranId();

  const handleSubmit = () => {
    if (!selectedVeteranId) {
      enqueueSnackbar("Выберите ветерана", { variant: "error" });
      return;
    }
    dispatch(submitBasket());
    navigate("/book-of-memory-frontend/documents");
  };

  const handleDelete = () => {
    dispatch(removeBasket());
    navigate("/book-of-memory-frontend/documents");
  };

  const handleDeleteDocumentFromBasket = (id: string) => {
    dispatch(deleteDocumentFromBasket(id));
  };

  if (enteredBindingId && documentInBasket.length === 0) {
    return (
      <Container className="d-grid gap-4 mb-4" style={{ marginTop: "100px" }}>
        <h1 className="h1 text-center">Корзина пуста</h1>
        <Button onClick={() => navigate("/book-of-memory-frontend/documents")}>
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
        activeVeteranId={selectedVeteranId || undefined}
      />

      {!enteredBindingId && (
        <Navigate to="/book-of-memory-frontend/documents" />
      )}

      <h1 className="h1 text-center">Составление заявки</h1>
      <div className="d-grid d-md-flex justify-content-center gap-3">
        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
          {documentInBasket.map((document) => (
            <div key={document.id} className="d-flex gap-3 align-items-center">
              <DocumentCard document={document} />
              <img
                src={TrashIcon}
                onClick={() => handleDeleteDocumentFromBasket(document.id)}
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

      <div className="d-flex justify-content-center gap-3 mb-3">
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
