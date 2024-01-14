const _apiUrl = "/api/stylists";

export const GetStylists = () => {
    return fetch(_apiUrl).then((res) => res.json());
}

export const CreateStylist = (newStylist) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(newStylist),
    }).then((res) => res.json());
    }
