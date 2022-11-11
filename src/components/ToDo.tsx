import { useRecoilValue } from "recoil";
import { IToDo, toDoState } from "./Atoms";

function ToDo({ text }: IToDo) {
  return (
    <li>
      <span>{text}</span>
      <button>To Do</button>
      <button>Doing</button>
      <button>Done</button>
    </li>
  )
}

export default ToDo;