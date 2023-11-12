import TextInput from "@/shared/ui/text-input";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

interface DocumentSearchProps {
  defaultQuery?: string;
  onSearch: (query: string) => void;
}

export const DocumentSearch: React.FC<DocumentSearchProps> = ({
  defaultQuery = "",
  onSearch,
}) => {
  const [query, setQuery] = useState(defaultQuery);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <Form onSubmit={handleSearch}>
      <TextInput
        placeholder="Поиск документов"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </Form>
  );
};
