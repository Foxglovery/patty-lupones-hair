import { useEffect, useState } from "react";
import { GetCustomers } from "../../data/customerData";
import { Table } from "reactstrap";


export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    GetCustomers().then(setCustomers);
  }, []);

  return (
    <div className="container">
    <div className="sub-menu bg-light">
      <h4>Customers</h4>
    </div>
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          
        </tr>
      </thead>
      <tbody>
        {customers.map((c) => (
          <tr key={`customers-${c.id}`}>
            <th scope="row">{c.id}</th>
            <td>{c.firstName}</td>
            <td>{c.lastName}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);
  
    // <div className="master-customer-container">
    //   <div className="customer-card-container">
    //     {customers.map((c) => (
    //       <MDBCard className="customer-card" alignment="center">
            
    //         <MDBCardBody>
    //           <MDBCardTitle>{c.firstName} {c.lastName}</MDBCardTitle>
    //           <MDBCardText>
                
    //           </MDBCardText>
              
    //         </MDBCardBody>
            
    //       </MDBCard>
    //     ))}
    //   </div>
    // </div>
  
}
