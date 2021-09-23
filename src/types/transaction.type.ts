export interface ITransaction{
    key: number;
    sdt: string;
    status: string;
    product: string;
    invoice: string;
    transaction_id: number;
    platform_payment: string;
    payment_type: string;
    payment_method: string;
    gia_goc: number;
    money: number;
    promotion: string;
    created_date: string;
    payment_date: string;
    payment_error: string;
}