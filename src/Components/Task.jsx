import { BsTrash } from "react-icons/bs";
import { updateData } from "../Store/Database";
import TextareaAutosize from "react-textarea-autosize";
import { useSelector } from "react-redux";
import { LimitData } from "../../Configuration";
const Task = ({
  tasks,
  index,
  user,
  setTasks,
  numberTaskClicked,
  setNumberTaskClicked,
}) => {
  const { config } = useSelector((state) => state.database);
  const color = config.color;

  const handleCheckboxChange = () => {
    const updatedCheckedValue = !tasks[index].checked;
    updateData(`users/${user.uid}/tasks/${index}/checked`, updatedCheckedValue);
  };

  const handleTaskEdit = (event) => {
    updateData(`users/${user.uid}/tasks/${index}/task`, event.target.value);
  };

  const handleDeleteTask = () => {
    tasks.splice(index, 1);
    updateData(`users/${user.uid}/tasks/`, tasks);
    if (tasks.length === 0) {
      setTasks([]);
    }
  };

  const handleDate = (event) => {
    updateData(`users/${user.uid}/tasks/${index}/date`, event.target.value);
  };
  return (
    tasks.length !== 0 && (
      <>
        {numberTaskClicked !== -1 && (
          <div
            className="bg-transparent absolute inset-0 z-10"
            onClick={() => setNumberTaskClicked(-1)}
          ></div>
        )}
        <div
          className={
            numberTaskClicked === index
              ? `text-lg flex flex-col justify-between items-start border-b-2 px-2 pt-1 pb-1 bg-${color}-100 hover:bg-${color}-100 relative z-20 transition-all ease-in-out`
              : `text-lg flex flex-col justify-center items-center border-b-2 p-2 relative hover:bg-${color}-100 z-20 transition-all ease-in-out`
          }
        >
          <div className="flex w-full justify-between items-center">
            <div className="flex w-full">
              <input
                type="checkbox"
                className="mr-3 cursor-pointer w-4 rounded-full mt-2 lg:mt-0"
                checked={tasks[index].checked}
                onChange={handleCheckboxChange}
              />
              <div
                className={
                  tasks[index].checked ? "selected w-full" : "unselected w-full"
                }
                onClick={() => setNumberTaskClicked(index)}
              >
                {/* <input
                  type="text"
                  value={tasks[index].task}
                  onChange={handleTaskEdit}
                  className="w-full h-auto overflow-hidden bg-transparent focus:outline-none"
                /> */}
                <TextareaAutosize
                  value={tasks[index].task}
                  onChange={handleTaskEdit}
                  spellCheck="false"
                  className="w-full h-auto overflow-hidden bg-transparent focus:outline-none resize-none"
                  maxLength={LimitData.todolist.body}
                />
                {numberTaskClicked !== index && tasks[index].date !== "" && (
                  <div className="flex gap-1 cursor-pointer">
                    <div
                      className={`text-sm bg-${color}-200 px-2 rounded-3xl w-max`}
                    >
                      <p>{tasks[index].date.slice(0, 10)}</p>
                    </div>
                    <div
                      className={`text-sm bg-${color}-200 px-2 rounded-3xl w-max`}
                    >
                      <p>{tasks[index].date.slice(11, 16)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <BsTrash
                onClick={handleDeleteTask}
                className="ml-3 cursor-pointer transition hover:text-red-700"
              />
            </div>
          </div>
          {numberTaskClicked === index && (
            <>
              <input
                type="datetime-local"
                name="date"
                id="date"
                value={tasks[index].date}
                className="text-sm bg-transparent focus:outline-none ml-7 w-36"
                onChange={handleDate}
              />
            </>
          )}
        </div>
      </>
    )
  );
};

export default Task;
