import { IUser } from "@/api/types";


interface ProfileInfoProps {
    user:IUser
  }
  
  const ProfileInfo = ({ user }: ProfileInfoProps) => {

    // console.log("The logged")
    return (
      <div className="flex flex-col items-center p-8 bg-white shadow-md rounded-lg">
        <img
          src={user.profilePicture}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-24 h-24 rounded-full mb-4"
        />
        <h1 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h1>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">{user.phoneNumber}</p>
      </div>
    );
  };
  
  export default ProfileInfo;