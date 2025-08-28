import { RiCloseLine } from "react-icons/ri";

export const Confirmation = ({
  Icon,
  title,
  body,
  buttonName,
  trueCallback,
  falseCallback,
  color,
}) => {
  return (
    <div className="animate-slide-top fixed z-50 top-3 flex bg-slate-50 p-3 rounded-lg border shadow-lg ">
      {/* this for repains bug that the color being transparant */}
      <div className={`bg-${color}-500 h-min p-1 rounded-lg mt-1`}>
        <Icon className="text-xl text-slate-50 " />
      </div>
      <div className="mx-3 w-56">
        <p className="font-semibold">{title}</p>
        <p className="text-sm">{body}</p>
        <div className="w-full flex justify-between mt-2">
          <button
            className="transition-all ease-in-out grow my-1 mr-1 bg-slate-300 rounded-md hover:bg-slate-400"
            onClick={falseCallback}
          >
            Cancel
          </button>
          <button
            className={`transition-all ease-in-out grow my-1 ml-1 bg-${color}-500 rounded-md hover:bg-${color}-600 text-slate-50`}
            onClick={trueCallback}
          >
            {buttonName}
          </button>
        </div>
      </div>
      <RiCloseLine
        className="transition-all ease-in-out text-2xl hover:text-slate-500 cursor-pointer"
        onClick={falseCallback}
      />
    </div>
  );
};
