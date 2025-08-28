import { BsPlusLg } from "react-icons/bs";
import Task from "./Task";
import { useState, useEffect } from "react";
import { updateData, fetchDataRealtime } from "../Store/Database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";
import { HandleEnterPress } from "../Store/HandleEnterPress";
import CloseButton from "./CloseButton";
import { useSelector } from "react-redux";
import { LimitData } from "../../Configuration";

const ToDoList = () => {
  const [user] = useAuthState(auth);

  const { config } = useSelector((state) => state.database);
  const color = config.color;

  // membuat state tasks
  const [numberTaskClicked, setNumberTaskClicked] = useState(-1);
  const [tasks, setTasks] = useState([]);
  // 0 : {checked: false, task: 'ngoding'}

  useEffect(() => {
    if (user) {
      fetchDataRealtime(`users/${user.uid}/tasks`, (snapshot) => {
        setTasks(Object.values(snapshot));
      });
    }
  }, [user]);

  const [inputValue, setInputValue] = useState("");

  const getInputValue = (event) => {
    setInputValue(event.target.value);
  };

  const addNewTask = () => {
    if (tasks.length < LimitData.todolist.module) {
      // ubah isi tasks di database
      updateData(`users/${user.uid}/tasks`, [
        ...tasks,
        { task: inputValue, checked: false, date: "" },
      ]);
      // kosongkan value state inputValue
      setInputValue("");
    } else {
      alert("Terlalu banyak task!");
    }
  };
  return (
    <div
      className={`z-10 lg:h-5/6 lg:w-4/5 xl:w-3/5 h-full w-full lg:border-2 border-slate-800 lg:rounded-xl lg:bg-${color}-300`}
    >
      <div
        className={`h-full w-full lg:mt-3 lg:ml-3 lg:p-3 lg:border-2 border-slate-800 lg:rounded-xl lg:bg-${color}-400`}
      >
        <div className="h-full w-full lg:rounded-md lg:border-2 border-black py-3 pr-3 pl-6 bg-slate-50 flex flex-col relative">
          <CloseButton className="right-2 absolute" />
          <h1 className="font-bold mt-2 text-4xl">To Do List</h1>
          <div className="grow overflow-y-scroll pr-3 mt-3">
            {tasks.length !== 0 ? (
              tasks.map((_, index) => (
                <Task
                  tasks={tasks}
                  index={index}
                  user={user}
                  key={"task-" + index}
                  setTasks={setTasks}
                  numberTaskClicked={numberTaskClicked}
                  setNumberTaskClicked={setNumberTaskClicked}
                />
              ))
            ) : (
              <div>Tidak ada task</div>
            )}
          </div>
          <div
            className="flex justify-between items-center mt-3 drop-shadow-md lg:drop-shadow-none z-20"
            onClick={() => setNumberTaskClicked(-1)}
          >
            <input
              type="text"
              className="transition ease-out grow h-5/6 border-2 bg-slate-50 border-slate-400 focus:outline-none focus:bg-slate-50 focus:ring-slate-300 focus:ring-2 rounded-lg p-3"
              placeholder="New Task"
              onChange={getInputValue}
              onKeyDown={(event) =>
                HandleEnterPress(event, inputValue, addNewTask)
              }
              value={inputValue}
            />
            <button
              className={`transition ease-out icon bg-${color}-300 border-2 border-${color}-500 hover:bg-${color}-400 hover:border-r-${color}-600 hover:shadow-md focus:bg-${color}-400 focus:shadow-md focus:outline-none focus:border-r-${color}-600`}
              onClick={addNewTask}
            >
              <BsPlusLg />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
