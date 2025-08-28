import ReactPlayer from "react-player";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Configuration } from "../../Configuration";
import { useState } from "react";

const Help = () => {
  const navigate = useNavigate();
  const [isWatched, setIsWatched] = useState(false);
  document.querySelector("title").innerHTML = "Help - Meja Belajar Digital";

  return (
    <div className="App pattern-box">
      <AiFillHome
        className="absolute top-10 left-10 text-4xl text-slate-950/30 cursor-pointer hover:text-slate-950/70 transition-all ease-in-out"
        onClick={() => {
          navigate("/home");
        }}
      />
      <div className="w-full h-60 lg:h-full p-5 lg:p-20 flex justify-center items-center">
        <div className="w-full h-full sm:w-9/12">
          <ReactPlayer
            url={Configuration.linkTutorialMBD}
            height={"100%"}
            width={"100%"}
            controls={true}
            playing
            onEnded={() => setIsWatched(true)}
          />
        </div>
      </div>
      {isWatched && (
        <button
          className="text-slate-100 absolute bottom-10 py-3 px-6 bg-gradient-to-l bg-blue-500 rounded-lg border-blue-400 border-4 text-3xl transition-all hover:bg-blue-600 hover:border-blue-400 hover:shadow-lg ease-in-out animate-pulse hover:animate-none"
          onClick={() => {
            navigate("/home");
          }}
        >
          Continue
        </button>
      )}
    </div>
  );
};
export default Help;
