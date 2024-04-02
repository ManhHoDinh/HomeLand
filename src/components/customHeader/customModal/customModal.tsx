import { Button, Form, Modal } from "react-bootstrap";
import { futuna } from "../../../../public/fonts/futura";

export const CustomModal = ({
  show,
  onHide,
}: {
  show: boolean;
  onHide: Function;
}) => {
  return (
    <Modal show={show} onHide={() => onHide()} className={futuna.className}>
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              {"We'll never share your email with anyone else."}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div style={{display: "flex", flexDirection: "row-reverse"}}>
            <Button variant="primary" type="submit" style={{width: "30%"}}>
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
