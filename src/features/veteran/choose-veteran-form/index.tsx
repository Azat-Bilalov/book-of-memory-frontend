import { useUpdateBindingMutation } from "@/entities/binding/api";
import { useGetVeteransQuery } from "@/entities/veteran/api";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React from "react";
import { Button, Form } from "react-bootstrap";

export type ChooseVeteranFormProps = {
  basketId: string;
  activeVeteranId?: string;
  className?: string;
};

export const ChooseVeteranForm: React.FC<ChooseVeteranFormProps> = ({
  basketId,
  activeVeteranId,
  className,
}) => {
  const [updateBasket, { isSuccess, isError }] = useUpdateBindingMutation();
  const { data: veterans } = useGetVeteransQuery({ name: "" });

  const [selectedVeteranId, setSelectedVeteranId] = React.useState<string>(
    activeVeteranId ?? ""
  );

  const handleSave = () => {
    if (!selectedVeteranId) {
      enqueueSnackbar("Выберите ветерана", { variant: "error" });
      return;
    }
    updateBasket({ bindingId: basketId, veteranId: selectedVeteranId });
  };

  React.useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("Ветеран установлен", { variant: "success" });
    }
    if (isError) {
      enqueueSnackbar("Не удалось установить ветерана", { variant: "error" });
    }
  }, [isSuccess, isError]);

  return (
    <div className={className}>
      <SnackbarProvider
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        maxSnack={3}
      />
      <Form.Select
        aria-label="veteran-choose"
        onChange={(e) => setSelectedVeteranId(e.currentTarget.value)}
        value={selectedVeteranId}
      >
        <option value="">Выберете ветерана</option>
        {veterans?.map((veteran) => (
          <option key={veteran.id} value={veteran.id}>
            {veteran.firstName} {veteran.lastName} {veteran.patronymic}
          </option>
        ))}
      </Form.Select>
      <Button variant="outline-success" onClick={handleSave}>
        Сохранить
      </Button>
    </div>
  );
};
