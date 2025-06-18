"use client";
import { useState } from "react";
import GetEntity from "../dlt-manager/get-dlts/get-entity/page.js";
import GetSender from "../dlt-manager/get-dlts/get-sender/page.js";
import GetTemplate from "../dlt-manager/get-dlts/get-template/page.js";

const steps = [
  { label: "Entity Manager", component: <GetEntity /> },
  { label: "Sender Manager", component: <GetSender /> },
  { label: "Template Manager", component: <GetTemplate /> },
];

export default function Timeline() {
  const [activeStep, setActiveStep] = useState(0);

  const handleClick = (index) => {
    setActiveStep(index);
  };

  return (
    <div className="flex flex-col items-center w-full  bg-white ">
      <div className="w-full flex items-center justify-around relative mt-4  text-black ">
        {/* Progress Bar */}
        <div className="absolute top-1/2 left-0 w-full" />
        <div className="absolute top-1/2 left-0 w-full" />
        {/* Step Balls */}
        {steps.map((step, index) => (
          <div className="flex flex-col w-full text-center">
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`py-2 border-1 ${
                index <= activeStep
                  ? "border-blue-500 border-b-2"
                  : "border-gray-500"
              }`}
            >
              {step.label}
            </div>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mt-10 w-full px-4">{steps[activeStep].component}</div>
    </div>
  );
}
