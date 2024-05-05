"use client";
import { FaSearch } from "react-icons/fa";
import styles from "./services.module.css";
import { futuna } from "../../../../public/fonts/futura";
import { Button, Card, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";
import SearchBar from "@/components/searchBar/searchBar";
import { useEffect, useMemo, useState } from "react";
import { Service } from "../../../models/service";
export default function Services() {
  const [ServiceList, setServiceList] = useState<Service[]>([]);
  var loadingMore = useMemo<boolean | undefined>(() => undefined, []);
  var page = useMemo(() => {
    return Math.floor(ServiceList.length / 30) + 1;
  }, [ServiceList]);
  const router = useRouter();

  const { isLoading, isError, data, refetch } = useQuery(
    "service",
    () =>
      axios.get("/api/service?page=" + page).then((res) => {
        setServiceList([...ServiceList, ...(res.data as Service[])]);
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  async function handleScrollEnd() {
    if (!loadingMore) {
      loadingMore = true;
      await refetch();
      loadingMore = false;
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      const windowHeight =
        "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom + 50 >= docHeight) {
        handleScrollEnd();
      }
    });
  }, []);
  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          margin: "50px 0px",
          justifyContent: "center",
          alignContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Spinner></Spinner>
      </div>
    );
  if (isError)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
          flexWrap: "wrap",
        }}
      >
        Co loi
      </div>
    );
  return (
    <main className={`${styles.main} ${futuna.className}`}>
      <div className={styles.container}>
        <div
          style={{ width: "85%" }}
          className={`${styles.itemContainer} ${styles.searchBarContainer}`}
        >
          <SearchBar
            placeholder="Search service here..."
            className={styles.searchBar}
            style={{ width: "50%" }}
          ></SearchBar>
        </div>
        <div
          className={styles.itemContainer}
          style={{
            height: "100%",
            width: "20%",
            padding: "0 1rem",
            alignItems: "center",
            alignContent: "center",
            margin: "auto",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Button
            onClick={() => {
              router.push("/home/services/add?auth=true");
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
            }}
          >
            Add Service
          </Button>
        </div>
      </div>
      <div className={styles.grid}>
        {ServiceList.map((value, index) => ServiceCard(value))}
      </div>
      {loadingMore ? (
        <div
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Spinner></Spinner>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}

const ServiceCard = (value: Service): React.ReactNode => {
  const router = useRouter();

  function handleRouting(route: string): void {
    router.push(route);
  }
  return (
    <Card
      onClick={() =>
        handleRouting("/home/" + "services/" + value.service_id + "?auth=true")
      }
      className={`${futuna.className} ${styles.gridItem}`}
      style={{ borderRadius: "10px", overflow: "hidden", maxWidth: "100%" }}
    >
      <Card.Img
        variant="top"
        style={{ height: "200px" }}
        src={
          value.imageURLs
            ? value.imageURLs[0]
            : "https://imgs.search.brave.com/2ec7dbMPC48d2bieXN1dJNsWbdhSFZ3lmUSPNwScvCQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mdW55/bGlmZS5pbi93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8wNC84/MF9DdXRlLUdpcmwt/UGljLVdXVy5GVU5Z/TElGRS5JTl8tMS0x/MDI0eDEwMjQuanBn"
        }
      />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        {/* <Card.Title style={{ alignSelf: "start" }}>
          {value.rent}
          <span style={{ color: "grey" }}>{" /month"}</span>
        </Card.Title> */}
        <Card.Text>{value.name}</Card.Text>
      </Card.Body>
    </Card>
  );
};
