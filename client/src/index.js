import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StylistList from "./components/stylist/StylistList";
import CustomerList from "./components/customer/CustomerList";
import AppointmentList from "./components/appointments/AppointmentList";
import BookAppointment from "./components/forms/BookAppointment";

import AddStylist from "./components/forms/AddStylist";
import AddCustomer from "./components/forms/AddCustomer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="stylists">
          <Route index element={<StylistList />} />
          <Route path="create" element={<AddStylist />} />
        </Route>
        <Route path="customers">
          <Route index element={<CustomerList />} />
          <Route path="create" element={<AddCustomer />} />
        </Route>
        <Route path="appointments">
          <Route index element={<AppointmentList />} />
          <Route path="create" element={<BookAppointment />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
