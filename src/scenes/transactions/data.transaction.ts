export const dataTransactions = [
  {
    key: 1,
    sdt: "0987654321",
    status: "peding",
    product: "DEV_0987654",
    invoice: "DEV_098765",
    transaction_id: 1234,
    platform_payment: "mobile",
    payment_type: "momo",
    payment_method: "momo",
    gia_goc: 123,
    money: 12,
    promotion: "hgfd",
    created_date: "18/05/2021",
    payment_date: "18/05/2021",
    payment_error: "no",
  },
];

new Array(30).fill(undefined).forEach((item, index) => {
    dataTransactions.push({
    key: index + 2,
    sdt: "0987654321",
    status: "peding",
    product: "DEV_0987654",
    invoice: "DEV_098765",
    transaction_id: 1234,
    platform_payment: "mobile",
    payment_type: "momo",
    payment_method: "momo",
    gia_goc: 123,
    money: 12,
    promotion: "hgfd",
    created_date: "18/05/2021",
    payment_date: "18/05/2021",
    payment_error: "no",
  });
});
