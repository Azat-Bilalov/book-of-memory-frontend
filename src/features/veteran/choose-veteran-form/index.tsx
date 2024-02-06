import { setSelectedVeteranId } from "@/entities/binding/model";
import { fetchVeterans } from "@/entities/veteran/api";
import { VeteranModel } from "@/entities/veteran/model";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

export type ChooseVeteranFormProps = {
  activeVeteranId?: string;
  className?: string;
};

export const ChooseVeteranForm: React.FC<ChooseVeteranFormProps> = ({
  activeVeteranId,
  className,
}) => {
  const dispatch = useDispatch();

  const [veterans, setVeterans] = React.useState<VeteranModel[]>([]);

  const [selectedVeteran, setSelectedVeteran] = React.useState<string>(
    activeVeteranId ?? ""
  );

  const handleSave = () => {
    if (!selectedVeteran) {
      enqueueSnackbar("Выберите ветерана", { variant: "error" });
      return;
    }
    dispatch(setSelectedVeteranId(selectedVeteran));
    enqueueSnackbar("Ветеран сохранён", { variant: "success" });
  };

  React.useEffect(() => {
    fetchVeterans().then((veterans) => setVeterans(veterans));
  }, []);

  return (
    <div className={className}>
      <SnackbarProvider
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        maxSnack={3}
      />
      <Form.Select
        aria-label="veteran-choose"
        onChange={(e) => setSelectedVeteran(e.currentTarget.value)}
        value={selectedVeteran}
      >
        <option value="">Выберете ветерана</option>
        {veterans?.map((veteran) => (
          <option key={veteran.id} value={veteran.id}>
            {veteran.name}
          </option>
        ))}
      </Form.Select>
      <Button variant="outline-success" onClick={handleSave}>
        Сохранить
      </Button>
    </div>
  );
};
