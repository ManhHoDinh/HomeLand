import React, { KeyboardEventHandler, forwardRef } from "react";
import Tippy from "@tippyjs/react/headless";
import styles from "./searchLayout.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { SearchIcon } from "../icons";
import { set } from "date-fns";
interface Props {
  className?: any;
  placeHolder: string;
  onKeydown?: KeyboardEventHandler<HTMLInputElement>;
  iconClick?:() => void
  xClick?:() => void
}
type Ref = HTMLInputElement;
// const SearchLayout = forwardRef<Ref, Props>(({className, placeHolder, onKeydown} : {className?: any, placeHolder:string, onKeydown?: KeyboardEventHandler<HTMLInputElement>}, ref) => {

// })
const SearchLayout = forwardRef<Ref, Props>((props, ref) => {
  const [results, setResults] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const handleClearSearch = () => {
    setValueSearch(""); // Clear the value when 'x' is clicked
   // Optionally, focus back on the input after clearing
    props.xClick && props.xClick(); // Trigger any additional logic provided by the parent component
  };
  return (
    <div
      className={clsx(styles.search, {
        [`${props.className}`]: props.className,
      })}
    >
      <input
        ref={ref}
        onKeyDown={props.onKeydown}
        placeholder={props.placeHolder}
        value={valueSearch}
        onChange={(e) => {
          if (!e.target.value.startsWith(" ")) {
            setValueSearch(e.target.value);
          }
        }}
        className={clsx(styles.searchField)}
      />
       {valueSearch && ( 
        <div className={styles.clearIcon} onClick={handleClearSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            className={styles.closeIcon}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
         
        </div>
      )}
      <SearchIcon onClick={props.iconClick} className={styles.searchIcon} width={"24px"} height={"24px"} />
      {/* {valueSearch.length > 0 && (
            <FontAwesomeIcon onClick={() => setValueSearch('')} icon={faClose} className={cx('close-icon')} />
        )}   */}
    </div>
  );
});
SearchLayout.displayName = "SearchLayout";

export default SearchLayout;