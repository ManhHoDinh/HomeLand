import { FaSearch } from "react-icons/fa";
import styles from "./searchBar.module.css";
import { futuna } from "../../../public/fonts/futura";
import { ReactNode, useRef } from "react";
export default function SearchBar({
  className,
  style,
  placeholder,
  onChange,
  onSearch,
}: {
  className?: string;
  style?: React.CSSProperties;
  onChange?: (params: string) => void;
  onSearch?: (params: string) => void;
  placeholder?: string | "Search...";
}): ReactNode {
  const searchParam = useRef(null);

  return (
    <div className={className} style={style}>
      <form
        className={futuna.className}
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "0 1rem",
        }}
      >
        <input
          ref={searchParam}
          type="search"
          id="search"
          placeholder={placeholder}
          style={{
            height: "100%",
            borderStyle: "none",
            flexGrow: "1",
            padding: "0 10px",
          }}
          onChange={(e) => {
            if (onChange) onChange(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter" && onSearch) {
              e.preventDefault();
              onSearch(e.currentTarget.value);
              if (onChange) onChange(e.currentTarget.value);
            }
          }}
        ></input>
        <button
          style={{ width: "fit-content" }}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (onSearch) onSearch((searchParam.current! as HTMLInputElement).value);
          }}
        >
          <FaSearch></FaSearch>
        </button>
      </form>
    </div>
  );
}
