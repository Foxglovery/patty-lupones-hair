import { useEffect, useState } from "react";
import { GetCustomers } from "../../data/customerData";
import { GetStylists } from "../../data/stylistData";
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Container,
  Row,
  Col,
} from "reactstrap";
import DateTimePicker from "react-datetime-picker";
import { GetServices } from "../../data/serviceData";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import TestDateTimePicker from "../datetime/slotpicker";
import { CreateAppointment, GetAppointments } from "../../data/appointmentData";
import { useNavigate } from 'react-router-dom';

export default function BookAppointment() {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [stylistId, setStylistId] = useState();
  const [services, setServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [servicesSelected, setServicesSelected] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetCustomers().then(setCustomers);
    GetStylists().then(setStylists);
    GetServices().then(setServices);
    GetAppointments().then(setAppointments);
  }, []);

  function handleServiceChange(serviceId) {
    setServicesSelected((prevSelected) => {
      if (prevSelected.includes(serviceId)) {
        return prevSelected.filter((id) => id !== serviceId);
      } else {
        return [...prevSelected, serviceId];
      }
    });
  }

  //define handle submit
  //define new booking as object with state props on it
  //then call create function with.then(() => {
  //navigate whereever

  const handleSubmit = (event) => {
    event.preventDefault();

    const newAppointmentDTO = {
      NewAppointment: {
        stylistId,
        customerId,
        selectedDate,
      },
      ServiceIds: servicesSelected,
    };

    //if for each appointments.scheduledFOr is within 1 hour of newAppointment
    const isConflict = appointments.some((a) => {
      const scheduledTime = new Date(a.scheduledFor);
      const newAppointmentTime = new Date(selectedDate);
      const oneHour = 360000;

      return (
        Math.abs(scheduledTime - newAppointmentTime) < oneHour &&
        a.stylistId === stylistId
      );
    });

    if (!isConflict) {
      try {
        console.log(JSON.stringify(newAppointmentDTO))
        CreateAppointment(newAppointmentDTO).then(navigate("/appointments"))
        
        // Handle successful creation (e.g., show a success message, navigate to another page)
      } catch (error) {
        // Handle errors (e.g., show an error message)
        console.error('Error creating appointment:', error);
      }
    }
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleStylistChange = (event) => {
    const value = event.target.value;
    setStylistId(parseInt(value))
  }
  const handleCustomerChange = (event) => {
    const value = event.target.value;
    setCustomerId(parseInt(value))
  }

  return (
    <div className="form-container">
      <Container>
        <Row>
          <Col xs={{ size: 6, offset: 3 }}>
            <Form>
              <FormGroup>
                <Label for="customerSelect">Select</Label>
                <Input id="customerSelect" name="customerSelect" type="select" onChange={handleCustomerChange}>
                  <option value="0">Select a Customer</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.firstName} {c.lastName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="stylistSelect">Select</Label>
                <Input id="stylistSelect" name="stylistSelect" type="select" onChange={handleStylistChange}>
                  <option value="0">Select a Stylist</option>
                  {stylists.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.lastName}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              <FormGroup>
                {services.map((s) => (
                  <div key={s.id}>
                    <Input
                      type="checkbox"
                      value={s.id}
                      checked={servicesSelected.includes(s.id)}
                      onChange={() => handleServiceChange(s.id)}
                    />{" "}
                    <Label>
                      {s.name} || ${s.price}
                    </Label>
                  </div>
                ))}
              </FormGroup>
              <Button
              onClick={handleSubmit}>Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <div>
        <TestDateTimePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onChange={handleDateChange}
          value={selectedDate}
        />
      </div>
    </div>
  );
}
