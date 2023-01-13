import mongoose from "mongoose";

export interface IGoal {
  user: mongoose.Schema.Types.ObjectId;
  text: string;
}

const goalSchema = new mongoose.Schema<IGoal>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

// console.log(goalSchema);

export default mongoose.model("Goal", goalSchema);
