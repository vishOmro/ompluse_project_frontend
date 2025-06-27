"use client";
import { useState } from "react";
import GetGroups from "../phonebook/get-groups/page";
import GetContacts from "../phonebook/get-contacts/page";

const steps = [
  { label: "Groups", component: GetGroups },
  { label: "Contacts", component: GetContacts },
];

export default function Timeline2(inputStep) {
  const [activeStep, setActiveStep] = useState(0);

  const handleClick = (index) => {
    setActiveStep(index);
  };

  const StepComponent = steps[activeStep].component;

  return (
    <div className="flex flex-col items-center w-full bg-white">
      <div className="w-full flex items-center justify-around relative mt-4 text-black">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col w-full text-center">
            <div
              onClick={() => handleClick(index)}
              className={`py-2 cursor-pointer ${
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

      <div className="mt-1 w-full px-4">
        <StepComponent />
      </div>
    </div>
  );
}
