import * as React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { UserProfile } from "../../libs/UserProfile";
import ModalComponent from "../Modal/Modal";
import axios from "axios";
import toastMessage from "../../utils/toast";
import { Service } from "../../models/service";
import { ServicePackage } from "../../models/servicePackage";
import { loadingFiler, removeLoadingFilter } from "../../libs/utils";
import ServicePackageModal from "../../app/home/services/[id]/addServicePackage";
import ConfirmBillModal from "./ComfirmBill";
import { baseUrl, endpoint } from "../../constraints/endpoints";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
export interface IServicePackageProps {
  service: Service;
  servicePackage: ServicePackage;
  handleSuccessModification: () => void;
}

export default function ServicePackageLayout(props: IServicePackageProps) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const deleteHandle = () => {
    setShowDeleteModal(true);
  };
  const confirmCloseHandle = () => {
    //setShowDeleteModal(true);
    setShowConfirmModal(false);
  };
  const router = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${"/home/invoices"}`;
  async function handleSubmit() {
    loadingFiler(document.body!);
    // if (!validateData()) {
    //   removeLoadingFilter(document.body!);
    //   return;
    // }
    const data = new FormData();
    data.append("servicePackage_id", props.servicePackage.servicePackage_id);
    data.append("buyer_id", "RESIDENT");
    data.append("amount", "1");
    data.append("baseLink", baseUrl);
    data.append("redirectUrl", URL);
    data.append(
      "orderInfo",
      "Pay for " +
        props.servicePackage.name +
        " service package " +
        " of " +
        props.service.name +
        " service in Homeland"
    );
    const response = await axios.post(`/api/invoice`, data);
    const shortLink = response.data.shortLink;

    router.push(shortLink);
    console.log(response);
  }
  
  const handleConfirmDelete = async (id: string) => {
    console.log(id);
    setShowDeleteModal(false);
    loadingFiler(document.body!);
    try {
      await axios.delete(`/api/servicePackage/${id}`);
      props.handleSuccessModification();
      removeLoadingFilter(document.body!);
      toastMessage({ type: "success", title: "Delete successfully!" });
    } catch (err) {
      removeLoadingFilter(document.body!);
      toastMessage({ type: "error", title: "Delete fail!" });
      console.log(err);
    }
  };
  const updateModalCloseHandle = () => {
    props.handleSuccessModification();
    setShowUpdateModal(false);
  };
  const [t, i18n] = useTranslation();

  return (
    <Container
      style={{
        backgroundColor: "rgba(40, 100, 255, 0.1)",
        marginBottom: "20px",
        borderRadius: "20px",
        padding: "5px 20px"
      }}
    >
      <Row className="align-items-center">
        {/* <Col md="auto">
          <div style={{ width: "80px", borderRadius: "50%" }}>{props.img}</div>
        </Col> */}
        <Col>
          <h4>{t(props.servicePackage.name)}</h4>
          <h4>
            {props.servicePackage.per_unit_price.toLocaleString()} VND /{" "}
            {props.servicePackage.expired_date} {t('days')}
          </h4>
        </Col>
        <Col md="auto">
          {UserProfile.getRole() == "resident" ? (
            <Button
              onClick={() => {
                setShowConfirmModal(true);
              }}
              variant="info"
              style={{ alignItems: "center" }}
            >
              {t('buy')}
            </Button>
          ) : (
            <div className="d-flex">
              <Button
                // onClick={() => {
                //   router.push(
                //     "/home/contracts/updateContract/" +
                //       value.contract_id +
                //       "?auth=true"
                //   );
                // }}
                onClick={() => setShowUpdateModal(true)}
                variant="warning"
              >
                {t('edit')}
              </Button>

              <Button
                onClick={() => deleteHandle()}
                variant="danger"
                style={{ marginLeft: "20px" }}
              >
                {t('delete')}
              </Button>
            </div>
          )}
        </Col>
      </Row>
      <ModalComponent
        show={showDeleteModal}
        title="Bạn có chắc chắn xóa gói dịch vụ này?"
        handleConfirm={() =>
          handleConfirmDelete(props.servicePackage.servicePackage_id)
        }
        setShow={setShowDeleteModal}
      />
      <ServicePackageModal
        show={showUpdateModal}
        successMessage="Update service package successfully!"
        serviceId={props.servicePackage.service_id}
        handleClose={updateModalCloseHandle}
        servicePackage={props.servicePackage}
      />
      <ConfirmBillModal
        show={showConfirmModal}
        onHide={() => {
          console.log(props.servicePackage);
          setShowConfirmModal(false);
        }}
        onConfirm={() => {
          setShowConfirmModal(false);
          handleSubmit();
        }}
        servicePackage={props.servicePackage}
        service={props.service}
      ></ConfirmBillModal>
    </Container>
  );
}
