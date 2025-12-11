const cleanStep3Data = (info, nationalCode) => {
  return {
    nationalCode,  // مقدار صحیح از Step1

    classInitialFee: info.classInitialFee || null,
    installment: info.installment || null,
    installmentCount: info.installmentCount || null,
    installments: info.installments || [],

    classInitialFeeForSupport: info.classInitialFeeForSupport || null,
    installmentSupport: info.installmentSupport || null,
    installmentCountSupport: info.installmentCountSupport || null,
    supportInstallments: info.supportInstallments || [],

    totalFee: Number(info.total_fee),

    payments: (info.payments || []).map((p) => ({
      type: p.type,
      amount: Number(p.amount) || 0,
      startDate: p.startDate || null,
      endDate: p.endDate || null,
    })),
  };
};

export default cleanStep3Data;
