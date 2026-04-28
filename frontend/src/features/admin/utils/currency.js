export const formatCurrency = (value) => {
  const number = Number(value || 0);
  return `${number.toLocaleString("vi-VN")} đ`;
};

export const formatNumber = (value) => Number(value || 0).toLocaleString("vi-VN");
