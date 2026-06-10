import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

//Next.js, files are reloaded frequently. if it runs for 2 time and tries to create the model with same name then we get the error
//syntax mongoose.model(modelName, schema) then model name here User can be any (not necessaary that it should match you collection name in DB) later it mongoose will automatically converts the model name to users
export default mongoose.models.User || mongoose.model("User", UserSchema);
