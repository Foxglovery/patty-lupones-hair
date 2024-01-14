const _apiUrl = "/api/appointments";

export const GetAppointments = () => {
    return fetch(_apiUrl).then((res) => res.json());
}

export const CreateAppointment = (newAppointmentDTO) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(newAppointmentDTO),
    }).then((res) => res.json());
}

export const DeleteAppointment = (id) => {
    return fetch(`${_apiUrl}?id=${id}`, {
        method: "DELETE",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok.`)
        }
        return response.json();
    })
    .catch(error => {
        console.error(`There was a problem during deletion`)
    });
}