import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Breadcrumb from "@/shared/ui/breadcrumb";
import { VeteranCard } from "@/entities/veteran/ui";
import DocumentList from "@/entities/document/ui/document-card-list";
import { useCreatedBindings } from "@/entities/binding/model";

export const BindingDetailedWidget = () => {
  const { id } = useParams();

  const createdBindings = useCreatedBindings();
  const binding = createdBindings.find((b) => b.id.toString() === id);

  if (
    !id ||
    !binding ||
    binding.status === "entered" ||
    binding.status === "deleted"
  ) {
    throw new Error("Заявка не найдена");
  }

  return (
    <Container className="d-grid gap-4" style={{ marginTop: "80px" }}>
      <h1 className="h1 text-center">Заявка #{binding.id}</h1>

      <Breadcrumb
        items={[
          { text: "Заявки", href: "/book-of-memory-frontend/bindings" },
          { text: binding.id.toString(), active: true },
        ]}
      />

      {binding.veteran && <VeteranCard veteran={binding.veteran} />}

      {binding.documents && <DocumentList documents={binding.documents} />}
    </Container>
  );
};
