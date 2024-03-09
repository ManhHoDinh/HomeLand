import * as React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { futuna } from "../../../public/fonts/futura";
import { icons } from "react-icons";

export interface ICustomTextBoxProps {
  title: string;
  value: string;
  isDisable?: boolean;
}

export default function CustomTextBox(props: ICustomTextBoxProps) {
  return (
    <div style={futuna.style}>
      <Container
        style={{
          alignItems: "center",
          textAlign: "left",
        }}
      >
        <Row>
          <Col
            md="auto"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <h6
              style={{
                textAlign: "left",
                width: "150px",
              }}
            >
              {props.title}
            </h6>
          </Col>
          <Col>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  as="textarea"
                  style={{ height: 20 }}
                  disabled={props.isDisable ?? false}
                  value={props.value}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
