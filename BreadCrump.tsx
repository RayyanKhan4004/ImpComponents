import React from "react";

function BreadCrump({
  setIsOpen,
  isOpen,
  BreadCrump,
}: {
  setIsOpen: any;
  isOpen: boolean;
  BreadCrump: string[];
}) {
  return (
    <div className="flex">
      {" "}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-600 focus:outline-none text-[14px] flex"
      >
        {/* <BiFoodMenu size={24} />
    <span className="text-black">|</span> */}
        <span className=" flex text-[16px]  font-arial pt-4 sm:pt-[32px] leading-[24px] text-black leading-[24px] ">
          {BreadCrump.map((curr: string, i: number, arr: Array<string>) => (
            <div key={i + curr}>
              {i !== arr.length - 1 && (
                <span className="font-normal">
                  {curr}
                  {i < arr.length - 1 && <span> &gt; &nbsp; </span>}
                </span>
              )}

              {i === arr.length - 1 && (
                <span className="font-bold">{curr}</span>
              )}
            </div>
          ))}
        </span>
      </button>
    </div>
  );
}

export default BreadCrump;
