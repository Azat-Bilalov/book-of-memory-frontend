import { useGetVeteransQuery } from "@/entities/veteran/api";
import { useVeteranQuery } from "@/entities/veteran/model/hooks";
import { VeteranCard } from "@/entities/veteran/ui";
import { VeteranSearch } from "@/features/veteran/ui";
import { setQuery } from "@/entities/veteran/model";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useRole } from "@/entities/session/model";
import { Link } from "react-router-dom";

import EditIcon from "./EditIcon.svg";

export const VereranListWidget = () => {
  const dispatch = useDispatch();
  const query = useVeteranQuery();

  const role = useRole();

  const {
    data: veterans,
    isLoading,
    refetch,
  } = useGetVeteransQuery({ name: query });

  const handleSearch = (query: string) => {
    dispatch(setQuery(query));
    refetch();
  };

  return (
    <Container className="d-grid gap-4" style={{ marginTop: "80px" }}>
      <h1 className="text-center">Список ветеранов</h1>
      <VeteranSearch onSearch={handleSearch} defaultQuery={query} />
      {isLoading && <p>Загрузка...</p>}
      <div className="d-flex flex-wrap justify-content-center gap-2">
        {veterans?.map((veteran) => (
          <div className="d-flex gap-2 align-items-center" key={veteran.id}>
            <VeteranCard veteran={veteran} key={veteran.id} />
            {role === "moderator" && (
              <>
                <Link
                  to={`/book-of-memory-frontend/veterans/${veteran.id}/edit`}
                >
                  <img
                    src={EditIcon}
                    alt="Редактировать"
                    style={{ width: "24px" }}
                  />
                </Link>
              </>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
};
