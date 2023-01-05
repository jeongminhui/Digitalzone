async function networkReducer(state, action) {
  switch (action.type) {
    case "all":
      return (state = action.all);
    case "active":
      return (state = action.active);
    case "activeArr":
      return (state = action.activeArr);
    default:
      return state;
  }
}

export default networkReducer;
