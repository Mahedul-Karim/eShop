export const checkoutReducer = (state, action) => {
  switch (action.type) {
    case "CITY":
      return {
        ...state,
        city: action.payload,
      };
    case "COUNTRY":
      return {
        ...state,
        country: action.payload,
      };
    case "ADDRESS1":
      return {
        ...state,
        address1: action.payload,
      };
    case "ADDRESS2":
      return {
        ...state,
        address2: action.payload,
      };
    case "ZIPCODE":
      return {
        ...state,
        zipCode: action.payload,
      };
    case "COUPON_CODE":
      return {
        ...state,
        couponCode: action.payload,
      };
    case "COUPON_CODE_DATA":
      return {
        ...state,
        couponCodeData: action.payload,
      };
    case "DISCOUNT_PRICE":
      return {
        ...state,
        discountPrice: action.payload,
      };
    default:
      return state;
  }
};
