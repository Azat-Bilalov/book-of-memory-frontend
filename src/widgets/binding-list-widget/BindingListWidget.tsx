import { Button, Container, Form, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  Binding,
  setDateFrom,
  setDateTo,
  setNameFilter,
  setStatus,
  useBindingsFilter,
} from "@/entities/binding/model";
import {
  useAcceptRejectBindingMutation,
  useGetBindingsQuery,
} from "@/entities/binding/api";
import { STATUS_MAP } from "./lib";
import React, { useEffect } from "react";
import { fromUUIDToInt } from "@/entities/binding/lib/fromUUIDToInt";
import { Link } from "react-router-dom";
import { useRole, useUserId } from "@/entities/session/model";
import cn from "classnames";

import s from "./BindingListWidget.module.scss";

export const BindingListWidget = () => {
  const dispatch = useDispatch();
  const role = useRole();

  const { dateFrom, dateTo, status, nameFilter } = useBindingsFilter();

  const {
    data: bindings,
    isLoading,
    refetch,
  } = useGetBindingsQuery({
    date_from: dateFrom,
    date_to: dateTo,
    status,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [refetch]);

  const handleDateFromChange = (value: string) => {
    dispatch(setDateFrom(value));
  };

  const handleDateToChange = (value: string) => {
    dispatch(setDateTo(value));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(e.currentTarget.value));
  };

  const handleNameFilterChange = (value: string) => {
    dispatch(setNameFilter(value));
    setFilter({
      filter: (binding: Binding) =>
        !binding.user ||
        binding.user.firstName.includes(value) ||
        binding.user.lastName.includes(value),
    });
  };

  const [selectedBinding, setSelectedBinding] = React.useState<Binding | null>(
    null
  );

  const [filter, setFilter] = React.useState<{
    filter: (binding: Binding) => boolean;
  }>({
    filter: () => true,
  });

  const [acceptRejectBinding] = useAcceptRejectBindingMutation();

  const userId = useUserId();

  const handleAccept = () => {
    if (!selectedBinding) {
      return;
    }
    acceptRejectBinding({
      id: selectedBinding.id,
      status: "completed",
    });
    setSelectedBinding(null);
  };

  const handleReject = () => {
    if (!selectedBinding) {
      return;
    }
    acceptRejectBinding({
      id: selectedBinding.id,
      status: "canceled",
    });
    setSelectedBinding(null);
  };

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

        {role === "moderator" && (
          <Form.Control
            type="text"
            value={nameFilter}
            placeholder="Имя создателя"
            onChange={(e) => handleNameFilterChange(e.target.value)}
            title="Дата окончания формирования заявки"
          />
        )}
      </div>

      {isLoading && <p>Загрузка...</p>}
      <h1 className="h1 text-center">Заявки</h1>

      <Table bordered hover>
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Статус</th>
            <th>Дата создания</th>
            <th>Дата оформления</th>
            <th>Дата завершения</th>
            {role === "moderator" && <th>Создатель заявки</th>}
          </tr>
        </thead>
        <tbody>
          {/* todo: улучшить */}
          {bindings?.filter(filter.filter).map((binding) => (
            <tr
              key={binding.id}
              onClick={() => setSelectedBinding(binding)}
              className={cn({
                "table-active": selectedBinding?.id === binding.id,
                [s["root__row_warned"]]:
                  binding.status === "in_progress" &&
                  binding.moderatorId === userId,
              })}
            >
              <td>{fromUUIDToInt(binding.id)}</td>
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
              {role === "moderator" && (
                <td>
                  {binding.user?.firstName} {binding.user?.lastName}
                </td>
              )}
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
          <Link to={`/book-of-memory-frontend/bindings/${selectedBinding.id}`}>
            <Button variant="outline-primary">Просмотреть</Button>
          </Link>
          {selectedBinding.status === "in_progress" &&
            selectedBinding.moderatorId === userId && (
              <>
                <Button variant="outline-success" onClick={handleAccept}>
                  Принять
                </Button>
                <Button variant="outline-danger" onClick={handleReject}>
                  Отклонить
                </Button>
              </>
            )}
        </div>
      )}
    </Container>
  );
};
