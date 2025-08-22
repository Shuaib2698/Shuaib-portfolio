import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? "text-white border-[rgb(var(--primary-color))]"
    : "text-[#ADB7BE] border-slate-600 hover:border-white";
  return (
    <button
  className={`${buttonStyles} rounded-full border-2 px-6 py-3 text-xl cursor-pointer btn-hover-animation`}
  onClick={() => onClick(name)}
>
  {name}
</button>
  );
};

export default ProjectTag;