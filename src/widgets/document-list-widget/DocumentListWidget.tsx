import React from "react";
import {
  DocumentModel,
  setQuery,
  useDocumentQuery,
} from "@/entities/document/model";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import DocumentSearch from "@/features/document/ui";
import { fetchDocuments } from "@/entities/document/api";
import { Container } from "react-bootstrap";
import DocumentList from "@/entities/document/ui/document-card-list";
import { useDispatch } from "react-redux";
import {
  addDocumentToBasket,
  setCreatedAt,
  setEnteredBindingId,
  useDocumentsInBasket,
  useEnteredBindingId,
} from "@/entities/binding/model";
import { idGenerator } from "@/shared/lib/idGenerator";

export const DocumentListWidget = () => {
  const query = useDocumentQuery();
  const enteredBindingId = useEnteredBindingId();
  const documentInBasket = useDocumentsInBasket();
  const dispatch = useDispatch();

  const [documents, setDocuments] = React.useState<DocumentModel[]>([]);

  const handleSearch = (query: string) => {
    dispatch(setQuery(query));
  };

  const handleAddToBasket = (document: DocumentModel) => {
    if (documentInBasket.find((d) => document.id === d.id)) {
      enqueueSnackbar("Документ уже добавлен", { variant: "error" });
      return;
    }

    dispatch(addDocumentToBasket(document));
    enqueueSnackbar("Документ добавлен в корзину", { variant: "success" });

    if (!enteredBindingId) {
      dispatch(setEnteredBindingId(idGenerator()));
      dispatch(setCreatedAt(new Date().toLocaleString()));
    }
  };

  React.useEffect(() => {
    fetchDocuments(query).then((documents: DocumentModel[]) =>
      setDocuments(documents)
    );
  }, [query]);

  return (
    <Container className="d-grid gap-4 mb-3" style={{ marginTop: "100px" }}>
      <h1 className="h1 text-center">Документы</h1>

      <DocumentSearch onSearch={handleSearch} defaultQuery={query} />

      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />

      <DocumentList documents={documents} onAddToBasket={handleAddToBasket} />
      {/* 
      {documents.length === 0 && (
        <h5>По запросу "{query}" ничего не найдено</h5>
      )} */}
    </Container>
  );
};
