import PropTypes from "prop-types";
import React, { useReducer } from "react";


export const Comment = ({ property1, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "hidden",
  });

  return (
    <div
      className={`w-[940px] flex flex-col items-start relative ${state.property1 === "hidden" ? "gap-[14px]" : ""} ${
        state.property1 === "show" ? "overflow-y-scroll" : ""
      } ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      {state.property1 === "hidden" && (
        <div className="flex items-center gap-[36px] pl-[50px] pr-0 py-[20px] relative self-stretch w-full flex-[0_0_auto] bg-[#dbf1ff] rounded-[0px_0px_20px_20px]">
          <div className="relative w-[260px] h-[30px] mt-[-1.00px] [font-family:'Poppins-Light',Helvetica] font-light text-[#017cc5] text-[20px] tracking-[0] leading-[normal]">
            Afficher les commentaires
          </div>
        </div>
      )}

      {state.property1 === "show" && (
        <>
          <div className="flex flex-col items-center gap-[25px] p-[30px] relative self-stretch w-full flex-[0_0_auto] bg-[#e4f5ff]">
            {/* ... (omitted for brevity) */}
            
          </div>

          <div
            className="flex items-center gap-[36px] pl-[50px] pr-0 py-[20px] relative self-stretch w-full flex-[0_0_auto] bg-[#dbf1ff] rounded-[0px_0px_20px_20px]"
            onClick={() => {
              dispatch("click_57");
            }}
          >
            <div className="relative w-fit mt-[-1.00px] [font-family:'Poppins-Light',Helvetica] font-light text-[#017cc5] text-[20px] tracking-[0] leading-[normal]">
              Masquer les commentaires
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "click":
      return { ...state, property1: "show" };
    case "click_57":
      return { ...state, property1: "hidden" };
    default:
      return state;
  }
}

Comment.propTypes = {
  property1: PropTypes.oneOf(["hidden", "show"]),
};
