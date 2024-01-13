import DocumentSearch from "@/features/document/ui";
import {
  useAddDocumentToBindingMutation,
  useGetDocumentsQuery,
} from "@/entities/document/api";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { Container } from "react-bootstrap";
import DocumentList from "@/entities/document/ui/document-card-list";
import { useDispatch } from "react-redux";
import { setQuery } from "@/entities/document/model/slice";
import React from "react";
import { capitalize } from "@/shared/lib";
import { useIsAuth, useRole } from "@/entities/session/model";
import { useDocumentQuery } from "@/entities/document/model";

export const DocumentListWidget = () => {
  const query = useDocumentQuery();
  const dispatch = useDispatch();

  const isAuth = useIsAuth();

  const { data, isLoading, refetch } = useGetDocumentsQuery(query);
  const [addToBasket, { isSuccess: isAddedToBasket, error: addToBasketError }] =
    useAddDocumentToBindingMutation();

  const handleSearch = (query: string) => {
    dispatch(setQuery(query));
    refetch();
  };

  const handleAddToBasket = (documentId: string) => {
    addToBasket(documentId);
  };

  React.useEffect(() => {
    if (isAddedToBasket) {
      enqueueSnackbar("Документ добавлен в корзину", { variant: "success" });
    }
    if (addToBasketError && "data" in addToBasketError) {
      const error = addToBasketError.data as string;
      enqueueSnackbar(capitalize(error), { variant: "error" });
    }
  }, [isAddedToBasket, addToBasketError]);

  return (
    <Container className="d-grid gap-4 mb-3" style={{ marginTop: "100px" }}>
      <h1 className="text-center">Список документов</h1>

      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />

      <DocumentSearch onSearch={handleSearch} defaultQuery={query} />

      {isLoading && <p>Загрузка...</p>}
      {data && (
        <DocumentList
          documents={data.documents}
          onAddToBasket={isAuth ? handleAddToBasket : undefined}
        />
      )}

      {!isLoading && data?.documents.length === 0 && (
        <h5>По запросу "{query}" ничего не найдено</h5>
      )}
    </Container>
  );
};
