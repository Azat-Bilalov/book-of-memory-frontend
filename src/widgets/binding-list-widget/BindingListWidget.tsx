import { Button, Container, Form, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  BindingModel,
  setDateFrom,
  setDateTo,
  setStatus,
  useBindingsFilter,
  useCreatedBindings,
} from "@/entities/binding/model";
import { STATUS_MAP } from "./lib";
import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import s from "./BindingListWidget.module.scss";

export const BindingListWidget = () => {
  const dispatch = useDispatch();

  const { dateFrom, dateTo, status } = useBindingsFilter();

  const [bindings, setBindings] = React.useState<BindingModel[]>([]);
  const createdBindings = useCreatedBindings();

  const handleDateFromChange = (value: string) => {
    dispatch(setDateFrom(value));
  };

  const handleDateToChange = (value: string) => {
    dispatch(setDateTo(value));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(e.currentTarget.value));
  };

  const [selectedBinding, setSelectedBinding] =
    React.useState<BindingModel | null>(null);

  React.useEffect(() => {
    setSelectedBinding(null);

    const filteredBindings = createdBindings.reduce<BindingModel[]>(
      (acc, b) => {
        if (dateFrom && new Date(b.formattedAt) < new Date(dateFrom)) {
          return acc;
        }
        if (dateTo && new Date(b.formattedAt) > new Date(dateTo)) {
          return acc;
        }
        if (status && b.status !== status) {
          return acc;
        }

        return [...acc, b];
      },
      []
    );

    setBindings(filteredBindings);
  }, [status, dateFrom, dateTo, createdBindings]);

  return (
    <Container className="d-grid gap-4 mb-5" style={{ marginTop: "90px" }}>
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
          title="Дата начала формирования заявки"
        />
        <Form.Control
          type="date"
          value={dateTo}
          placeholder="Дата окончания"
          onChange={(e) => handleDateToChange(e.target.value)}
          title="Дата окончания формирования заявки"
        />
      </div>

      <h1 className="h1 text-center">Заявки</h1>

      <Table bordered hover>
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Статус</th>
            <th>Дата создания</th>
            <th>Дата оформления</th>
            <th>Дата завершения</th>
          </tr>
        </thead>
        <tbody>
          {/* todo: улучшить */}
          {bindings.map((binding) => (
            <tr
              key={binding.id}
              onClick={() => setSelectedBinding(binding)}
              className={cn({
                "table-active": selectedBinding?.id === binding.id,
              })}
            >
              <td>{binding.id}</td>
              <td>{STATUS_MAP[binding.status as keyof typeof STATUS_MAP]}</td>
              <td>
                {binding.createdAt
                  ? new Date(binding.createdAt).toLocaleString()
                  : "--"}
              </td>
              <td>
                {binding.formattedAt
                  ? new Date(binding.formattedAt).toLocaleString()
                  : "--"}
              </td>
              <td>
                {binding.endedAt
                  ? new Date(binding.endedAt).toLocaleString()
                  : "--"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Контроллеры */}
      {selectedBinding && (
        <div
          className={cn(
            "d-flex justify-content-center gap-3",
            s.rootControllers
          )}
        >
          <Link to={`/book-of-memory-frontend/binding/${selectedBinding.id}`}>
            <Button variant="outline-primary">Просмотреть</Button>
          </Link>
        </div>
      )}
    </Container>
  );
};
