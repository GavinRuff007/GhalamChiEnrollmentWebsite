export const createEmptyInstallments = (count) =>
  Array.from({ length: count }, () => ({
    feeOption: "",
    customFee: "",
    date: "",
  }));
