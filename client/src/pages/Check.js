import React from 'react';

const Check = () => {
  return (
    <div className=" font-poppins bg-aliceblue-100 relative h-[1500px] bg-ghostwhite w-full overflow-hidden flex flex-col items-center justify-start py-7 px-0 box-border gap-[34px] min-w-[1030px] text-left text-[48px] text-steelblue font-raleway">
      <div className="border rounded-xl bg-blue-400 p-8 shadow-5 mt-16">
        <h2 className="text-2xl text-white font-bold mb-4">Check Your Email</h2>
        <p className="text-lg text-white">
          Please check your email to continue the profile creation process.
        </p>
      </div>
    </div>
  );
};

export default Check;