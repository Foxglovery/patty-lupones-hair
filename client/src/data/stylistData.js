const _apiUrl = "/api/stylists";

export const GetStylists = () => {
    return fetch(_apiUrl).then((res) => res.json());
}