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