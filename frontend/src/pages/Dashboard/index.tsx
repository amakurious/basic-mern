import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GoalForm from "../../components/GoalForm";
import GoalItem from "../../components/GoalItem";
import { getGoals } from "../../features/goals/goalSlice";
import Spinner from "../../components/Spinner";
import { reset } from "../../features/auth/authSlice";

export interface IGoal {
  _id: string;
  user: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const { user } = useSelector((state: any) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state: any) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("login");
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>{user && user.name}'s To Do List</h1>
      </section>

      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal: IGoal, index: number) => (
              <GoalItem key={index} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have set no goals</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
