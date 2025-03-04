import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, default: new Date() },
  priority: {
    type: String,
    default: "normal",
    enum: ["high", "medium", "normal", "low"],
  },
  stage: {
    type: String,
    default: "todo",
    enum: ["todo", "in progress", "completed"],
  },
  activites: {
    type: {
      type: String,
      default: "",
      enum: [
        "assigned",
        "started",
        "in progress",
        "bug",
        "completed",
        "commented",
      ],
    },
    activiy: String,
    date: { type: Date, default: new Date() },
    by: { type: Schema.Types.ObjectId, ref: "User" },
  },
  subTasks:[
    {
        title:String,
        date:Date,
        tag:String
    }
  ],
  assets: [String],
  team: [{type: Schema.Types.ObjectId,ref:"User"}],
  isTrashed: {type:Boolean,default:false}
},{timestamps:true});


const Task = mongoose.model("Task",taskSchema);
export default Task;