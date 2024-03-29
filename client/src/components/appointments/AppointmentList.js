import moment from 'moment';


import { useEffect, useState } from "react";
import { DeleteAppointment, GetAppointments } from "../../data/appointmentData";
import { Button, Table } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import './AppointmentList.css'


export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetAppointments().then(setAppointments);
  }, []);

  const handleDelete = (id) => {
    DeleteAppointment(id).then(() => {
      GetAppointments().then(setAppointments);
    })
  }

  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>Appointments</h4>
      </div>
      <Button 
      color="primary"
      className='book-button'
      onClick={() => navigate("create")} 
      >Book New Appointment</Button>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Customer</th>
            <th>Stylist</th>
            <th>Services</th>
            <th>Total Cost</th>
            <th>Scheduled For</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={`appointments-${a.id}`}>
              <th scope="row">{a.id}</th>
              <td>{a.customer.firstName} {a.customer.lastName}</td>
              <td>{a.stylist.firstName} {a.stylist.lastName}</td>
              <td>{a.services.map((s) => (
                <div>{s.name}</div>
              ))}</td>
              <td>${a.totalPrice}</td>
              <td>{moment(a.scheduledFor).format('MMMM Do YYYY, h:mm a')}</td>
              <td>
              <Button 
              color="danger"
              onClick={() => handleDelete(a.id)}
              >Cancel</Button>
              </td>
              
              
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
  
    // <div className="appointment-card-container">
    //   {appointments.map((a) => (
    //     <MDBCard className="appointment-card" alignment="center">
    //     <MDBCardHeader>{a.customer.firstName} {a.customer.lastName}</MDBCardHeader>
    //     <MDBCardBody>
    //       <MDBCardTitle></MDBCardTitle>
    //       <MDBCardText> <span className="bold-big">Will Undergo</span>
    //         {a.services.map((s) => (
    //             <div>{s.name}</div>
    //         ))}
    //       </MDBCardText>
    //       <MDBBtn href="#">Button</MDBBtn>
    //     </MDBCardBody>
    //     <MDBCardFooter className="text-muted">{a.stylist.firstName}</MDBCardFooter>
    //   </MDBCard>
    //   ))};
      
    // </div>
  
}
