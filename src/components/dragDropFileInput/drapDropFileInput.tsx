import React, {
  ChangeEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./dragdrop.module.css";
import { Image, Stack } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import image from "react-bootstrap";
import { TrashIcon } from "../icons";
import { useTranslation } from "react-i18next";
export default function DragDropFileInput({
  id,
  imageid,
  children,
  className = "",
  onChange,
  initFileList = [],
  imageContainer,
  multiFile = true,
}: {
  id?: string;
  imageid?: string;
  children: ReactNode | undefined;
  className?: string;
  onChange?: (files: (File | URL)[]) => void;
  initFileList?: (File | URL)[];
  imageContainer?: ReactElement;
  multiFile?: boolean;
}): ReactNode {
  // drag drop file component
  // drag state
  const [dragActive, setDragActive] = useState(false);
  const [fileLists, setFileLists] = useState<(File | URL)[]>(
    [...initFileList]
  );
  const [t, i18n] = useTranslation();
  
  useEffect(() => {
    setFileLists([...initFileList])
  },[])
  // ref
  const inputRef = useRef<HTMLInputElement>(null);
  // handle drag events
  const handleDrag = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer!.files && e.dataTransfer!.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };
  function handleFiles(files: FileList) {
    if (multiFile == false) {
      if (onChange) onChange([...Array.from(files)]);
      setFileLists([...Array.from(files)]);
      if (
        document.getElementById(id ?? (imageid ? imageid + "_container" : ""))!
          .className
      )
        document.getElementById(
          id ?? (imageid ? imageid + "_container" : "")
        )!.className = document
          .getElementById(id ?? (imageid ? imageid + "_container" : ""))!
          .className.split("missing")[0];
      return;
    }
    const tempList = [...Array.from(files)];
    const uniqueFile: (File | URL)[] = [];
    tempList.forEach((element) => {
      let index = 0;
      for (; index < fileLists.length; index++) {
        const element1 = fileLists[index];
        if (element1 instanceof URL) continue;
        if (element.name == element1.name) break;
      }
      if (index == fileLists.length) uniqueFile.push(element);
    });
    if (onChange) onChange([...fileLists, ...uniqueFile]);
    setFileLists([...fileLists, ...uniqueFile]);
    document.getElementById(
      id ?? (imageid ? imageid + "_container" : "")
    )!.className = document
      .getElementById(id ?? (imageid ? imageid + "_container" : ""))!
      .className.split("missing")[0];
  }
  // triggers the input when the button is clicked
  const onButtonClick = () => {
    if (inputRef.current) inputRef.current.click();
  };
  function ImageGrid(): ReactNode {
    if (!fileLists || fileLists.length == 0) return children;
    if (!multiFile) {
      const element = fileLists[0];
      if (imageContainer) {
        return (
          <imageContainer.type>
            <Image
              id={imageid}
              src={
                element instanceof URL
                  ? element.href
                  : URL.createObjectURL(element as Blob)
              }
              alt="dropImage"
              width={0}
              height={0}
              style={{ width: "100%", height: "100%" }}
            />
          </imageContainer.type>
        );
      } else
        return (
          <Image
            id={imageid}
            src={
              element instanceof URL
                ? element.href
                : URL.createObjectURL(element as Blob)
            }
            alt="Bien so xe"
            width={0}
            height={0}
            style={{ width: "100%", height: "100%" }}
          />
        );
    }

    const result: ReactNode[] = [];
    for (let index = 0; index < fileLists.length; index++) {
      const element = fileLists[index];
      result.push(
        <Stack style={{ position: "relative" }}>
          <Image
            src={
              element instanceof URL
                ? element.href
                : URL.createObjectURL(element as Blob)
            }
            alt="image"
            style={{
              width: "auto-fit",
              borderStyle: "solid",
              borderColor: "grey",
              borderWidth: "1px",
            }}
          ></Image>
          <button
            type="button"
            className={styles.deleteImageButton}
            onClick={() => {
              const temp = [...fileLists];
              temp.splice(index, 1);
              if (onChange) onChange(temp);
              setFileLists(temp);
            }}
          >
            <TrashIcon/>
          </button>
        </Stack>
      );
    }
    return (
      <div
        className={styles.imageGrid}
        id={imageid ? imageid : "imageBlobGrid"}
      >
        {result}
      </div>
    );
  }
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiFile}
        onChange={handleChange}
        style={{ display: "none", visibility: "hidden" }}
      />
      <div
        id={id ?? (imageid ? imageid + "_container" : "")}
        className={`${dragActive ? styles.dragActive : ""} ${className} ${styles.labelFileUpload
          }`}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "start",
            alignSelf: "baseline",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {fileLists.length > 0 ? (
            <>
              <p
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                  marginTop: "0.2vw",
                  display: "flex",
                  justifyContent: "center",
                }}
                className={styles.activeText}
                onClick={onButtonClick}
              >
                {multiFile ? t("uploadFile") : t("changeFile")}
              </p>
              <div className={`${styles.dragDrop}`}>{ImageGrid()}</div>
            </>
          ) : (
            <>
              <p style={{ textAlign: "center" }}>{ t("uploadFile")}</p>
              <button
                type="button"
                className={`upload-button ${styles.dragDrop}`}
                onClick={onButtonClick}
              >
                {ImageGrid()}
              </button>
            </>
          )}
        </div>
      </div>
      {dragActive && (
        <div
          className={styles.dragFileElement}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </>
  );
}