import { useRole } from "@/entities/session/model";
import { useGetVeteranQuery } from "@/entities/veteran/api";
import { VeteranForm } from "@/features/veteran/ui";
import { Container } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";

export const AddVeteranWidget = () => {
  const { id } = useParams();
  const role = useRole();

  const { data: veteran } = useGetVeteranQuery(id ?? "");

  if (id && role !== "moderator") {
    return <Navigate to="/book-of-memory-frontend/" />;
  }

  return (
    <Container
      className="d-grid gap-4 justify-content-center"
      style={{ marginTop: "90px" }}
    >
      {id ? (
        <h1>Редактирование информации о ветеране</h1>
      ) : (
        <h1>Добавление информации о ветеране</h1>
      )}
      <VeteranForm className="w-50" veteran={veteran} />
    </Container>
  );
};
