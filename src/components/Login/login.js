import React from "react";
import "./login.css"

// reactstrap components
import {
 // UncontrolledCollapse,
  //NavbarBrand,
  //NavItem,
  //NavLink,
  //Nav,
  //Container,
  //Row,
  Alert,
  Col,
  Row,
  CardBody,
  CardTitle,
  Button,
  InputGroup,
  Input
} from "reactstrap";

class Login extends React.Component {
    render() {
        return (
            <div className='row-line' id='login-window' >  
                <Row>   
                    <Col  className='column'>
                        Helllo
                    </Col>
            <Col lg='3' md='3' sm='3' className='column left-col' >
                <br/>
                <br/>
                    <CardBody>
                        <div className='text-center'>
                        <CardTitle className='head-line'>Create-Room</CardTitle>

                        </div>
                        
                        
 
                        <InputGroup >
                            <Input classname='input-area w-50' type='text' placeholder="Room Name" id='room-name'/>
                        </InputGroup>
                        <br/>
                        <InputGroup>
                            <Input type='text' classname='input-area' placeholder="Your Name" id='your-name'/>
                        </InputGroup>
                        <br/>
                        <div className="text-center">
                  <Button className="mt-4" color="info" type="button" id='create-room'>
                    Create Room
                  </Button>
                  
                </div>
                    </CardBody>
                        <Alert color="danger" id='err-msg-box'hidden>
                            <span class="form-text small text-danger" id='err-msg'></span>
                        </Alert>
                        <div class="" id='room-created'></div>
            </Col>
            </Row> 
            </div>
 
        );
    }
}

export default Login;
