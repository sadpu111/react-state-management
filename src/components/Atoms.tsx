import { type } from "@testing-library/user-event/dist/type";
import { atom, selector } from "recoil";
// atom은 배열을 줄 뿐이고(여기서), selector는 output인 배열을 변형한다(state 자체를 변형하는 것이 아님)

/* type categories = "TO_DO" | "DOING" | "DONE" // IToDo와 categoryState에서 반복되므로 type을 만들어서 적용 */

export enum Categoires { // enumarable. 입력된 값은 순서에 따라 인덱스 넘버로 값이 바뀌어 적용된다. "TO_DO"는 0, 다음으로 1, 2... 그래서 category를 TO_DO로 선택하여 입력하면 category 값에 0이 출력된다
  "TO_DO",
  "DOING",
  "DONE",
  // "TO_DO" = "TO_DO" => 이렇게 입력하면 실제로 값을 "TO_DO"로 변경할 수 있다(0이 아니라)
}

export interface IToDo { // (a) toDoState의 toDos(배열)이 어떤 형태를 갖는지 알려주는 interface를 정의하고
  text: string;
  id: number;
  category: Categoires; // type뿐만 아니라 내용까지 제한할 수 있다
}

export const toDoState = atom<IToDo[]>({ // (b) IToDO를 toDoState에 적용하여 해당 atom을 사용하는 배열의 형태를 typescript에 전달한다
  key: "todo",
  default: [],
});


export const categoryState = atom<Categoires>({
  key: "category",
  default: Categoires.TO_DO, // Categories의 "TO_DO"
})

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => { // 인자를 객체로 받는데, 그 객체에는 get함수가 들어가 있다
    const toDos = get(toDoState) // get함수를 통해 위의 toDoState atom을 받아온다(여러 atom 가져올 수 있음)
    const category = get(categoryState); // 위의 categoryState atom 가져온다
    return toDos.filter(toDo => toDo.category === category) ; // category의 value(ToDoList 컴포넌트에서 select 선택 옵션에 따라 변경)와 toDo.category 일치여부 파악
  },

})
