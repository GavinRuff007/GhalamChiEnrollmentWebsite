export const formatNumber = (value) =>
  value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "";
