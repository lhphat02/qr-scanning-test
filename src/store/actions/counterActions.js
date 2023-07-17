export const increment = () => {
  return {
    type: 'INCREMENT',
  };
};

export const decrement = () => {
  return {
    type: 'DECREMENT',
  };
};

export const reset = () => {
  return {
    type: 'RESET',
  };
};

export const set = (value) => {
  return {
    type: 'SET',
    payload: value,
  };
};

export const asyncIncrement = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, 1000);
  };
};

export const asyncDecrement = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(decrement());
    }, 1000);
  };
};

export const asyncReset = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(reset());
    }, 1000);
  };
};

export const asyncSet = (value) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(set(value));
    }, 1000);
  };
};

export const asyncIncrementBy = (value) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(incrementBy(value));
    }, 1000);
  };
};

export const incrementBy = (value) => {
  return {
    type: 'INCREMENT_BY',
    payload: value,
  };
};

export const asyncDecrementBy = (value) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(decrementBy(value));
    }, 1000);
  };
};

export const decrementBy = (value) => {
  return {
    type: 'DECREMENT_BY',
    payload: value,
  };
};

export const asyncSetBy = (value, by) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(setBy(value, by));
    }, 1000);
  };
};

export const setBy = (value, by) => {
  return {
    type: 'SET_BY',
    payload: value,
    by: by,
  };
};
