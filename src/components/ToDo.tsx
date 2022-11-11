import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "./Atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: { name },
    } = event;
    setToDos(preToDos => { // setToDos() => 현재 값(preToDos)를 전달인자로 갖는 function 만들 수 있다
      const targetIndex = preToDos.findIndex(toDo => toDo.id === id); // 특정 toDo의 버튼을 클릭하면 onClick이 실행되면서, preToDos의 toDo들 중에서, 해당 toDo의 id와 동일한 id를 가진 toDo의 index 호출
      const preToDo = preToDos[targetIndex];
      const newToDo = { text, id, category: name as any} ; // text, id는 기존과 동일, category는 클릭한 버튼의 name으로 변경
      return [
        ...preToDos.slice(0, targetIndex),
        newToDo,
        ...preToDos.slice(targetIndex + 1)
      ];
    });
  }
  /*  const onClick = (newCategory: IToDo["category"]) => {
     console.log(newCategory); // typescript 팁. IToDo["category"]를 통해 newCategory의 interface 적용
   }; */
  // onClick 함수로 인자를 넘겨야 할 경우 익명 함수(() => onClick("TO_DO"))로 입력. onClick={onClick}으로 입력할 경우 인자를 전달할 수 없다
  return (
    <li>
      <span>{text}</span>
      {category !== "TO_DO" && (<button name="TO_DO" onClick={onClick}>To Do</button>)}
      {category !== "DOING" && (<button name="DOING" onClick={onClick}>Doing</button>)}
      {category !== "DONE" && (<button name="DONE" onClick={onClick}>Done</button>)}
    </li>
  )
}

export default ToDo;