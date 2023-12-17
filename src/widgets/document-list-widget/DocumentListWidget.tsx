import DocumentSearch from "@/features/document/ui";
import { useGetDocumentsQuery } from "@/entities/document/api";
import { Container } from "react-bootstrap";
import DocumentList from "@/entities/document/ui/document-card-list";
import { useDispatch, useSelector } from "react-redux";
import { selectQuery, setQuery } from "@/entities/document/model/slice";

export const DocumentListWidget = () => {
  const query = useSelector(selectQuery);
  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useGetDocumentsQuery(query);

  const handleSearch = (query: string) => {
    dispatch(setQuery(query));
    refetch();
  };

  return (
    <Container className="mt-2 d-grid gap-4">
      <DocumentSearch onSearch={handleSearch} defaultQuery={query} />
      {isLoading && <p>Загрузка...</p>}
      {data && <DocumentList documents={data.documents} />}
      {!isLoading && data?.documents.length === 0 && (
        <h5>По запросу "{query}" ничего не найдено</h5>
      )}
    </Container>
  );
};
