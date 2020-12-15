import { BookApi } from "../requests/book/api";

export interface InitialState {
  books: null | Array<BookApi>;
  role: "admin" | "user" | null;
}

const initialState: InitialState = {
  books: null,
  role: null,
};

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case "BOOKS":
      return { ...state, books: action.data };
    case "ROLE":
      return { ...state, role: action.data };
    default:
      return state;
  }
}
