import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { futuna } from "../../../public/fonts/futura";
import { icons } from "react-icons";

export interface IFurnitureProps {
  title: string;
  svg: JSX.Element;
  value: string;
}

export default function Furniture(props: IFurnitureProps) {
  return (
    <div style={futuna.style}>
      <Container
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          textAlign: "left",
          width: "200px",
        }}
      >
        <Row >
          <h6>{props.title}</h6>
        </Row>
        <Row className="align-items-center">
          <Col md="auto">{props.svg}</Col>
          <Col>{props.value}</Col>
        </Row>
      </Container>
    </div>
  );
}
