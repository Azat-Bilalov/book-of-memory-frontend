import { Button, Form } from "react-bootstrap";
import { API_URL } from "@/shared/config";
import { useNavigate } from "react-router-dom";
import {
  useCreateVeteranMutation,
  useUpdateVeteranMutation,
} from "@/entities/veteran/api";
import { Veteran } from "@/entities/veteran/model";

export type VeteranFormProps = {
  className?: string;
  veteran?: Veteran;
};

export const VeteranForm: React.FC<VeteranFormProps> = ({
  className,
  veteran,
}) => {
  const [addVeteran] = useCreateVeteranMutation();
  const [updateVeteran] = useUpdateVeteranMutation();

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (veteran?.id) {
      updateVeteran({
        id: veteran.id,
        body: formData,
      });
      navigate("/book-of-memory-frontend/veterans");
    } else {
      addVeteran(formData);
      navigate("/book-of-memory-frontend/veterans");
    }
  };

  return (
    <Form className={className} onSubmit={handleSubmit}>
      {veteran?.imageUrl && (
        <div className="d-flex justify-content-center mb-3">
          <img
            src={`${API_URL}/files/${veteran?.imageUrl}`}
            style={{
              maxHeight: "300px",
            }}
          />
        </div>
      )}
      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Фамилия</Form.Label>
        <Form.Control
          type="text"
          name="last_name"
          placeholder="Иванов"
          defaultValue={veteran?.lastName}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>Имя</Form.Label>
        <Form.Control
          type="text"
          name="first_name"
          placeholder="Иван"
          defaultValue={veteran?.firstName}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicMiddleName">
        <Form.Label>Отчество</Form.Label>
        <Form.Control
          type="text"
          name="patronymic"
          placeholder="Иванович"
          defaultValue={veteran?.patronymic}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicBirthDate">
        <Form.Label>Дата рождения</Form.Label>
        <Form.Control
          type="date"
          name="birth_date"
          placeholder="Дата рождения"
          defaultValue={veteran?.birthDate}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Изображение</Form.Label>
        <Form.Control
          type="file"
          placeholder="Изображение"
          name="image"
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Сохранить
      </Button>
    </Form>
  );
};
