import { Inter } from "next/font/google";
import style from "./headerButton.module.css";
export const HeaderButton = ({
  title,
  icon,
  onClick,
  hideIcon,
}: {
  title: string;
  icon?: JSX.Element;
  onClick?: Function;
  hideIcon?: boolean | true;
}): JSX.Element => {
  return (
    <div
      className={`${
        !hideIcon ? style.buttonContainer : style.hideIconButtonContainer
      }`}
    >
      {!hideIcon ? <div>{icon ? icon : <></>}</div> : <></>}
      <button className={`${style.headerButton}`} onClick={() => onClick != undefined? onClick(): {}}>{title}</button>
    </div>
  );
};
