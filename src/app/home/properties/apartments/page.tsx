"use client";
import styles from "./properties.module.css";
import { futuna } from "../../../../../public/fonts/futura";
import { Card, Placeholder, Spinner } from "react-bootstrap";
import { usePathname, useRouter } from "next/navigation";
import { Apartment } from "@/models/apartment";
import axios from "axios";
import { useQuery } from "react-query";
import SearchBar from "@/components/searchBar/searchBar";
import { Suspense, useEffect, useRef, useState } from "react";
import { Building } from "@/models/building";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import { AddResidentIcon } from "@/components/icons";
import { loadingFiler, search } from "@/libs/utils";
import { motion } from "framer-motion";
import { Floor } from "@/models/floor";
import { useTranslation } from "react-i18next";
interface Option {
  title: string;
  selections: string[];
  fieldName: string;
  onChange: (value: number) => void;
  data: string[];
}
const getSortOption = async ({
  onChange,
}: {
  onChange: (index: number, value: number) => void;
}) => {
  let apartmentSortOption = [
    {
      title: "Building",
      selections: ["Tất cả"],
      data: ["all"],
      fieldName: "buildingId",
      onChange: (value: number) => onChange(0, value),
    },
    {
      title: "Floor",
      selections: ["Tất cả"],
      data: ["all"],
      fieldName: "floorId",
      onChange: (value: number) => onChange(1, value),
    },
    {
      title: "Status",
      selections: ["None", "ACTIVE", "INACTIVE"],
      data: ["all", "active", "inactive"],
      fieldName: "status",
      onChange: (value: number) => onChange(2, value),
    },
  ] as Option[];

  await Promise.all([
    axios.get("/api/building").then((res) => {
      (res.data as Building[]).map(async (value, index) => {
        apartmentSortOption[0].selections.push(value.name);
        apartmentSortOption[0].data.push(value.building_id);
      });
      apartmentSortOption[0].onChange = async (value: number) => {
        if (value != 0) {
          apartmentSortOption[1] = await retriveFloor(
            apartmentSortOption[0].data[value],
            (value: number) => onChange(1, value)
          );
        }
        onChange(0, value);
      };
    }),
  ]);
  return apartmentSortOption;
};
const retriveFloor = async (
  building_id: string,
  onChange: (index: number, value: number) => void
) => {
  let result = {
    title: "Floor",
    selections: ["Tất cả"],
    data: ["all"],
    fieldName: "floorId",
    onChange: (value: number) => onChange(1, value),
  };
  await axios.get("/api/building/" + building_id).then((res) => {
    (res.data.floors as Floor[]).map((value, index) => {
      result.selections.push(value.name);
    });
  });
  return result;
};
export default function Apartments() {
  const path = usePathname();
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  //Handle if middleware not working
  const router = useRouter();
  if (!user.id) router.push("/home");
  const [t, i18n] = useTranslation();
  const loadingMore = useRef({ isLoading: false, page: 1 });
  const [searchParam, setSearchParam] = useState("");
  const [apartmentList, setApartmentList] = useState<Apartment[]>([]);
  const [data, setData] = useState<Apartment[]>([]);
  const [apartmentSortOption, setApartmentSortOption] = useState<Option[]>([
    {
      title: t("building"),
      selections: [t("all")],
      data: ["all"],
      fieldName: "buildingId",
      onChange: () => {},
    },
    {
      title: t("floor"),
      selections: [t("all")],
      data: ["all"],
      fieldName: "floorId",
      onChange: () => {},
    },
    {
      title: t("status"),
      selections: ["ACTIVE", "INACTIVE"],
      data: ["active", "inactive"],
      fieldName: "status",
      onChange: () => {},
    },
  ]);
  const [sortOptionList, setSortOptionList] = useState<number[]>([0, 0, 0]);
  const { isLoading, isError, refetch } = useQuery(
    "apartment",
    async () => {
      if (loadingMore.current.page == -1) {
        const temp = { ...loadingMore.current };
        temp.isLoading = false;
        loadingMore.current = temp;
      }
      return await axios
        .get("/api/apartment?page=" + loadingMore.current.page)
        .then((res) => {
          const temp = { ...loadingMore.current };
          if ((res.data as Apartment[]).length == 0) temp.page = -1;
          temp.isLoading = false;
          loadingMore.current = temp;
          let result = [...data, ...(res.data as Apartment[])];
          setData(result);
        });
    },

    {
      refetchOnWindowFocus: false,
    }
  );
  function handleChange(index: number, value: number): void {
    let temp1 = { ...loadingMore.current };
    temp1.isLoading = false;
    loadingMore.current = temp1;
    let temp = [...sortOptionList];
    temp[index] = value;
    setSortOptionList(temp)
  }
  useEffect(() => {
    getSortOption({ onChange: handleChange }).then((res) => {
      setApartmentSortOption(res);
    });
  }, []);
  useEffect(() => {
    if (!data) return;
    let result = [...data];
    if (apartmentSortOption)
      sortOptionList.forEach((value, index) => {
        if (
          apartmentSortOption[index].data[value] &&
          apartmentSortOption[index].data[value] != "all"
        )
          result = search(
            result,
            apartmentSortOption[index].fieldName,
            apartmentSortOption[index].data[value]
          );
        console.log(apartmentSortOption[index].data[value]);
      });
    if (searchParam != "") result = search(result, "name", searchParam);
    console.log(result);
    setApartmentList([...result]);
    if (
      result.length < 30 &&
      loadingMore.current.page != -1 &&
      !loadingMore.current.isLoading
    )
      handleScrollEnd();
  }, [sortOptionList, searchParam, data]);

  async function handleScrollEnd() {
    if (!loadingMore.current.isLoading) {
      const temp = { ...loadingMore.current };
      temp.isLoading = true;
      temp.page = temp.page + 1;
      loadingMore.current = { ...temp };
      refetch();
    }
  }
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
  if (isLoading)
    return (
      <motion.div
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
      </motion.div>
    );
  if (isError)
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
          flexWrap: "wrap",
        }}
      >
        Co loi
      </motion.div>
    );
  function handleSearch(params: string): void {
    setSearchParam(params);
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className={`${styles.main} ${futuna.className} `}
    >
      <div style={{ marginBottom: "1vw", width: "100%" }}>
        {user.role != "resident" ? <ButtonComponent
          href={`${path}/add`}
          preIcon={<AddResidentIcon width={24} height={24} />}
          className={styles.addBtn}
        >
          {t("add_apartment")}
        </ButtonComponent>: <></>}
        
      </div>
      <div
        className={styles.container}
        style={{ borderStyle: "solid", borderColor: "grey" }}
      >
        <div className={`${styles.itemContainer} ${styles.searchBarContainer}`}>
          <SearchBar
            className={styles.searchBar}
            placeholder={t("search_apartment")}
            onChange={handleSearch}
          ></SearchBar>
        </div>
        {apartmentSortOption &&
          apartmentSortOption.map((value, index) => (
            <div
              key={index}
              className={styles.itemContainer}
              style={{ height: "100%", width: "20%", padding: "0 1rem" }}
            >
              {FilterButton(value)}
            </div>
          ))}
      </div>
      <div className={styles.grid}>
        {apartmentList.map((value, index) => ApartmentCard(value, t))}
      </div>
      {loadingMore.current.isLoading && loadingMore.current.page > 0 && (
        <div
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        ></div>
      )}
    </motion.div>
  );
}
const FilterButton = ({
  title,
  selections,
  onChange,
}: {
  title: string;
  selections: any[];
  onChange: (value: number) => void;
}): React.ReactNode => {
  return (
    <div className={`${styles.filter} ${futuna.className}`}>
      <p>{title}</p>
      <div>
        {selections.length != 0 ? (
          <select
            name={title}
            id={title}
            onChange={(e) => {
              e.preventDefault();
              onChange(Number.parseInt(e.target.value));
            }}
            style={{ borderStyle: "hidden" }}
          >
            {selections.map((value, index) => (
              <option key={index} value={index}>
                {value}
              </option>
            ))}
          </select>
        ) : (
          <p style={{ fontSize: "0.8rem" }}>Nothing to filter</p>
        )}
      </div>
    </div>
  );
};

const ApartmentCard = (value: Apartment, t: Function): React.ReactNode => {
  const router = useRouter();
  const pathName = usePathname();
  function handleRouting(route: string): void {
    router.push(pathName + `/${route}`);
  }
  return (
    <Card
      onClick={() => handleRouting(value.apartment_id + "?auth=true")}
      className={`${futuna.className} ${styles.gridItem}`}
      style={{ borderRadius: "10px", overflow: "hidden" }}
    >
      <Suspense
        fallback={<Placeholder as={Card.Img} animation="glow"></Placeholder>}
      >
        <Card.Img variant="top" src={value.images[0]} />
      </Suspense>
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <Card.Title style={{ alignSelf: "start" }}>
          {value.rent}
          <span style={{ color: "grey" }}>{` /${t("month")}`}</span>
        </Card.Title>
        <Card.Text>{value.name}</Card.Text>
      </Card.Body>
    </Card>
  );
};
