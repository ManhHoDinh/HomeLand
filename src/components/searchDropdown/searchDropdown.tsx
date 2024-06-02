import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

const CustomMenu = React.forwardRef<any, any>(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul
          className="list-unstyled"
          style={{
            overflowY: "auto",
            maxHeight: "200px",
            width: "100%",
          }}
        >
          {React.Children.toArray(children).filter(
            (child: any) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);
CustomMenu.displayName = "CustomMenu";
export default function SearchDropdown({
  className,
  style,
  onChange,
  title,
  selections,
  resetDropdown,
}: {
  className?: string;
  style?: React.CSSProperties;
  onChange?: (params: number) => void;
  title: string;
  selections: any[];
  resetDropdown?: boolean;
}) {
  const [dropdownValue, setDropdownValue] = useState(title);
  useEffect(() => {
    if(resetDropdown)
      setDropdownValue(title);
  },[selections, resetDropdown]);
  async function onChangeItem(value: string, index: number) {
    await (onChange && onChange(index));
    setDropdownValue(value);
  }
  return (
    <Dropdown className={className} style={style}>
      <Dropdown.Toggle
        style={{
          width: "100%",
          display: "flex",
          backgroundColor: "white",
          color: "black",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        id="dropdown-custom-components"
      >
        {dropdownValue}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        {selections.map((value, index) => (
          <Dropdown.Item
            key={index}
            eventKey={index.toString()}
            onClick={() => onChangeItem(value, index)}
          >
            {value}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
