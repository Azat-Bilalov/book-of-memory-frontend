import TextInput from "@/shared/ui/text-input";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

interface VeteranSearchProps {
  defaultQuery?: string;
  onSearch: (query: string) => void;
}

export const VeteranSearch: React.FC<VeteranSearchProps> = ({
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
        placeholder="Поиск ветерана"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </Form>
  );
};
