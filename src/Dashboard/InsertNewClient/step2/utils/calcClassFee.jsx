export const calcClassFee = (classInfo, subjects) => {
  return classInfo.reduce((sum, ci) => {
    const found = subjects.find((s) => s.className === ci.name);
    return found ? sum + (found.fee || 0) : sum;
  }, 0);
};
