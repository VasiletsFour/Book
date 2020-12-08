const initialState = {
  books: [],
  role: "",
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
