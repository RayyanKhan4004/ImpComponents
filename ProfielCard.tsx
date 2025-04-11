import React from "react";
interface ProfileCardProps {
  date?: string;
  name?: string;
  description?: string;
  image?: string;
  stars ?: number;
}
function ProfileCard({ date, name, description, image , stars }: ProfileCardProps) {
  return (
    <div className=" backdrop-blur-2xl overflow-hidden h-[343px] w-[536px] flex flex-col justify-center items-center gap-[20px] rounded-[16px] relative ">
      <div className="-skew-y-[20deg] h-[90px] w-[100px] bg-gradient-to-b form-[#33333399] to-[#2D3F5033] rounded-lg p-4 absolute -top-2  left-0 -z-10"></div>
      <span className=" absolute top-4  text-[20px]  left-8">{date}</span>
      <div className="flex pt-[55px]  ">
        <div className="w-full flex justify-center items-center flex-col gap-6">
        <div className="w-full flex justify-center items-center flex-col gap-3">
          <span className="text-[24px]">{name}</span>
          {image ? (
            <img
              src={image}
              alt=""
              className="w-[80px] h-[80px] rounded-full"
            />
          ) : (
            <div className="w-[80px] h-[80px] flex rounded-full bg-gray-300 text-5xl justify-center items-center text-center font-bold">
              <span>{name?.slice(0, 1)}</span>
            </div>
          )}
          <div className="w-[460px] text-[16px]">{description}</div>
        </div>
        <div className="flex justify-between items-center w-full ">
        <div>
            { stars && <div>⭐⭐⭐⭐⭐</div>}
        </div>
        <div className="text-[16px] ">
        Posted on
        </div>
        </div>
        
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
  // <ProfileCard stars={4} date="April 1, 2023" name="Steve Herron" description="I am super visual and having a clear dashboard with all the team metrics visible, helps me see where I stand on my progress. I especially like being"/>
    
