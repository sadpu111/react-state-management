import { useSetRecoilState } from "recoil";
import { Categoires, IToDo, toDoState } from "./Atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: { name },
    } = event;
    setToDos(preToDos => { // setToDos() => 현재 값(preToDos)를 전달인자로 갖는 function 만들 수 있다
      const targetIndex = preToDos.findIndex(toDo => toDo.id === id); // 특정 toDo의 버튼을 클릭하면 onClick이 실행되면서, preToDos의 toDo들 중에서, 해당 toDo의 id와 동일한 id를 가진 toDo의 index 호출
      const preToDo = preToDos[targetIndex];
      const newToDo = { text, id, category: name as any} ; // text, id는 기존과 동일, category는 클릭한 버튼의 name으로 변경. 아래의 return 값으로 새로운 배열을 return하면, category property가 IToDo의 category와 일치하지 않는다는 오류 발생(newToDo에서 category: name은 string). 따라서 뒤에 as any(typescript에 체크하지 않도록) 추가하여 해결
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
  const handleDelete = () => { // 삭제기능 구현
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((oldToDo) => oldToDo.id === id);

      return [...oldToDos.slice(0, targetIndex), ...oldToDos.slice(targetIndex + 1)];
    });
    };
  return (
    <li>
      <span>{text}</span>
      {category !== Categoires.TO_DO && (<button name={Categoires.TO_DO + ""} onClick={onClick}>To Do</button>)}
      {category !== Categoires.DOING && (<button name={Categoires.DOING + ""} onClick={onClick}>Doing</button>)}
      {category !== Categoires.DONE && (<button name={Categoires.DONE + ""} onClick={onClick}>Done</button>)}
      <button onClick={handleDelete}>Delete</button>
    </li>
  )
}

export default ToDo;