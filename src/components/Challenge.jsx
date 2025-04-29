import { useEffect, useState } from "react";

function Challenge() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'; 
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  async function fetchUser() {
    if (!username) return;
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  return (
    <div className="text-black  flex flex-col items-center min-h-screen p-4">
      <div className="flex justify-between items-center w-full max-w-2xl mt-5 mb-3">
        <h1 className="text-3xl font-bold devfinder">devfinder</h1>
        <button onClick={toggleTheme} className="text-2xl hover:scale-110 transition-transform">
          {theme === 'dark' ? '🌕' : '🌑'}
        </button>
      </div>

      <div className=" flex w-full max-w-2xl mb-8 ">
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="  search flex-1 p-3 mt-5 rounded-l-lg bg-slate-200 dark:bg-slate-800 outline-none text-black dark:text-white"
        />
        <button
          onClick={fetchUser}
          className="bg-blue-500 hover:bg-blue-800 p-3 mt-5 rounded-r-lg text-white"
        >
          Search
        </button>
      </div>

      {userData && (
        <div className="hello  bg-slate-200 text-stone-500 rounded-xl p-5 w-full max-w-2xl">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src={userData.avatar_url}
                alt="Avatar"
                className="w-16 h-16 rounded-full"
              />
              <h2 className="text-xl font-bold">{userData.name || "No Name"}</h2>
            </div>
            <p className="text-sm text-gray-600">
              Joined {new Date(userData.created_at).toLocaleDateString()}
            </p>
          </div>

          <p className="mt-4 text-gray-500 ml-20">
            {userData.bio || "This profile has no bio"}
          </p>

          <div className=" followers bg-slate-800 ml-20 p-4 rounded-lg flex justify-around mt-6">
            <div className="text-center">
              <p className="text-xs text-gray-300 ">Repos</p>
              <p className="font-bold">{userData.public_repos}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-300 ">Followers</p>
              <p className="font-bold">{userData.followers}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-300 dark:text-gray-400">Following</p>
              <p className="font-bold">{userData.following}</p>
            </div>
          </div>

          <div className="mt-6 ml-20 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p>{userData.location || "Not Available"}</p>
            <p>
              {userData.blog ? (
                <a
                  href={userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400"
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
                  className="text-blue-600 dark:text-blue-400"
                >
                  @{userData.twitter_username}
                </a>
              ) : (
                "Not Available"
              )}
            </p>
            <p>
              {userData.company || "Not Available"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Challenge;
