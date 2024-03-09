"use client";
import { Images } from "../../../public/images";
import Image from "next/image";
import styles from "./page.module.css";
import { futuna } from "../../../public/fonts/futura";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { UserProfile } from "@/libs/UserProfile";
export default function Login() {
  const router = useRouter();
  const handleSignIn = async () => {
    const email = (document.getElementById("email")! as HTMLInputElement).value;
    const password = (document.getElementById("password")! as HTMLInputElement)
      .value;
    const data = JSON.stringify({
      email: email,
      password: password,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    loadingFiler(document.getElementsByTagName("main")[0]);
    axios
      .request(config)
      .then((res) => {
        UserProfile.setProfile(res.data);
        UserProfile.setRole(res.data.role);
        router.replace("/home/dashboard?auth=true");
      })
      .catch((err) => {
        removeLoadingFilter(document.getElementsByTagName("main")[0]);
        alert(err.response.data);
      });
  };
  return (
    <main className={styles.container}>
      <div className={styles.headerSmall}>
        <Image
          src={Images.Logo}
          alt="logo"
          width={70}
          height={70}
          style={{ marginRight: "0.5rem" }}
        />
        <p
          style={{
            textAlign: "center",
            margin: "auto 0",
            height: "fit-content",
          }}
        >
          {" "}
          HomeLand
        </p>
      </div>
      <div className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSignIn();
          }}
        >
          <div className={styles.header}>
            <Image
              src={Images.Logo}
              alt="logo"
              width={70}
              height={70}
              style={{ marginRight: "0.5rem" }}
            />
            <p
              style={{
                textAlign: "center",
                margin: "auto 0",
                height: "fit-content",
              }}
            >
              {" "}
              HomeLand
            </p>
          </div>
          <div
            className={futuna.className}
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            {`Modern Apartment Living: "Discover the essence of modern apartment living`}
          </div>
          <div style={{ width: " 100%", height: " 30px" }} />
          <div>Welcome Back, Please login to your account</div>
          <label form="email" style={{ marginTop: "10px" }}>
            Email
          </label>

          <input
            type="email"
            id="email"
            aria-label="email"
            placeholder="xxxx@gmail.com"
            className={styles.input}
          />
          <label form="password" style={{ marginTop: "20px" }}>
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              id="password"
              aria-label="password"
              type="password"
              className={styles.input}
              style={{ width: "100%" }}
            />
            <button
              type="button"
              id="passwordButton"
              className={`${styles.passwordButton} ${styles.hidden}`}
              style={{ position: "absolute", right: "10px", height: "100%" }}
              onClick={() => {
                var temp = document.getElementById(
                  "password"
                ) as HTMLInputElement;
                if (temp.type == "text") {
                  temp.type = "password";
                  document.getElementById(
                    "passwordButton"
                  )!.className = `${styles.passwordButton} ${styles.hidden}`;
                } else {
                  temp.type = "text";
                  document.getElementById(
                    "passwordButton"
                  )!.className = `${styles.passwordButton} ${styles.show}`;
                }
              }}
            >
              <div className={styles.hidden}>
                <FaEyeSlash />
              </div>
              <div className={styles.show}>
                <FaEye />
              </div>
            </button>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "10px",
              justifyContent: "space-between",
            }}
          >
            <div>
              <input
                type="checkbox"
                style={{ verticalAlign: "center", marginRight: "5px" }}
                id="rememberMe"
                aria-label="rememberMe"
              ></input>
              <label form="rememberMe">{"Remember me"}</label>
            </div>
            <div>
              <a onClick={() => router.push("/forgotPassword")}>
                <u style={{ cursor: "pointer" }}>Forgot password?</u>
              </a>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button
              type="submit"
              className={`${styles.button} ${styles.current}`}
            >
              {" "}
              Login
            </Button>
          </div>
        </form>
        <div className={styles.bannerContainer}>
          <Image src={Images.LoginBanner} alt="banner"></Image>
        </div>
      </div>
    </main>
  );
}
