import { SortOrder } from "@/models/enums";
import { CSSProperties, useState } from "react";

export const SearchIcon = ({
  width,
  height,
  className,
  onClick,
}: {
  width: any;
  height: any;
  className?: any;
  onClick?: () => void;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_377_1416)">
        <path
          d="M19.375 17.5H18.3875L18.0375 17.1625C19.2625 15.7375 20 13.8875 20 11.875C20 7.3875 16.3625 3.75 11.875 3.75C7.3875 3.75 3.75 7.3875 3.75 11.875C3.75 16.3625 7.3875 20 11.875 20C13.8875 20 15.7375 19.2625 17.1625 18.0375L17.5 18.3875V19.375L23.75 25.6125L25.6125 23.75L19.375 17.5ZM11.875 17.5C8.7625 17.5 6.25 14.9875 6.25 11.875C6.25 8.7625 8.7625 6.25 11.875 6.25C14.9875 6.25 17.5 8.7625 17.5 11.875C17.5 14.9875 14.9875 17.5 11.875 17.5Z"
          fill="black"
          fill-opacity="0.88"
        />
      </g>
      <defs>
        <clipPath id="clip0_377_1416">
          <rect width="30" height="30" rx="8" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const SortIcon = ({
  width,
  height,
  isUsed = true,
  className,
  initialOrder,
  onChangeOrder,
}: {
  width: any;
  height: any;
  isUsed?: boolean;
  className?: any;
  initialOrder?: SortOrder;
  onChangeOrder?: (order: SortOrder) => void;
}): JSX.Element => {
  const [order, setOrder] = useState<SortOrder | undefined>(
    initialOrder ?? undefined
  );
  return (
    <div
      style={{
        width: "fit-content",
        display: "inline-grid",
        verticalAlign: "super",
        cursor: "pointer",
      }}
      onClick={() => {
        if (order != undefined)
          setOrder(
            order == SortOrder.ASCEND ? SortOrder.DESCEND : SortOrder.ASCEND
          );
        else setOrder(SortOrder.ASCEND);
        if (onChangeOrder)
          onChangeOrder(
            order == SortOrder.ASCEND ? SortOrder.DESCEND : SortOrder.ASCEND
          );
      }}
    >
      <svg
        stroke="currentColor"
        fill={order && order == SortOrder.ASCEND && isUsed ? "black" : "grey"}
        stroke-width="0"
        viewBox="0 0 320 400"
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path>
      </svg>
      <svg
        stroke="currentColor"
        fill={order && order == SortOrder.DESCEND && isUsed ? "black" : "grey"}
        stroke-width="0"
        viewBox="0 70 325 400"
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
      </svg>
    </div>
  );
};
export const AddResidentIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="30" height="30" fill="url(#pattern1)" />
      <defs>
        <pattern
          id="pattern1"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_501_696" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_501_696"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFElEQVR4nO2dXYhWRRiAJ43cylJLTQk0DCMMjYhu6qJuoqJLK0utoAulROznwotuVKjsz6DAcku669abfi68iCjbioiiqLSLwOii3W39SalV2ifevllYzW3mnDNn3pnvzAMLy/m+PfP+nPPOvDPvzBpTKBQKhUKhUCgUCoVCoVAoJAZwKfAA8CbwBTAMnLI/w/baIHA/cIm2vH0DcA2wFziJP/Ldt4Dl2vJnC3Ah8BJwmvrI2/ECMKCtT1YAy4FvCccQsFhbrywAbrAxPTS/AKu09cvhyR9uwfhTnbBIW88kAQaAr2mfL6V/0dY3Oeh1uLHYrq1vikPN0xEd8EcJRWc6YC/x2a33yKWX4Z5UcMCJkjGbfx0g0wtarDFdh97cjhZ7TNehN4mmxZDpOsCIogN+M10HGFd0wF+m61AcoO6AEcU3oIQgSies/gYMKr4Bb5iuQ28NV4t7TdcBZttpgdhIm7O19U8CegvosRnU1ju1lbBTEY0vuccybb2Tgl71Qiye09Y31SXJoQjG/xSYpa1vkgCLgMMtGv9X4EptPZMGWGWrF0Ijjl2prV8WAAuAjwKHnVKOUtEJs6R6oWGOIKOdZ0vMb94v7K7oCPnunjLUDJ8xr5H5G+Azmcm0T/i4/V2uvQ7cVzLcQqFQKBQyAVhoO/hXgA+Ag8DYlE5+zF6Tz3bZjn6BttxZA8wDHrPzTxM1cowJm+A9CszV1ie3vOJFWyEdiuPA88AV2volC3A+sAU4RntIArhV2tLWNymAZZGrLz4HrtLWOwmAu4GjxEc67jtNlwHWR17qPBvZ9fOI6SLAwzVHN6ERGdab3ADmALfYp/hpW8C1D7jIM+zE3HPmQt7CO0yqABcDtwJPAe8Ah6Z5end5drhHSA/pE5aaVACuBZ4E9kuZuIcCf7qOG7BDTc0NHy4k6ZsZz8r/NdCNwGvAzzWEf9Xj/k+QPpvjWPvMWC4p/1cNBb/eI8OVjLQRHvo0RYbEC4Ma+X9CzNuBtqD+4NGeTC80xqOdEOwMZuhzCHi17Uj/JhzbPCbWgszteOgXguPBJ/DsAUs7bGcZmuscbUuIIyMHCBtDGn8l8B3tDd/Oc7QvC/K5OeBAKOOvbempn2S/x2LKRIYOkBA9v6nxNweO9ZUrme1KFhk6QLin6daiCe1tRPSWEXN1wMtNYn6bYWcqNztkkXVab2opXM02VXivbiMfEo8VDll+qnKzuoatYJsqHKrTwG3EZbFDntEqN2tiXE/7VGEkh329AyHPmmhiXE/7tHtWBfA9cbnAIU/nHNB4wqsilznk+b3KzZoY19M+VRhuu4EQLO3jTvhg2w2E4CaHPO9XuVkT47Zgn3fbbiAE6xzydCsRIz7bHPJIoWwwIuu/OgcH7PPYUZnrZNzlOThgFJjhkEmqlIMQUf+PKxtfyQG4zv23JeJBiKj/hpwcsNUh09xQ+Ukk/aVCe05ODvgm1mkrkfR/ppbxFR2A65wH2RwRovY/gv5H+nZ7E/A46bPJ9Cv0ShODLdC3wAHV0sQYAEuqrhFEYqwzu2aAu5Q3ZpyNTJnfbroE8GAiGzQk411rugiwTvlNGO+s8SeRnSk2/sZmtHNhZzpkUSfSiYxTRztLphWoiwAzgIdaHiEdtZvB+3uo2QRbS7oz8Nr2MXs2XX9muG1gJ/A22nBRp75V/uYTmdWsPbFWMJPOmC+FsrJEKOWCwI82VE0eVyO/yzX5TP7n5epaiynn4B/iafXOphlvMAAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};

export const CloseIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="16" height="16" fill="url(#pattern2)" />
      <defs>
        <pattern
          id="pattern2"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_376_1294" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_376_1294"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB5UlEQVR4nO2dzVLCMBgA+0x6wDfDmx59WZ2+wToM5uAMYkHk+8numQPdTSYlzdBlERERERERERERkVoAz8BuaQ6wO1zrkgnglSMr8LQ0BXgEPr6u9W1JJp/OEfgunxQRTshvGYHT8mMjnJHfKgLn5cdE+Fpwt7BWXpg5LriHa9jC/RZm4AF4vyDCU9ORHzfQOkcgu/zOEagiv2MEqsnvFIGq8jtEoLr8yhHoIr9iBLrJrxSBrvIrRKC7/MwRmEV+xgjMJj9TBGaVnyECs8uPjIDy4yKg/LgIKD8uAsqPi4Dy4yKg/LgIKD8uAsqPi4DyQ8/irBd+tucv3OCZsAXlB0ZYHflxM2FVflyEVflxEVbl3xAuu9VMc+RlVvkDIwTKHxghUP7ACIHyB0a4QP7OrYgguGJjLcORlxbwh11NIwTKHxjhSrjhfr4RAuUPjLCR/3yShQtznPyBEX7gns9wcSbEyR8YIcERcWafCRmOjjBrhAzyp42QSf50ETLKnyZCZvntI1SQ3zZCJfntIlSU3yZCZfnlI3SQXzZCJ/nlInSUXyZCZ/klIvjXxSe57zsFgD0NR/6VM+FlieBMhBbyN0Z4if5y+87yf4kQK/9EhJbyf4iQQ/7Al/iIiIiIiIiIiIjIkplPEtv2p25zkkEAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};
export const EditIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12.6671V16H3.33287L13.1626 6.17025L9.82975 2.83738L0 12.6671ZM15.74 3.59283C16.0867 3.24622 16.0867 2.68629 15.74 2.33968L13.6603 0.259964C13.3137 -0.0866546 12.7538 -0.0866546 12.4072 0.259964L10.7807 1.8864L14.1136 5.21927L15.74 3.59283Z"
        fill="white"
      />
    </svg>
  );
};
export const ErrorIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44 60H52V68H44V60ZM44 28H52V52H44V28ZM47.96 8C25.88 8 8 25.92 8 48C8 70.08 25.88 88 47.96 88C70.08 88 88 70.08 88 48C88 25.92 70.08 8 47.96 8ZM48 80C30.32 80 16 65.68 16 48C16 30.32 30.32 16 48 16C65.68 16 80 30.32 80 48C80 65.68 65.68 80 48 80Z"
        fill="#FF2E2E"
      />
    </svg>
  );
};
export const SuccessIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_619_809)">
        <path
          d="M48 8C25.92 8 8 25.92 8 48C8 70.08 25.92 88 48 88C70.08 88 88 70.08 88 48C88 25.92 70.08 8 48 8ZM48 80C30.36 80 16 65.64 16 48C16 30.36 30.36 16 48 16C65.64 16 80 30.36 80 48C80 65.64 65.64 80 48 80ZM66.36 30.32L40 56.68L29.64 46.36L24 52L40 68L72 36L66.36 30.32Z"
          fill="#2A9928"
        />
      </g>
      <defs>
        <clipPath id="clip0_619_809">
          <rect width="96" height="96" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const WarnIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M48 23.96L78.12 76H17.88L48 23.96ZM48 8L4 84H92L48 8ZM52 64H44V72H52V64ZM52 40H44V56H52V40Z"
        fill="#FFC566"
      />
    </svg>
  );
};
export const BuildingIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="44" height="44" fill="url(#pattern432)" />
      <defs>
        <pattern
          id="pattern432"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_759_693" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_759_693"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABUElEQVR4nO2UwQnEMBDE3H/Tuh5iOHltCeYZCBrPrhUREREREfF/kPM8VIALFVABo+Hx6PB4dHg8OjweHR6PDo9Hh8ejw+M5jt0fZvj3OrYAKmC2QFrAqoAd7BdIC5gtkE7QqoAd7BdIC7g7x2MLogJ8SbQAXxSdoDtzPLYgKsCXRAvwRdEJ+nZDGf69ji2ACpgtkBawKmAH+wXSAmYLpBO0KmAH+wXSAu7O8diCqABfEi3AF0Un6M4cjy2ICvAl0QJ8UXSCvt1Qhn+vYwugAmYLpAWsCtjBfoG0gNkC6QStCtjBfoG0gLtzPLYgKsCXRAvwRdEJujPHYwuiAnxJtABfFJ2gbzeU4d/r2AKogNkCaQGrAnawXyAtYLZAOkGrAnawXyAt4O4cjy2ICvAl0QJ8UXSC7szx2IKoAF8SLcAXxasnKCIiIiIiIiIi1pH8AIN9c0RlQ7dnAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
};
export const MessageIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="16"
      viewBox="0 0 512 512"
      fill={color}
    >
      <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z" />
    </svg>
  );
};
export const ManagerIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#pattern998)" />
      <defs>
        <pattern
          id="pattern998"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_833_767" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_833_767"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADrklEQVR4nO2cy28NURzHPxKPSsqqhEgsUAmJJiJBUsGu/4BXI9aCna1odEMi3Yi36tLGxl+gxQIpEY8lK0L0dkFoq+oxctLfjeu60Rl3Zn5z7/1+kt9mOr2/1zlnfmfOmQNCCCGEEEIIIYQQQhSPpUAvMAiMAiVgxqRk164BB4Al3sY2E+uBIWASiGJKuPc60OltfCOzGBgAviUIfLWE3nEWaPN2ptHoBF7UEfhqeQCs9HaqUdhsY3qUsrwBuryda4SWX8og+JVJWOHtZFFpA55mGPyyPLbni6hiIIfgl6W/Wnmrs77OaiepfNZQ9CdDOQa/LJecGlshZ7iTDgmY0Ix5ll6H4Jdlv9nQ0gw6JuCqt/NFYNQxAWGG3PKMOyZgrOWjD3x1TMC0EoAS4M24hiBfRvUQ9uWaYwKuOPteCA44JmCvt/NFoN1eC+Qd/AnTLZhdQM87AWHoExUrYTM5Bj/MPdaUlYtZzuaYgDOmU1QtST7IIfj3gUWVisVvwoL56wyD/xZYVaFP1KDLdi+kHfyQ2E21FIq/WQbcTXnY0XaUhCyy3QsTdVY7pzXm18cKW0BPkogJW+1SqZki7baGG97fPLTFlK8mY3btMrBPM1whhBBCCCGEEEIIIZJ/ObPF9g31ATeAYfvK8ZV9zjptUrJr4W+37d4++9/wGzo7Yg4WANuA48AtWzrMYjnylunYZjpblnnAVltwGXb6RmzSdPebLcGmpiY4uMPe2b9zCHgUo4cE27qbLRnLgRPAy5QD9gk4ZPIp5d9+aTaHtemGZaN9//slg9b6CFhXoWudXUtbzxfbNrmBBmK1rcd+zyAgP4FzwMIaeucDp4AfGegNv3kTWEuBWWil33QGAYiA90BPDDt67N4sbAi+nSxiBdWV8gFLUQ0ZSWDPSMa2PC/SJq+9Oe7v3x3Dnt05HvixB2eO2Lich8NRzF6QdeuvlOD7YZw4mNEDL6qjF+TV+ivlh73yyP18nykHZyPg6D/sOuZk01TeR2Tec3I0KmAPKMudvILf7ehkNMfstMPZtu3NfrzMWAz7xpr9+Jtnjg6OFKwKqpYnOcSfj44OXohh30VH+z7kEH835yKbd8zFUWcbM8fTuV0x7Av3KAEZBWFZjAQkrYTSboCZ0wjHi5WUgPQTMJwgAUkqobQbYNP2gPMJbAzVkhLgUAH9TyWUlJbtATsT2JikEkrb/6ZNQEcCG5NUQmn7nzkewX//H3bGfSeUtv9CCCGEEEIIIYQQQlCLX+PxlBqSeNXFAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
};
export const TrashIcon = ({ style }: { style?: CSSProperties | undefined }) => {
  return (
    <div style={{ display: "flex", padding: "0.2vw", ...style }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="14"
        viewBox="0 0 448 512"
      >
        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
      </svg>
    </div>
  );
};
export const StaffIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#pattern999)" />
      <defs>
        <pattern
          id="pattern999"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_833_768" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_833_768"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};
export const TechnicianIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#pattern999)" />
      <defs>
        <pattern
          id="pattern999"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_833_768" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_833_768"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEjklEQVR4nO2dyWsUQRSHf0aj4oaBuOFBZXLRJAgq/gfiwRgPiogiasT15i1B8SSoiFldTiqYg+JNcIOoBxH1oAET14OKoiKCWxJjNNGWIjUwhMlUVXdt0/U+aAikp7av+/XrmqoEIAiCIAiCIAiCIJKyEEAjgCcA+gBEgoPQRCmAJgCDEoNOAgwM/nXFgac7QCNNMQefQpCmmK8adkiAJ1c/3QEaYNkOCXBILwlwC4UYx5AAx5AAx3gnoBpAS85cSB//uRlAlYsGhcIEAKcA/C1wNQwBOAFgvOvGpnHwbyukY7dIgl5Ox8iF2zS3IViqBWGnUDiqdN34NNCS4FW80XXj08DTBAK6XTc+DfQkENCjWNcYTeekiiQCfijUMw3AJYnzLgMoUyg3cnwURQiakjPtK4Kd08U/E4SAZgsP4YsKDc6edyEUAVU8pVSteAjAIonylyo2OPfcJSEIAJ9eUK24RbLsswkEnAlFAJvbualQaQdfyiFDVwIBr0MRkJXQJghHQ/zKlx38fF/5icg9dyAkAVkq+cO1mw9eL//5uGTMH8mnBAJ6QxSgm3sJOvcwRn0kYAT7EwxKPdQhASOYAaA/xsCwz5RDHRKQh80xBmY74lE0AmYDOAjgPoDveQr+wn93IOaVOJKjCp06DDdzW9YE7JHcfJA9WKe2ITnrJepi57ia27Ii4EiCyq4AqEg4QJGpW1rTYlujAjZoqJC9HB0CMMlTAZUx57aMC5gI4L3Git8CWOehAPA3eu8ErDXUgA6+ycEnAapzW1YEnDPYiD8AjgGY6omArIRWC+FImjcWroYPADYJvte1JWC0uS0nAuZbGPzI9hWlCSvt2erBwEYhCzAZ/yMS4Ef8j+gOsBP/PwJ4kCIBPYL2yC6PsRb/WTgrAVAH4HMKBLwQtKfGt/i/Jafs6fytc7CIBVwVtKdb8v3GWvyfl6eOxQDuFKmAvRJtYqv6auOI0B3/mcykRJ4JmGvyb0Xojv9skVXaBIDvjTMiwGT8T5OAWQC+mRBgI/6nQQBjRcxQVFTx32cBjJ0xZk+t5v9pF8BYqRiOjDxY8h1MaAgCss+Ek/x7jtjtvaFZAAtpoQjIMgfAbr4Y4dko3yeMyjXNAmSOhkINCo1WBwLaXXfaJ2ocCOh03WmfGM+XjtgU0A9grOuO+8QuB3dBxnWnfaKU77OyKaDWdad9Y4dlAQ2uO+zjXfDKooB21x32kTqJgWN7hWVYIyin03BfihKWmbwUDNxvydnOCkE5vygTij85x+aPRJRI7PnKKF4gwdwFohUAbPJpgURZLMxElAmZ2SzHpjBEsAdtRJlQvLvguWDw2FqfcYJyWKoZUSYUj40Sd8EyQRnsZSuiTKjwnwcrG+Uol3gvWCUQkBF8vj+kTMjEyxTL9UWZ0E9BGUl3UwYtQCaN7KRMyIyAd/wKF3GeMiEzAvZJ3nn1lAkN80/j4D8GMFlSwGrKhIYZ0rjDUWXlQ0ZQXjCZkMzaFdHB/o/iTMV6SygTGmYgz4CybTdfCxxsm9FdvvhoeQL5jygTIgiCIAiCIAgCgfEfuEbpvUxO5DwAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};
export const DetailIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#pattern93)" />
      <defs>
        <pattern
          id="pattern93"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_844_767" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_844_767"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEI0lEQVR4nO3cyWvXQBTA8RGsghuK3kStoFUPLnh2w+pZFP0PvKlV1Jvb2QUKrvgPVClorZ49ugvu2npUcLfgjhtfeWQKRTQz+f2SX5KZ94GAtHWmv7xkMvPmNcYopZRSSimllFJKKaWUUkopFTVgLNAFXAc+20P+vU2+V/bvFzRgOnCX/7sjP1P27xnylZ928kcGwftOIDKmiQDIsONrqwYg/wDcwN81DUD+AfiEv08agHID8EEDkH8AdAgqOQAyz/elD+ECAjDWTjFd5GfGZGg3KiaHhVhaEHQhVjS5umWIkammfTDLcdV+zfvKV0oppZRSSimllFJKOWhdUIm0LqhEEdUF/bSVfkeAzcByYDYwBWgr9izHWxf0HbgAbAQmmSoKdFP+HbAfmGaqLmNZyscM7ZbhC7AHGG/qIqAAXARmmboJYAj6BmwxdVXzuqAXwFJTZzWuCxqUaaQJQSx1QSSlNyuBA0Af8BgYAn7YY8h+rc/Oola0bI0Qcl0QMB84bqenWb0FjgHzyv4ctQO0A73Ab5onbZwFZpb9uSoPGAXstOuCvEmbO6SPsj9nJQETgUsUT1IcE8r+vJUCTANu0Tqyhppa9ueu0pV/m9a7Gf2dQDLmt2LY+Z++qJ8JJA/cLJ4AB4HVwBxJ3tljLtAJHAIGMrbZZWIEzLSvVfAhi6xNvlcrsMZzs2p4dtRuYkMyz/chi6nRDbTfBpzw7KPHxIRkheuzyNrRomHuF9BhYkGSXnA5lmN/Jz36O2piQJK7kjxNmoeNDDuO4Uge4GleN9Rn3eqCgFUeV+O6Avrd4NHvsuDfF0SSUk7zpMA1h+xFpNkbQl1Qp6N9ycWkOWgKAhx29H0+hLqgOY72ZU7fcACbAax19P0whE35yY723zcTwGbYFXOadyG8L6jN0b5UvaUprDZIkm+Ovr+H8L6gtiYDMKHgzGuaL1ka0yEo/yHoWQh1QXMd7T+q8EP4Tgh1QZ2O9iUHn+aQKYgtcU/TG3xdEEndTpqBIjZJ7ELsqaPvXcHXBZEUTbmsL6Bf+VuDfFMRdUSSGHvjOBGP8qxssxepa6fsVZ4JwEoj2WRxOZFjf6c9+us2sQDmeW7I7Myhr934WWJiApzxPDGnGhmO7LDjc+WLfhMbYEaGTfmBBjbl73u2LXfiYhMjYDvZDNqUspzgjhFlKR12kXXEY6r5t4/AQhMjkrm5a3+gFd7EHIRxwJWKBGGRiREwNWNyscggRHsnjPfIE7UqCItifiZsyzA7yuK3feBqEDynqD05/YmS6JehxR6uNMiwt9HeCcPs9PKoLZrKSnI73X+vcDMG4fLI/xstYLRkKoF9wDnggd3cl+3Nr8BzW6LTa2tBl6Ul1jyDcK8WLw2pK2AB8FJPfvWCoFd+iUHQk29KILMdeeD+a8z/A7uP0mi/ltj5AAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
};
export const AssignIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#patter34643)" />
      <defs>
        <pattern
          id="patter34643"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_906_768" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_906_768"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAENklEQVR4nO2cT4hXVRTH7wgKmRCIMZZatojW06IEhTFkJCUjWkngJmhRNpWrXLYUXYULi1LxTy7EhSmai1qIIkrtJJpICmrREGiOExnm+JGr54cWzu/d93v33vO873xgYOYHv/l9v+fc9+499573c84wDMMwDMMwDMMwDMMwDMMwDKMBwFPAOHAKmAD+kp8Jee1dYJlWkNuub2CAJcCnwE2qmQEOA8tNX5zgvwZMU59rwKtd19cI4H0Z0YMyA7zXVX0xRlYTcz1mUoy0tutrBLB0wMu63+X+ZFf0NQbYQ3w+64q+GEu5kNVOXW76kVu6vsb4SYl0bC5dX2OArxIaPFG6vsYAPyU0OFG6vsZEXl38n+nS9bmWG5wqXV9jgB8TGvyhdH2u9EmOlutrjGzZpuLt0vU1xu+XJyp0/o1UiLVaXxSAzxMY/KQr+mIdwPgNqlhMAU90RV8UgHWRLvUZYEPX9EVB9l2aHniMd1VfFPxhxYCX+xTwStf1RQF4HPhYVgoho2p/zntq2/W5yCdRm4GTvmqUbYFp+f0E8I7mUq7t+gzDMAzDMAzDMEKqy1HgLWAH8CXwHfA98AtwBbgh1eVV+fs34AJwDNgFfACMpag6gWFgrTTo+s86Lp/9q2jxWw09/pTXvO7zwFFgp+wlrQYWqg8H4FFgvZT0vnKMzSVg96DJAOYDr8v/SHEuPCFJWRM/uv2NPQ/sA/4hPUeAoZr6VgKHgL8z6PObeivTRfu/xl4GTpOPS8BjNfStlttFLvIEH1gs9+jcjAXqWyiPOFFi8FcBk+TnbKC+EZnIiwz+WKb76ECjX+71frVSZPCfk6WiBpNVE6+0mhQb/CHgDHrsC9D4TWZNWVc7vljR5I2AeanM4IvBA+jyQoW+vcUGXwz+jC5PV+i7WGzwxeB1dHlEsd9fN/hiUBWnr89/WcdonmjrGOyL09WnG/wMBitxevr0g5/YYBBOR187gp/QYDAuv76kE67sVwVtLKYyWAuXV1/SkQ88A/wuPahvhr5JFZdPX+rgL5JTsx63gA9D3qiKy6MvdfD9cei5WT7bH+HOSW1wYFy1ubYHf27Ao7EHgXmpDDbCVRts84Q7JM8ShHAkhcHGuGqTrV1qAtsDtfj2nLUptXQO7j7MEYKfjDdp6y0KYGONh/+2aOstCuClGj1S27T1thZgK/DiAFXu/S2N/dhft8msMwAfSZB8I8KKmlVuCF/PuuzsOtwLPqFJeECV249vgQX5HD3cwa9MQkWV+6D2yuH8zh7u4M+ahMAqt8cfwLN6Dts/4YZwtTcx16xy/cQ8ou2ztXC3xf5yYDDvXAlW5UbGj+wa7ZehnSK+GNsYW2uxUO9KCMGqXMUkWJWrmIQvrMrVS4JVuYpJsCpXMQlW5SomwapcxST4c2WrcpWSYGe5ikmws1zlbQv9b0o3DFcatwFXhnsiS3oHaAAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};
export const RejectIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_908_769" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_908_769"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFDElEQVR4nO2dSYgdRRjHS3GJCwlKEieioqC4YQSFRBA0LuhFjbigguQW0ZNeRI0KatTkMAENMYqHoKDoxYsKEtSDniZmNGIQx8EdQRPJEDWr20+KKbF5vNeprv6qa+n6wVxm5tWr7/+vrWtrpQqFQqFQKBQKhUIhEoDDgPOB24GHgU3AB8AU8D0wA/xpfmbM76bM/2wyn9GfPU+nFTqeJAAuBB4C3jaiSrELeAt4EFgcOs6oABYDTwHTdMeXwJPABaqPAIcD1wPvEp5JYAVwhModHSRwj2mvY+M74O5sjQCuBrYTP1PArdl03MAZwPukx3vA6SrxYeRdwG+ky17g3uRqAzDPDCVz4U1grkoB4Ezgc/JjGjhHxQywTPgBKjZ0bMtUjACXA3vIn716RKdiArgW2Ed/OABcp2IAuATYT//YBywJLf7JwI/0l5+AU0OJfxzwSWgFIplLOiaEAc+Hjjwi1nct/lXAP6GjjgitxTVdiT830tnM0HwDHN+FAU+HjjRiHvct/qKePGy58jsw5tOAF5yz1h82+BJ/vnkCLNRzEFjowwC9o6Bgx/0+FtF1L1+w4yutmaQBV1h+ceF/LpM0YLyScMGOtZIG5LjC5ZvPpMQ/zXtW8+UUCQNuCh1FwiyXMODR0FEkzCoJA14PHUXCvCphgF5wKLixVcIA/VBRcGNawoCdjl9egB0SBpQJOHcOFAPCclDCgJ8DB5EyMxIG6PNUBTd+kDBgi+OXF2BCwoDyIObOaxIGlKkId1ZLGHBLiwz0nRskDDg3dBQJMya1HrwjdCQJ8kVr8SsmvBI6mr4vSd5JP/gFeBZYCTwBbGuR1qWSBiwE/iZvtgALhjS/6xxPVMqeLQbeIV8mgRNqYl8ddGOWycTN5MmEPlhuEf8ay/T05uX5Pgw4KsPR0GRdyXesCePi4lcysJaelfyGNUGfIV6kfGF2SOs98L0q+Q1qwiPKNxlsU5xwKfkWNeFrYI6MyvVffJKpar0r+TU1QQ/Rr1RdYR5SelnyR9SEZ1SX6IPJwLdkKD6zdx1tBpY20OPIQ/x9qUlTrgAAN5JZs8Os+NoszW59D4aAThdXrvD5GDixbZrVxPVNUrFPL8xzEJ+KCdY1YUTJ12n4aQpNh7wz4om1BS3Eb2XCCPG9mLCchO9voF58JxMOIb4XE14kPlZa5l13jjZYmWAp/n9sljJgDvARCV4bAFxkLve2obZjHuhwbdJy7l9GHWWKqT/YZntUtGGpHSqcRBpSx1n/IB7WNci7s4BRiF/JzB2R3SU03iDvjZujoM1OTSCriIs1DfLetDTHUfKHBLKefpgQn/iVy7s3EhfjnpqjuMQf2FWgX6jT15qwO5j4AyZsjOAOnw+Bx/QlGk1uMmlhQnjxB5ojqfXk7Wb1aVflxt495hJVvR9nK/CGudtOvxtmCXBsy/w3NSEe8asA9wF/tVFfhcl3HgZULvr+NRUDaDbOHzSh9XqCF/T7u8xbixqTiPhJmDDmcv6sw/xJPQtE3RwdbXYjR2WAQMlPpyZogNts+wXlmWymIpoCnGUWrYMZ4DKrGdVMqNCrDh8wD06dGtBmVlNyUScKmBXj064MyGZBxlNt2O/TAMn5/OxqggY428zj+DLgueQX5TuaS1qhS5enycKXJMRvWBNENwp3AhL3cI424WUJ8TvfmJULDK8JbbcmDqsJ6ZX8QCaIjFQGTCjiKzsTNkgOE+u2p/8LLe7jnBs41uIAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};

export const SendIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#pattern3332)" />
      <defs>
        <pattern
          id="pattern3332"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_914_767" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_914_767"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAD6UlEQVR4nO2cX2hOYRzHzzYUSSQN05IboUZRSsrV5kZCuduIe7lAblxwZ1kKN5bcWC25NNHcSEkJSXaBVsQsWZKZWJt9dNop22vnfZ/3vM/fc36f+z2/5znfd9/OPue8iyJBEARBEARBEAShZoDVwHHgeu2rCUoAC4GDQB8wwTQn1H5ayARQD+wEuoFRZvMHaMq2slAWYBNwFnhHOv3lVxGy9voz1GivboKg2usqjAGL/19RqLXXVblReZKQpddVaZ29uqCr11X4BDTMPVGIauh1VS7IZTbT66q0lM4vLOjtdRUGoqKDmV5X5WRURDDf6yrE6mFNVBSw2+sqFEM9YL/XVcmvesBNr8dV9rqw6gG3vf41+S0bL5R6YHav/8ANb4DdwJfCqAf+9fp73HIvvpMBXuVePczo9ef4wSVgPnA7t+rBk/v1Un4Dh5P9dZI39eBJr6cxDGxP9tlOntSDR72exgugOdnrVuAnoasHD3s9jVvAomTPq4AhQlUPnvZ6GlPAeaBuxt6fkI37Li+6z72eRrzP/TPOUAf0kp0OFxfe915P42Pc8yVnOUN27KmHgHo9jUdAY8mZ9iUdnhV76gG4TLhcAxaUnKdFQ2222QygLsAQJoHTc5xlOTBY49r21UNgIXwH9sxxhlgzPNCwvhv1EEgIb4ENKfu/qmmGO/XgeQj9wNKUfcc3ETpwrx6SEK7gF93AvJT9tmr8A9EP9eBRCOPA0TL7XAeMaJrlh3rwKIQRYFeZ/S2JK0PjPHfqwcMQXgJrK6iSO5pn2lcPnobQF3+6K+zpouaZfr/1YCmEqcRk1lfYyyEDs3si3zEcwi+VF5+AHckjRt3YUw8ehjAEbFOY3Qx8Rj9hvfWgOYTHwEqFmfGDlaeYIZy3HjSH0BtfWMVZNzGH3289GAhhci6TWWbOOczhXj1YDmEU2FvF+geSuyNT+KEeLIUwCGysYt0tyf25KfxSD4ZDeAisqGK9RuADZvFPPRgKoTt+WFLFOguSwEzjp3rQGMIEcCzDGvFzXtP4rR40hNBZzmSmEf8DJOzgv3qwDdNfmohvUW0QhnqwBbAe+Gbxjelw1INpgGXJw3ZbhKceTAE0AHexS5jqwQTYf9oWtnrQCXAE+4SvHnTA9Kvvqt/R1UV+1EOtkO3LcrWSL/UQ4NsWHa7PXeQQxnKrHgIJocf1WYseQpvrcxY5hGFRD25D6FKZL0TGQtgsF9ddCKIeHIcg6sFhCKIeHIcg6sFxCKIeHIYg6sFxCD3aNyBE1YQg6sHhl8mHRT24DaHL9HwhKhuCqAeHIQzIp9NtCKckALchNEkAgiAIgiAIgiBEjvkL4sRvdQA+QCoAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};

export const BillIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_918_767" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_918_767"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEeElEQVR4nO2dS6sURxSAK1ETIkbxcUWiUWIuuNBtJCG60aUrX4kPcBfIP/C5mEXUi4QQLldDyMIfIMlCReLClTtxEx9JCG58gUGjiyzU4ZpPDtPKYOZ2V1c/TnX3+WBgYKa6zzlf3+7qquo7zhmGYRiGYRiGYWRANu+ntF3Q9vauajwS2JrSdnvb27uq8UjgT2DRiHaLgL/a3t5VDX7cBXYC85PXds/kG98+FgGdxZkAXUyAMiZAGROgjAlQxgQoYwKUMQHKmABlTIAyJkAZE6CMCVDGBChjApSJToBrOMSWb3QBdS3f6ALqWr7RBdS1fKMLqGv5RhdQ1/KNLqCu5RtdQF3LN29AXcOZAF1MgDImQBkToIwJUMYEKGMClDEBypgAZUyAMiZAmegEVB5QBgE17AOXgW+BfcDnwEpgIfBW8pL3q4ANwFfAaeAP4D9XNS0V8AK4COwG5hXY1/8eby2dlgn4BzgCrHBNoSUC+sCPwJhrGi0Q8CvwkWsqDRYwDfSAt12TaaiA+8BG1wYaKOAOMO7aAs3iNvBxQI6zgM+AQ8DPwE3gcXLx7ifvbySfHQQ+re3URnN4AKzOmduHwARwL2B/8h9WjlfepaUZTAObcuQ0lnRLn5ewb9nGKWBxlwUczpHPnuSGrGweAV92UcBFn/MxMAf4qYZ4fgBmd0VAH1jjkcNc4EKNcZ2XfXZBwKTnkV9n8YclFP9LIF6eAEs84q/jtDMTp2oX4CIC2Is+XxRNIhcuEoDFwEP0eeTzl5qWSC5cJDDo59fRCbjl8b2pIonkwkUAsKKkm6ysm79dyXTl1YzvPgOWhyaTCxcBDIYXqj7yt71xZ/1bRptjocnkosxChiA3Zck4TaVH/oj9ZkmQ8aZZIQnlwinDYFTTl1vJ0Rx05M8g4VpK+/UhCeXCKcNgSNkHOVqXSEE9JaQW31PCgZCEYmNzRrwyZu9T/NcT9B4SvIo/tL0TM2znTBsEjGfEKxMnaVwbtToiRUI/7TcGRmynl7bvNghYkBFv2lDz78CylLZbki5jFcUXHrZBwJyMeJ+HFH+EhLKLLzzz3d7whmPj3UABJ3LkvLWC4rdGwFiBU9BE7gKUV/zWnILGC16Ee0UKXqD4rbkIbyyhG9pTKH5wN/Rf4uLrkm7EJmouvrA/ZGeySCkmTmbEK4umfOnVWHzhkxAB3xMXV0oejOvVVPzbQavpgHXJCGAsvACWZsQsK9YoU0LB4gtHcxd/aOcniYt9FUzI9Cos/lPggyIC3gEuEQ/nPGKW5YIUlVBC8b2Wz/hKmIrkdDQtTy16TMrLhHiwhJKK/7dMWxYWMBTUWuA74LpyF/WYR6wyZxtCr6TiCztcl2GwVlOL4qeepsPg4YtfFIp/rtRFuk2GweJcWatZF2eB97TzjgpgdmDPKC+TduSnIGs1K1qyKL2dbl9wfUl+rnzqjenHIjdZk6V2NbsCsFy6s8mjrSFjO98UusM13CsRMoC3XtbtyJh9snJCZtZkOENe8l6Wsshn+2VUM/Qx1Zc0pRnznlkyMgAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};

export const PaidIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15.1322" cy="15.415" r="15" fill="#6DE981" />
      <path
        d="M11.3059 18.2909L6.32748 14.7926L4.6322 15.9754L11.3059 20.665L25.6322 10.5979L23.9489 9.41504L11.3059 18.2909Z"
        fill="white"
      />
    </svg>
  );
};

export const UnpaidIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="48" height="48" fill="url(#pattern34234)" />
      <defs>
        <pattern
          id="pattern34234"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_370_1415" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_370_1415"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export const GarbageIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#pattern4867)" />
      <defs>
        <pattern
          id="pattern4867"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_924_767" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_924_767"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADFklEQVR4nO2cPW7VYBBFL1IKKAApBbAB0iNBQ0GTsABAdDRkBWEFUFKFBfCzAiioYQWwgEBaFAkk6CAUSBxk6YUCPXksPCN/Y8+p373j8ZfiWec5UlEURVEURVEURUMAjxjP46n3WPLNP6EOYcKbf0IdwoQ3fz6H8HeVYi11ABNTBzAxdQATUwcwMXUAE1MHMDF1ABMz5SNCURRFURRFURQLAthneeyrFYAHLI89tQJwh+VxW60AXGN5XFUrABdZHhfUCsAp4Jjl8LPbWS0BHLIcPqo1gLcshzdqDeCFx2ay54TmB/Jcc/1Fm+w5ofmBPFRrALsem8meE5ofyH21BrDjsZnsOaH5gWyrNYAtj81kzwnND+SyWgM4Dfweu5nsOaH5AXQ7nlGLAF/Gbid7Rmh+AJ/VKsD7sdvJnhGaH8A7tQrwaux2smeE5gfwUq0CPBm7newZoflUIiZCzMieEZpPJWIixIzsGaH5VCImQszInhGaTyViIsSM7Bmh+VQiJkLMyJ4Rmk8nYrzFjOz+0Hw6EeMtZmT3h+bTiRhvMSO7PzSfTsR4ixnZ/aH5dCLGW8zI7g/NpxMx3mJGdn9oPp2I8RYzsvtD8+lEjLeYkd0fmk8pYjzFjOzu0HxKEeMpZmR3h+ZTihhPMSO7OzSfUsR4ihnZ3aH5lCLGU8zI7g7NpxQxnmJGdndoPqWI8RQzsrtD8ylFjKeYkd0dmk8pYjzFjOzu0HxaEeMlZmT3hubTihgvMSO7NzSfVsR4iRnZvaH5tCLGS8zI7g3NpxUxjmLmrNHbi5E9/5/XtKtsjBAzt4zeXoIeEHeUjRFi5gOw2dPbS09uc8RPZraUjU5ejBAzn4C7wLk1vb2s+fy51V/+4exFTMQbMw2QR8REvDHTAHlETMQbMw2QR8REvDHTAHlEzL90EoP87CkrwE3ys62srJ48M/8jpx/rvgqnAnhGXp4qO8Al4Bv5+NqZPc0B4DrwnTwcAzc0J4ArwAHtc9Bdq+YIsAHcA14DR8Cvqe/26hqOVtfUXdvG1PepKIqiKIqiKArNmj/op6GhrwqdFQAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};

export const PlusIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M48 8C25.956 8 8 25.956 8 48C8 70.044 25.956 88 48 88C70.044 88 88 70.044 88 48C88 25.956 70.044 8 48 8ZM48 16C65.7205 16 80 30.2795 80 48C80 65.7205 65.7205 80 48 80C30.2795 80 16 65.7205 16 48C16 30.2795 30.2795 16 48 16ZM44 28V44H28V52H44V68H52V52H68V44H52V28H44Z"
        fill="white"
      />
    </svg>
  );
};
export const OptionIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#pattern9r3)" />
      <defs>
        <pattern
          id="pattern9r3"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_933_767" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_933_767"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABEklEQVR4nO3aQWrDQAwFUB3EXhbfvRjfrNDMBVQM7aabhkypGus9mF0CYr61GX4EAAAAAPwva0TsETEiIn8452+OiNiqh77S5b/dcfHfz/mfpXr4K9gfuPyv81o9/BWMiQBu1cNfQU4eBPDc0gYIoLW0AQJoLW2AAFobExvwXj38FRwTAZzPGEzaJh7jXtz+71g+H9Zud77/nF++ywcAAACAB6y6oXVW3dBau25oraEbWiu1IgTQWtoAAbSWNkAAraUNEEBrQze01qEbWmvTDa236IYCAAAAwN9YdUPrrLqhtXbd0FpDN7RWakUIoLW0AQJoLW2AAFpLGyCA1oZuaK1DN7TWphtab9ENBQAAACCe3Af+ttJ6DV5jIAAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};

export const PayIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="42" height="42" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_370_1410" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_370_1410"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAD9UlEQVR4nO3dS4iOURzH8eM2rhELt7GwkHIXUpaykIWUUjaUiJqFrZ2xcA3DaFxCcglZWIjJQmaBUIMSNm4jQnK/jJh5+eo0ZzEN5n2e85zncs77/6znfc7v/J/3cs55zvOMUkIIIYQQQgghhBBCCCGEEBkDpgD1wH3gG8X3zWTdDUz29g0D9AX2Ab/wl86+F6hSHha/iXBc9uokAPsJT4Py6Dv/F+EpAZNU0dHxgxuqOlV0wAPCdU8VHfCVcH1RRUfgVNEROFV0BE4VHYHLu75CCCEqEDAEOJ53jooEzANeyCggY0A/YGvn1c2sM1Qss6x8V8bBGQN6AeuAnzYTEQKXdvHHAleSBCBwaRZ/eZSlZDkBjgHDgXOu3gEEznXxFwCvXAYgcK4KPxg4kkYAstGU14V/F8WfAzxKKwDpegksMe2sJwdJCt8D2Jj0nZPTCSgBu4BBndrpCVwgY7bF7w2cziIA7jUDM/7T1lDgCR6cgNqsAuDOZ2CtnhiWaW868J2M2BR/HNCWVQDcOAtUx5zDFPYEbM4yAMk8AxbG7mRHu3ondupsgt3JMgB22oHtwECb4pt2q4AbpMwm2IcsAxDfbWCWbeG7tD0q7sQyLptQmQYguk9AjR5O2hb8P+3PNZ+oVNgEyjQA0ZwHxtgWOUKGba77HbX//wqTaQCgtZuXP9XrTwkWDY8CMyP8bf8ks32nm3NdJ7Dcnt4GbAEGWM7gVwHvzbFagGE5DU3jb093nSBCe3u6vOSa7d2G+o4U4Oo/Ylws99thPgXvHHd/p00nnIpYtJIZfa3W72CLzLp4m8pMIDdEOM5Bh13XfZpY+BOgAcuAEcoCMB94HLEg3Q5fgRUOu15v059cToANYCRwKmac02WOOdVRty8BfWw75pRViG6YZeU1wEeLOC1ljj06YXfbzR3zdsU3IVyL/Z1eZu/R9QRZfnf3Y2yu/MX1yeyH2gFMUEnhXrWDTAPMjrukq7RvVNHh3jwHGwGeOspyQhUd7p1MsFB2xmGOdi+eZoJ7bXFWL+n4ka0x360urVQ+IB3P9TbGCG1PA26m0H6t8gXp+WAmXH8N0YBqs4shjWXhQ8onpE9fADmmlwbouKrV6PIadBd6G0pv5RPC0dx5X5A3CMMT27Wl3OG/t8B45Sv81qr3siqf4a8SsEj5Dn/VqBDgp1oVCvxzWIUEvzR6N9EK6CF6zV5OtAJ5jORjvfFKhchc0yz608onqlDpixZmTF1E7cBiFTrzCPai+QEsVZXA3LygH8FeFA+B2aqSmJPQkPPX0WvzJJZ+qlKZvZt1eqdvykPUktkcews4oO/90v/YIe/+CyGEEEIIIYQQQgihHPkDgwyv5m2v2AMAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};
