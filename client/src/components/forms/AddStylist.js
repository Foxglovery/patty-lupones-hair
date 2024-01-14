import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { CreateStylist } from "../../data/stylistData";

export default function AddStylist() {
    const [isInactive, setIsInactive] = useState(false);
    const [stylistFName, setStylistFName] = useState("");
    const [stylistLName, setStylistLName] = useState("");
    
    const navigate = useNavigate();

    const handleFNameChange = (event) => {
        setStylistFName(event.target.value);
    }

    const handleLNameChange = (event) => {
        setStylistLName(event.target.value);
    }

    const handleToggle = () => {
        setIsInactive(!isInactive);
    }

    const toProperCase = (string) => {
        return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }

    const handleSubmit = async () => {
        var newStylist = {
            firstName: toProperCase(stylistFName),
            lastName: toProperCase(stylistLName),
            isActive: !isInactive
        };
        try {
            await CreateStylist(newStylist);
            navigate("/stylists");
        } catch (error) {
            console.error('Something went wrong', error);
        }
        
    }

  return (
    <div className="form-container">
      <Container>
        <Row>
          <Col xs={{ size: 6, offset: 3 }}>
            <Form>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                 id="firstName"
                 name="stylistFirst"
                 value={stylistFName}
                 onChange={handleFNameChange}
                 type="text"></Input>
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                 id="lastName"
                 name="stylistLast"
                 value={stylistLName}
                 onChange={handleLNameChange}
                 type="text">     
                 </Input>
              </FormGroup>
              <FormGroup>
                <Input
                id="isActive"
                name="activeCheck"
                type="checkbox"
                onChange={handleToggle}>
                </Input>
                <Label for="isActive">Create as Inactive</Label>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
