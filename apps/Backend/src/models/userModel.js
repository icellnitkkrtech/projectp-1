import User from "../schema/userSchema.js";
import apiResponse from "../utils/apiResponse.js";

export default class userModel {
    user = User
    async createUser(userData) {

     const existingUser = await this.user.findOne({ email: userData.email });
            if (existingUser) {
                return new apiResponse(400, null, "Email already exists");
            }

        const { email, password, user_role, avatar, superadmin, pcc, admin } = userData;
        try {
            const createdUser = await this.user.create({
                email: email,
                password: password,
                user_role: user_role,
                avatar: avatar,
                superadmin: superadmin,
                pcc: pcc,
                admin: admin
            })
            return new apiResponse(201, createdUser, "User created successfully");
        } catch (error) {
            return new apiResponse(500,null,error.message);
        }
    }
   async deleteUserById(userId){
    try {
        const deletedUser  = await this.user.findByIdAndDelete(userId);
        if (!deletedUser) {
                return apiResponse(404, "User not found");
            }
        return apiResponse(200,null,"User deleted successfully");
    } catch (error) {
        return apiResponse(500,null,error.message);
    }
    
   }
   async addStudentIdToUser(userId,studentId){
    try {
        const updatedUser = await user.findByIdAndUpdate(
                userId,
            { Student: studentId },
            { new: true }
            );
       return new apiResponse(200,updatedUser,"Student ID added to user successfully")
    } catch (error) {
        return new apiResponse(500,null,error.message)
    }
   }
}