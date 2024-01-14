import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { CreateCustomer } from "../../data/customerData";

export default function AddCustomer() {
    
    const [customerFName, setCustomerFName] = useState("");
    const [customerLName, setCustomerLName] = useState("");
    
    const navigate = useNavigate();

    const handleFNameChange = (event) => {
        setCustomerFName(event.target.value);
    }

    const handleLNameChange = (event) => {
        setCustomerLName(event.target.value);
    }

    const toProperCase = (string) => {
        return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        var newCustomer = {
            firstName: toProperCase(customerFName),
            lastName: toProperCase(customerLName),
        };
        try {
            await CreateCustomer(newCustomer);
            navigate("/customers");
        } catch (error) {
            console.error('Something went wrong', error);
        }
        
    }
    
    return (
        <div className="form-container">
            <Container>
                <Row>
                    <Col xs={{ size: 6, offset: 3 }}>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    name="stylistFirst"
                                    value={customerFName}
                                    onChange={handleFNameChange}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    name="stylistLast"
                                    value={customerLName}
                                    onChange={handleLNameChange}
                                    type="text"
                                />
                            </FormGroup>
                            <Button type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}