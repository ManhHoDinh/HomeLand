import { SortOrder } from "@/models/enums";
import { CSSProperties, useState } from "react";
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