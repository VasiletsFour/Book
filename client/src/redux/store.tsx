const initialState = {
  books: [],
  shoping: [],
  count: 0,
  role: '',
  authToken: '',
  refToken: ''
};

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case "BOOK":
      return { ...state, books: action.data }
    case "ROLE":
      return { ...state, role: action.data }
    case "SHOP":
      return { ...state, shoping: action.data }
    case "REMOVEBOOK":
      return { ...state, count: state.count - 1 }
    case "ADDBOOK":
      return { ...state, shoping: action.data }
    case "TOKEN":
      return { ...state, authToken: action.authToken, refToken: action.refToken }
    default:
      return state;
  }
}
