const _apiUrl = "/api/services";

export const GetServices = () => {
    return fetch(_apiUrl).then((res) => res.json());
}