import mongoose from "mongoose";

const { model, Schema } = mongoose;

const commentSchema = new Schema({
  user: Schema.Types.ObjectId,
  body: Schema.Types.ObjectId,
  created_at: Date,
  replies: [Schema.Types.ObjectId],
});

const Comment = model("Comment", commentSchema);

export default Comment;
