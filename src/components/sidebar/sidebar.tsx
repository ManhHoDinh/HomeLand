import { CSSProperties } from "react";
import styles from "./sidebar.module.css";
import { Offcanvas } from "react-bootstrap";
export const Sidebar = ({
  className,
  children,
  visibilityMode,
  show,
  onClose,
  header,
  drawerClass,
}: {
  className?: string;
  style?: CSSProperties;
  header?: JSX.Element[] | never[] | JSX.Element;
  children: JSX.Element[] | never[] | JSX.Element;
  visibilityMode?: string;
  show?: boolean;
  onClose?: Function;
  drawerClass?: string;
}) => {
  if (visibilityMode == "hide" && show == undefined && onClose)
    throw SyntaxError(
      "When visibilyMode is set to hide, You has to define show and onClose parameter"
    );
  return (
    <>
      {visibilityMode == "hide" ? (
        <Offcanvas
          show={show}
          onHide={() => onClose!()}
          className = {styles.offCanvas}
        >
          <Offcanvas.Header closeButton>{header}</Offcanvas.Header>
          <Offcanvas.Body className={`${drawerClass ?? ""}`}>
            {children}
          </Offcanvas.Body>
        </Offcanvas>
      ) : (
        <></>
      )}
      <div className={`${styles.sidebarContainer} ${className}`}>
        <div>{header}</div>
        {children}
      </div>
    </>
  );
};
