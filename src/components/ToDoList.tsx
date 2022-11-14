import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector, toDoState } from "./Atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";


function ToDoList() {
  /* const [toDos, setToDos] = useRecoilState(toDoState); // 아래 두 줄의 코드를 한 줄로 합친 것(value: toDos, modFunc: setToDos). useState와 유사한 구조
  const value = useRecoilValue(toDoState); // (1) atom의 배열을 가져오고
  const modFunc = useSetRecoilState(toDoState); // (2) 그 배열을 수정한다  */
  // const toDos = useRecoilValue(toDoState); //category별로 render하기 위해 삭제
  /* const [toDo, doing, done] = useRecoilValue(toDoSelector); // toDoSelector는 차례대로 category가 "TO_DO", "DOING", "DONE"인 toDo로 이뤄진 배열을 원소로 가진 배열을 return */
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value); // category를 선택한 select의 value로 변경
  };
  return <div>
    <h1>To Dos</h1>
    <hr />
    <CreateToDo />
    <select value={category} onInput={onInput}>
      <option value="TO_DO">To Do</option>
      <option value="DOING">Doing</option>
      <option value="DONE">Done</option>
    </select>
    {/* 위의 const [toDo, doing, done] = useRecoilValue(toDoSelector) 필요
    {category === "TO_DO" && toDo.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
    {category === "DOING" && doing.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
    {category === "DONE" && done.map((toDo) => <ToDo key={toDo.id} {...toDo} />)} */}
    {toDos.map((toDo => <ToDo key={toDo.id} {...toDo} />))}
  </div>
}

// {...toDo} => {text={toDo.text}, category={todo.category}, id={toDo.id}}의 간소화. toDos 배열의 toDo 원소 하나하나가 ToDo 컴포넌트가 필요한 props와 같은 형태이므로 가능. toDos 같은 interface(IToDo)의 배열

export default ToDoList;