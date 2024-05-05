import {
  FaBackward,
  FaFastBackward,
  FaFastForward,
  FaForward,
} from "react-icons/fa";
import styles from "./pageIndicator.module.css";
export default function PageIndicator({
  clickHandler,
  maxPageButton,
  pageLength,
  currentPage,
}: {
  clickHandler?: (page: number) => void;
  maxPageButton?: number;
  pageLength: number;
  currentPage: number;
}): React.ReactNode {
  return (
    <div className={styles.container}>
      <div
        style={{ display: "flex", alignContent: "center", flexWrap: "wrap" }}
      >
        <FaFastBackward
          style={{
            marginRight: "20px",
            alignSelf: "center",
            color: currentPage > 1 ? "black" : "grey",
          }}
          onClick={() => {
            if (currentPage > 1 && clickHandler) clickHandler(1);
          }}
        ></FaFastBackward>
        <FaBackward
          style={{
            alignSelf: "center",
            color: currentPage > 1 ? "black" : "grey",
          }}
          onClick={() => {
            if (currentPage > 1 && clickHandler) clickHandler(currentPage - 1);
          }}
        ></FaBackward>
        {Array.from(Array(pageLength).keys()).map((value, index) => {
          if (
            !maxPageButton ||
            (index + 1 <= currentPage + maxPageButton / 2 &&
              index + 1 >= currentPage - maxPageButton / 2)
          )
            return (
              <div
                key={index}
                className={`${styles.pageItem} ${
                  currentPage == index + 1 ? styles.active : ""
                }`}
                onClick={() => {
                  if (clickHandler) clickHandler(index + 1);
                }}
              >
                {index + 1}
              </div>
            );
          else return <></>;
        })}
        <FaForward
          style={{
            marginRight: "20px",
            alignSelf: "center",
            color: currentPage < pageLength ? "black" : "grey",
          }}
          onClick={() => {
            if (currentPage < pageLength && clickHandler)
              clickHandler(currentPage + 1);
          }}
        ></FaForward>
        <FaFastForward
          style={{
            alignSelf: "center",
            color: currentPage < pageLength ? "black" : "grey",
          }}
          onClick={() => {
            if (currentPage < pageLength && clickHandler)
              clickHandler(pageLength);
          }}
        ></FaFastForward>
      </div>
    </div>
  );
}
