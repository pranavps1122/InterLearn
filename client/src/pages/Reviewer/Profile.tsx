import React from "react";

const Profile = () => {
  return (
    <div className="w-10 h-10 bg-blue-600 rounded-full animate-bounce">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-80 text-center">
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-blue-500">
          <img
            src="https://via.placeholder.com/150"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-xl font-bold mt-4 text-gray-800">Hello, User 👋</h1>

        <p className="text-sm text-gray-500 mt-1">
          Junior MERN Stack Developer
        </p>

        <button className="mt-4 w-full py-2 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white transition">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
