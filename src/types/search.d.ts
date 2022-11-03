export interface SearchCtxInterface {
  setQuery: Dispatch<SetStateAction<string>>;
  setFilter: Dispatch<SetStateAction<string>>;
  books: Book[];
  query: string;
  filter: string;
  startIndex: number;
}

interface BooksReducerAction {
  type: string;
  payload: Book[]
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export interface BooksResponse {
  totalItems: number,
  books: Book[],
}

export interface SearchInputProps {
  query: string;
  filter: string;
  setQuery: (e: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
