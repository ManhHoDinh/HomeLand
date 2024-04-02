import { Button } from "react-bootstrap";
import styles from "./drawerButton.module.css";
import { FaHome } from "react-icons/fa";
export const DrawerButton = () => {
  return (
    <div className={styles.drawerButtonContainer}>
      <Button>
        <div>
          <FaHome width={"100%"} />
        </div>
        <span>Home</span>
      </Button>
    </div>
  );
};
