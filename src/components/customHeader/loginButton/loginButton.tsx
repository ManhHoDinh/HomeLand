import style from "./loginButton.module.css";

export const LoginButton = ({onClick}:{onClick:Function}):JSX.Element => {
    return<button className={`${style.buttonContainer}`} onClick={() => onClick()}>
        Log in
    </button>
}