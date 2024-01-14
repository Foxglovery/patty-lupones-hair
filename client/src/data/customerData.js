const _apiUrl = "/api/customers";

export const GetCustomers = () => {
    return fetch(_apiUrl).then((res) => res.json());
}

export const CreateCustomer = (newCustomer) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(newCustomer),
    }).then((res) => res.json());
}