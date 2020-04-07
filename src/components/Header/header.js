import React from "react";
//import { Link } from "react-router-dom";
import "./header.css"
// reactstrap components
import {
 // UncontrolledCollapse,
  //NavbarBrand,
  Navbar,
  //NavItem,
  //NavLink,
  //Nav,
  //Container,
  //Row,
  Col
//  Row,
  //Container
} from "reactstrap";

class header extends React.Component {
  render() {
    return (
      <>
        {/* <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="px-4">
            <NavbarBrand to="/" tag={Link}>
              <img alt="..." src={require("")} />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src={require("")}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      className="navbar-toggler"
                      id="navbar-collapse-main"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className="nav-link-icon" to="/" tag={Link}>
                    <i className="ni ni-planet" />
                    <span className="nav-link-inner--text">Dashboard</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/auth/register"
                    tag={Link}
                  >
                    <i className="ni ni-circle-08" />
                    <span className="nav-link-inner--text">Register</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/auth/login"
                    tag={Link}
                  >
                    <i className="ni ni-key-25" />
                    <span className="nav-link-inner--text">Login</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/admin/user-profile"
                    tag={Link}
                  >
                    <i className="ni ni-single-02" />
                    <span className="nav-link-inner--text">Profile</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar> */}


        <Navbar
        className="App-nav"
        class='col-md-12 col-lg-12 col-sm-12'
        id="navbar">
        
                <Col md='8' xs ='6' id="Shown-col">
                  <img  src={require("../../assets/images/headphone.jpg")} id="App-logo" alt=""/>
                  <span className="App-name" >skype alla Hype</span>
                </Col>

                <Col md='4' xs ='6' className="room-comm" hidden id='Hidden-room'>
                  <button class="btn btn-sm rounded-0 btn-no-effect" id='toggle-video'>
                      <i class="fa fa-video text-white"></i>
                  </button>
                  <button class="btn btn-sm rounded-0 btn-no-effect" id='toggle-mute'>
                      <i class="fa fa-volume-up text-white"></i>
                  </button>
                  <button class="btn btn-sm text-white pull-right d-md-none btn-no-effect" id='toggle-chat-pane'>
                      <i class="fa fa-comment"></i> <span class="badge badge-danger very-small font-weight-lighter" id='new-chat-notification' hidden>New</span>
                  </button>
                  <button class="btn btn-sm rounded-0 btn-no-effect text-white">
                      <a href="/" class="text-white text-decoration-none">Leave Room</a>
                  </button>
                </Col>         
        </Navbar>
      </>
    );
  }
}

export default header;
