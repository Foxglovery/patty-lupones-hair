const _apiUrl = "/api/customers";

export const GetCustomers = () => {
    return fetch(_apiUrl).then((res) => res.json());
}