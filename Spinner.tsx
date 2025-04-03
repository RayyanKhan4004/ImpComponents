import React from 'react'

function Spinner() {
  return (
    <div className="animate-spin rounded-full relative h-[20px] w-[20px] rounded-[1px]">
      <div className="absolute bg-[#767676] h-[4px] w-[2px] top-[0.5px] right-[50%]  rounded-[1px]"></div>
      <div className="absolute bg-[#767676] h-[4px] w-[2px] top-[3px] right-[75%] rotate-[-45deg]  rounded-[1px] "></div>
      <div className="absolute bg-[#767676] h-[4px] w-[2px]  left-[0.5px] top-[50%] rotate-[90deg] translate-y-[-50%]  rounded-[1px]"></div>
      <div className="absolute bg-[#767676] h-[4px] w-[2px] top-[3px] right-[20%] rotate-[45deg]  rounded-[1px] "></div>

      <div className="absolute bg-[#767676] h-[4px] w-[2px] bottom-[0.5px] right-[50%]  rounded-[1px]"></div>
      <div className="absolute bg-[#767676] h-[4px] w-[2px] bottom-[2px] right-[22%] rotate-[-45deg]  rounded-[1px]"></div>
      <div className="absolute bg-[#767676] h-[4px] w-[2px]  right-[2.5px] top-[50%] rotate-[90deg] translate-y-[-50%]  rounded-[1px]"></div>
      <div className="absolute bg-[#767676] h-[4px] w-[2px] bottom-[3px] right-[75%] rotate-[45deg]  rounded-[1px]"></div>
    </div>
  );
}

export default Spinner
