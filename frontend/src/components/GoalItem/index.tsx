import { deleteGoal } from "../../features/goals/goalSlice";
import { IGoal } from "../../pages/Dashboard";
import { useDispatch } from "react-redux";

interface IGoalItemProps {
  goal: IGoal;
}

function GoalItem({ goal }: IGoalItemProps) {
  const dispatch = useDispatch<any>();

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
      <button className="close" onClick={() => dispatch(deleteGoal(goal._id))}>
        X
      </button>
    </div>
  );
}

export default GoalItem;
