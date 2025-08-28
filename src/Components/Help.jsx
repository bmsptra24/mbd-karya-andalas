import ReactPlayer from "react-player";
import CloseButton from "./CloseButton";
import { Configuration } from "../../Configuration";

const Help = () => {
  return (
    <>
      <div className="z-10 lg:h-[80%] lg:w-4/5 xl:w-3/5 h-full w-full lg:border-2 border-slate-800 rounded-none lg:rounded-xl lg:bg-blue-300">
        <div className="w-full h-full lg:mt-3 lg:ml-3 lg:p-3 lg:border-2 border-slate-800 rounded-none lg:rounded-xl lg:bg-blue-400 ">
          <div className="relative h-full flex flex-col justify-between items-center gap-2 pb-2">
            <div className="flex justify-between w-full border-b-2 pb-1 border-slate-600">
              <p className="text-xl font-bold ml-1">Help</p>
              <CloseButton />
            </div>
            <div className="w-full h-full mt-1">
              <ReactPlayer
                url={Configuration.linkTutorialMBD}
                height={"100%"}
                width={"100%"}
                controls={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
