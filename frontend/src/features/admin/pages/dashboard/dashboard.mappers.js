export const mapStats = (data = {}) => {
  const revenueSystem = (data.revenue || []).reduce((sum, item) => {
    if (item.transaction_type === 4) return sum + (item.transaction_sum || 0);
    if (item.transaction_type === 5) {
      return sum + (item.transaction_sum || 0) + (item.commission_sum || 0);
    }
    return sum;
  }, 0);

  const revenueOffice = (data.revenue || []).reduce((sum, item) => {
    if (item.transaction_type === 4) return sum + (item.transaction_sum || 0);
    if (item.transaction_type === 5) return sum + (item.commission_sum || 0);
    return sum;
  }, 0);

  const monthlyRevenue = (data.monthlyRevenues || []).map((month) =>
    (month || []).reduce(
      (sum, item) => sum + (item?.transaction_sum || 0) + (item?.commission_sum || 0),
      0
    )
  );

  return {
    users: data.totalUsers || 0,
    posts: data.totalPosts || 0,
    transactions: data.totalTransactions || 0,
    revenueSystem,
    revenueOffice,
    monthlyRevenue,
    monthlyTransactions: data.monthlyTransactions || [],
  };
};
