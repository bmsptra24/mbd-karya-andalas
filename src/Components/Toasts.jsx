import { BsFillCheckCircleFill } from "react-icons/bs";

export const Toasts = ({ category, message }) => {
    return (
      <div className="toasts">
        <div
          className="max-w-xs bg-white border rounded-md shadow-lg"
          role="alert"
        >
          <div className="flex p-4 items-center">
            {category === "success" && (
              <div className="flex-shrink-0 text-xl text-green-400">
                <BsFillCheckCircleFill />
              </div>
            )}
            <div className="ml-3">
              <p className="text-sm text-gray-700">{message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };