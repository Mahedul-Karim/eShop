const formReducer = function (state, action) {
  switch (action.type) {
    case "NAME_INPUT":
      return {
        ...state,
        name: action.payload,
      };
    case "AVATAR_INPUT":
      return {
        ...state,
        avatar: action.payload,
      };
    case "AVATAR_PREVIEW":
      return {
        ...state,
        avatarPreview: action.payload,
      };
    case "EMAIL_INPUT":
      return {
        ...state,
        email: action.payload,
      };
    case "PASSWORD_INPUT":
      return {
        ...state,
        password: action.payload,
      };
    case "EMPTY_FORM":
      return{
        ...state,
        name:'',
        email:'',
        password:'',
        avatar:'',
        avatarPreview:''
      }
    default:
      return state;
  }
};
export default formReducer;
