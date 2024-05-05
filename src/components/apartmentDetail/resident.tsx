import * as React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";

export interface IResidentProps {
  img: JSX.Element;
  name: string;
  phone_number: string;
}

export default function 
Resident(props: IResidentProps) {
  return (
    <Container style={{ marginBottom: "20px" }}>
      <Row className="align-items-center">
        <Col md="auto">
          <div style={{ width: "80px", borderRadius: "50%" }}>{props.img}</div>
        </Col>
        <Col>
          <h4 style={{fontSize:'20px', fontWeight:600}}>{props.name}</h4>
          <h4 style={{fontSize:'18px'}}>{props.phone_number}</h4>
        </Col>
        <Col md="auto">
          <Button variant="info" style={{ alignItems: "center" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={15}
              height={20}
              viewBox="0 0 192 512"
            >
              <path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z" />
            </svg>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
