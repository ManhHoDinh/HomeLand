import { useTranslation } from "react-i18next";
import SearchDropdown from "../../../components/searchDropdown/searchDropdown";
import styles from "./contracts.module.css";
import { futuna } from "../../../../public/fonts/futura";
export interface IFilterProps {
  title: string;
    selections: string[];
    onChange?: (params: number) => void;
    resetDropdown?: boolean;
}

export default function FilterButton(props: IFilterProps) {
  const { title, selections, onChange, resetDropdown } = props;
    return (
      <div
        className={`${styles.filter} ${futuna.className}`}
        style={{ zIndex: 2 }}
      >
        <p>{title}</p>
        <SearchDropdown
          title={"All"}
          selections={selections}
          onChange={onChange}
          style={{ width: "100%" }}
          resetDropdown={resetDropdown ?? false}
        ></SearchDropdown>
      </div>
    );
  };
  