import { Container, Form, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  setDateFrom,
  setDateTo,
  setStatus,
  useBindingsFilter,
} from "@/entities/binding/model";
import { useGetBindingsQuery } from "@/entities/binding/api";
import { STATUS_MAP } from "./lib";
import React from "react";

export const BindingWidget = () => {
  const dispatch = useDispatch();

  const { dateFrom, dateTo, status } = useBindingsFilter();

  const { data: bindings, isLoading } = useGetBindingsQuery({
    date_from: dateFrom,
    date_to: dateTo,
    status,
  });

  const handleDateFromChange = (value: string) => {
    dispatch(setDateFrom(value));
  };

  const handleDateToChange = (value: string) => {
    dispatch(setDateTo(value));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(e.currentTarget.value));
  };

  return (
    <Container className="d-grid gap-4" style={{ marginTop: "80px" }}>
      <div className="d-flex justify-content-center gap-3">
        <Form.Select
          aria-label="status-example"
          onChange={(e) => handleStatusChange(e)}
          value={status}
        >
          <option value="">Любой статус</option>
          {Object.keys(STATUS_MAP).map((status) => (
            <option key={status} value={status}>
              {STATUS_MAP[status]}
            </option>
          ))}
        </Form.Select>

        <Form.Control
          type="date"
          value={dateFrom}
          placeholder="Дата начала"
          onChange={(e) => handleDateFromChange(e.target.value)}
        />
        <Form.Control
          type="date"
          value={dateTo}
          placeholder="Дата окончания"
          onChange={(e) => handleDateToChange(e.target.value)}
        />
      </div>

      {isLoading && <p>Загрузка...</p>}
      <h1 className="h1 text-center">Заявки</h1>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Статус</th>
            <th>Дата создания</th>
            <th>Дата оформления</th>
            <th>Дата завершения</th>
          </tr>
        </thead>
        <tbody>
          {bindings?.map((binding) => (
            <tr key={binding.id}>
              <td>{STATUS_MAP[binding.status as keyof typeof STATUS_MAP]}</td>
              <td>
                {binding.createdAt &&
                  new Date(binding.createdAt).toLocaleDateString()}
              </td>
              <td>
                {binding.formattedAt &&
                  new Date(binding.formattedAt).toLocaleDateString()}
              </td>
              <td>
                {binding.endedAt &&
                  new Date(binding.endedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
