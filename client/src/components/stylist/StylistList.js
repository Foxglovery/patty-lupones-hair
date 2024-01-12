import { useEffect, useState } from "react";
import { GetStylists } from "../../data/stylistData";

import React from "react";
import { Button, Table } from "reactstrap";



export default function StylistList() {
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    GetStylists().then(setStylists);
  }, []);

  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>Patrons</h4>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {stylists.map((s) => (
            <tr key={`stylists-${s.id}`}>
              <th scope="row">{s.id}</th>
              <td>{s.firstName}</td>
              <td>{s.lastName}</td>
              <td>{s.isActive ? "Active" : "Not Active"}</td>
              
              <td>{s.isActive ? 
              <Button
              // onClick={() => handleDeactivate(p.id)}
              >Deactivate</Button> : 
              <Button
              // onClick={() => handleReactivate(p.id)}
              >Reactivate
              </Button>
              }</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
  
    // <div className="stylist-card-container">
    //   {stylists.map((s) => (
    //     <MDBCard className="stylist-card" alignment="center">
    //       {/* removed header and MDBCardText because not needed rn */}
    //       {/* <MDBCardHeader>Featured</MDBCardHeader> */}
    //       <MDBCardBody>
    //         <MDBCardTitle>
    //           {s.firstName} {s.lastName}
    //         </MDBCardTitle>

    //         {s.isActive ? (
    //           <MDBBtn href="#">Deactivate</MDBBtn>
    //         ) : (
    //           <MDBBtn href="#">Activate</MDBBtn>
    //         )}
    //       </MDBCardBody>
    //       <MDBCardFooter className="text-muted">
    //         {s.isActive ? "Active" : "Inactive"}
    //       </MDBCardFooter>
    //     </MDBCard>
    //   ))}
    // </div>
  
}
