import { useState } from "react";

function Body() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  const fetchUser = async () => {
    if (!username) return;
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } 
    catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">devfinder</h1>

      <div className="flex w-full max-w-md mb-8">
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 p-3 rounded-l-lg bg-slate-800 outline-none"
        />
        <button
          onClick={fetchUser}
          className="bg-blue-500 hover:bg-blue-600 p-3 rounded-lg"
        >
          Search
        </button>
      </div>

      {userData && (
        <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex">
          <div className="flex items-center gap-4">
            <img
              src={userData.avatar_url}
              alt="Avatar"
              className="w-16 h-16 rounded-full"
            />
        
              <h2 className="text-xl font-bold">{userData.name || "No Name"}</h2>
            </div>
              <div>
              <p className="text-sm text-gray-400 flex ml-32">
                Joined {new Date(userData.created_at).toLocaleDateString()}
              </p>
              </div>

          </div>

          <p className="mt-4 text-gray-300 ml-20">
            {userData.bio || "This profile has no bio"}
          </p>

          <div className="bg-slate-950 p-4 ml-20 rounded-lg flex justify-around mt-6">
            <div className="text-center">
              <p className="text-xs text-gray-400">Repos</p>
              <p className="font-bold">{userData.public_repos}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Followers</p>
              <p className="font-bold">{userData.followers}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Following</p>
              <p className="font-bold">{userData.following}</p>
            </div>
          </div>

          <div className="mt-6 ml-20 grid grid-cols-2">
            <p>
              {userData.location || "Not Available"}
            </p>
            <p>
              {userData.blog ? (
                <a
                  href={userData.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  {userData.blog}
                </a>
              ) : (
                "Not Available"
              )}
            </p>
            <p>
              {userData.twitter_username ? (
                <a
                  href={`https://twitter.com/${userData.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  @{userData.twitter_username}
                </a>
              ) : (
                "Not Available"
              )}
            </p>

            <p>
              {userData.twitter_username ? (
                <a
                  href={`https://twitter.com/${userData.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  @{userData.twitter_username}
                </a>
              ) : (
                "Not Available"
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Body;
