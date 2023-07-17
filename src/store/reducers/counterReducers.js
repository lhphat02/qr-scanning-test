const initialState = {
  count: 0,
  name: 'counter',
};

const counterReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state, // Spread operator
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state, // Spread operator
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default counterReducers;
