import UserModel, {
    IUser,
    IUserDocument,
  } from "../../models/user.model";
  
export const UpdateUserById = async (user_id: string, update: {name: string}) => {

    const userExists = await UserModel.exists({_id: user_id});
    if(!userExists){
      return { error: true, message: "Not Found" };
    }
  
    const user = (await UserModel.findByIdAndUpdate(user_id, update, {
      new: true,
    })
      .select(
        "-password"
      )
      .exec()) as IUserDocument;
  
      return { error: false, data: user, message: "Success" };
  };
  