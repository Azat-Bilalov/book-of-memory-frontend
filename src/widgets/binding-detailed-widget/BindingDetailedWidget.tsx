import { Container } from "react-bootstrap";
import { useGetBindingQuery } from "@/entities/binding/api";
import { fromUUIDToInt } from "@/entities/binding/lib/fromUUIDToInt";
import { useParams } from "react-router-dom";
import Breadcrumb from "@/shared/ui/breadcrumb";

import { VeteranCard } from "@/entities/veteran/ui";
import DocumentList from "@/entities/document/ui/document-card-list";

export const BindingDetailedWidget = () => {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  const { data: binding, isLoading } = useGetBindingQuery(id ?? "");

  if (
    !id ||
    !binding ||
    binding.status === "entered" ||
    binding.status === "deleted" ||
    (role === "user" && binding.userId !== userId)
  ) {
    return <h1>Заявка не найдена</h1>;
  }

  return (
    <Container className="d-grid gap-4" style={{ marginTop: "80px" }}>
      <h1 className="h1 text-center">Заявка #{fromUUIDToInt(binding.id)}</h1>

      {isLoading && <p>Загрузка...</p>}
      <Breadcrumb
        items={[
          { text: "Заявки", href: "/book-of-memory-frontend/bindings" },
          { text: fromUUIDToInt(binding.id).toString(), active: true },
        ]}
      />

      {binding.veteran && <VeteranCard veteran={binding.veteran} />}

      {binding.documents && <DocumentList documents={binding.documents} />}
    </Container>
  );
};
