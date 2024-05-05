import { Modal, Button, Col, Row, Container, Image } from "react-bootstrap";
import { ServicePackage } from "../../models/servicePackage";
import { futuna } from "../../../public/fonts/futura";
import { Service } from "../../models/service";
import CustomTextBox from "../textBox/textBox";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface ModalProps {
  show: boolean;
  onHide: () => void;
  servicePackage: ServicePackage;
  service: Service;
  onConfirm: () => void;
}

export default function ConfirmBillModal(props: ModalProps) {
  const currentDate = new Date();
  const expirationDate = new Date();
  expirationDate.setDate(
    currentDate.getDate() + (props.servicePackage?.expired_date ?? 0)
  );
  const [t, i18n] = useTranslation();

  return (
    <Modal show={props.show} onHide={props.onHide} style={futuna.style}>
      <Modal.Header closeButton>
        <Modal.Title>{t(props.service.name)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="align-items-center">
            <Col md="auto" className="align-self-stretch">
              <Image
                loading="lazy"
                width={250}
                rounded
                src={
                  props.service.imageURLs
                    ? props.service.imageURLs[0]
                    : "https://imgs.search.brave.com/2ec7dbMPC48d2bieXN1dJNsWbdhSFZ3lmUSPNwScvCQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mdW55/bGlmZS5pbi93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8wNC84/MF9DdXRlLUdpcmwt/UGljLVdXVy5GVU5Z/TElGRS5JTl8tMS0x/MDI0eDEwMjQuanBn"
                }
              ></Image>
            </Col>
            <Col className="align-self-stretch">
              <p>{`${t(props.servicePackage.name)}`}</p>
              <p>{`Expired Date: ${props.servicePackage.expired_date} days`}</p>
              <p>{`Expired At: ${format(expirationDate, "dd-MM-yyyy")}`}</p>
              <p>{`Per Unit Price: ${props.servicePackage.per_unit_price.toLocaleString()}VND`}</p>
            </Col>
          </Row>
          <Row style={{ marginTop: "30px" }}>
            <p>{`${props.service.description}`}</p>

            <p>Please confirm your payment for this service.</p>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={props.onConfirm}>
          Confirm Payment
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
