import { ChangeEvent } from "react";

export type FormAction = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export function formReducer<StateType = any>(
  state: StateType,
  action: FormAction
): StateType {
  const { id, type, value } = action.target;
  const checked = "checked" in action.target ? action.target.checked : false;

  switch (type) {
    case "checkbox":
      return { ...state, [id]: checked };
    case "number":
      return { ...state, [id]: +value };
    case "text":
    case "select-one": // select element
      return { ...state, [id]: value };
    default:
      console.log(`type`, type);
      return state;
  }
}
