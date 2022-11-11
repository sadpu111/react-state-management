import { useRecoilValue } from "recoil";
import { toDoState } from "./Atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";


function ToDoList() {
  /* const [toDos, setToDos] = useRecoilState(toDoState); // 아래 두 줄의 코드를 한 줄로 합친 것(value: toDos, modFunc: setToDos). useState와 유사한 구조
  const value = useRecoilValue(toDoState); // (1) atom의 배열을 가져오고
  const modFunc = useSetRecoilState(toDoState); // (2) 그 배열을 수정한다  */
  const toDos = useRecoilValue(toDoState);
  return <div>
    <h1>To Dos</h1>
    <hr />
    <CreateToDo />
    <ul>
      {toDos.map(toDo => <ToDo key={toDo.id} {...toDo} />)}
    </ul>
  </div>
}

// {...toDo} => {text={toDo.text, category={todo.category}, id={toDo.id}}의 간소화. toDos 배열의 toDo 원소 하나하나가 ToDo 컴포넌트가 필요한 props와 같은 형태이므로 가능. toDosrk 같은 interface(IToDo)의 배열

export default ToDoList;