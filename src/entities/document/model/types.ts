export type Document = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export type DocumentList = {
  documents: Document[];
  enteredBindingId: string;
};
