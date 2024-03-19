import React, { ChangeEvent, KeyboardEventHandler, forwardRef } from "react";
import Tippy from "@tippyjs/react/headless";
import styles from "./searchLayout.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { SearchIcon } from "../icons";
interface Props {
  className?: any;
  placeHolder: string;
  onKeydown?: KeyboardEventHandler<HTMLInputElement>;
  onChange?: (e:ChangeEvent<HTMLInputElement>) => void;
  iconClick?:() => void
}
type Ref = HTMLInputElement;
// const SearchLayout = forwardRef<Ref, Props>(({className, placeHolder, onKeydown} : {className?: any, placeHolder:string, onKeydown?: KeyboardEventHandler<HTMLInputElement>}, ref) => {

// })
const SearchLayout = forwardRef<Ref, Props>((props, ref) => {
  const [results, setResults] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
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
          if(props.onChange) props.onChange(e);
          if (!e.target.value.startsWith(" ")) {
            setValueSearch(e.target.value);
          }
        }}
        className={clsx(styles.searchField)}
      />
      <SearchIcon onClick={props.iconClick} className={styles.searchIcon} width={"24px"} height={"24px"} />
      {/* {valueSearch.length > 0 && (
            <FontAwesomeIcon onClick={() => setValueSearch('')} icon={faClose} className={cx('close-icon')} />
        )}   */}
    </div>
  );
});
SearchLayout.displayName = "SearchLayout";

export default SearchLayout;
