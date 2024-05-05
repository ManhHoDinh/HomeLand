"use client"
import React, { useState } from 'react'
import { ClassNames } from '@emotion/react'
import mainStyles from '../page.module.css';
import clsx from 'clsx';
import utilStyles from '@/styles/utils.module.scss';
import layoutStyles from '../complainResident/complainResident.module.scss';
import ResidentInfor from './indexing/residentInfor/page';
import ResidentContract from './indexing/residentContract/page';
import ResidentService from './indexing/residentService/page';
import { futuna } from '../../../../public/fonts/futura';
const Overview = () => {
    const [selectedOption, setSelectedOption] = useState(0);
    const options = [
      {
        index: 0,
        title: "Profile Information",
        component: <ResidentInfor />,
      },
      {
        index: 1,
        title: "Contract information",
        component: <ResidentContract />,
      },
      {
        index: 2,
        title: "Service information",
        component: <ResidentService />,
      },
    ];
    const handleSelectOption = (index:number) => {
        setSelectedOption(index)
      }
  return (
    <main className={clsx(mainStyles.main)}>
              <div className={clsx(layoutStyles.wrapper, futuna.className)}>
        <h1 className={clsx(utilStyles.headingXl, layoutStyles.title)}>
          Resident Overview
        </h1>
        <div className={layoutStyles.tabLayout}>
          <div className={layoutStyles.tabHeader}>
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelectOption(index)}
                className={clsx(layoutStyles.tabItem, {
                  [layoutStyles.selectedOption]: selectedOption === index,
                })}
              >
                {option.title}
              </div>
            ))}
          </div>
          <div className={layoutStyles.tabContent}>
            {options[selectedOption].component}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Overview