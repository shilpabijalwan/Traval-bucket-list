export const getTextColor = (status) => {
  switch (status) {
    case "visited":
      return "text-purple-600";
    case "planning":
      return "text-orange-500";
    case "wishlist":
      return "text-blue-600";
    default:
      return "text-gray-500";
  }
};
