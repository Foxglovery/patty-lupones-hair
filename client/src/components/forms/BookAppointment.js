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
import { GetServices } from "../../data/serviceData";

export default function BookAppointment() {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [stylistId, setStylistId] = useState([]);
  const [services, setServices] = useState([]);
  const [appDate, setAppDate] = useState();
  const [servicesSelected, setServicesSelected] = useState([]);

  useEffect(() => {
    GetCustomers().then(setCustomers);
    GetStylists().then(setStylists);
    GetServices().then(setServices);
  }, []);

  function handleServiceChange(serviceId) {
    setServicesSelected((prevSelected) => {
      if (prevSelected.includes(serviceId)) {
        return prevSelected.filter(id => id !== serviceId);
      } else {
        return [...prevSelected, serviceId];
      }
    });
  }

 //define handle submit
    //define new booking as object with state props on it
    //then call create function with.then(() => {
        //navigate whereever

    const handleSubmit = () => {
        const newAppointment = {
            stylistId,
            customerId,
            // scheduledFor
        }
    };

  return (
    <div className="form-container">
        <Container>
      <Row>
        <Col xs={{ size: 6, offset: 3 }}>
          <Form>
            <FormGroup>
              <Label for="customerSelect">Select</Label>
              <Input id="customerSelect" name="customerSelect" type="select">
                <option value="0">Select a Customer</option>
                {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.firstName} {c.lastName}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="stylistSelect">Select</Label>
              <Input id="stylistSelect" name="stylistSelect" type="select">
                <option value="0">Select a Stylist</option>
                {stylists.map((s) => (
                    <option>{s.firstName} {s.lastName}</option>
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
                    />{' '}
                    <Label>{s.name} || ${s.price}</Label>
                </div>
              ))}
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
    
  );
}
