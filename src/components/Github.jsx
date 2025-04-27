import React, {useState} from 'react'

function Github() {
    const [username , setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    
    async function fetchUser () {
        if(!username) 
            return;

        try{
            const res = await fetch(`https://api.github.com/users/${userData.username}`);
            const data = await res.json();
            setUserData (data)
        }
        catch(error){
            console.error('error to fetch user:', error);
        }  
    };
  return (
    <div className=''>
        <input value={username} 
        onChange={(e) => setUsername(e.target.value)}/>
        <button onClick={fetchUser}>Search</button>
        { userData &&(
            <div>
                <img src={userData.profile_url} alt="profile"/>
                <h2>{userData.name}</h2>
                <p>{userData.bio}</p>
                <p>{userData.location}</p>
                <p>{userData.public_repos}</p>
                <p>{userData.followers}</p>
                <p>{userData.following}</p>
            </div>

        )}

    </div>
  )
}

export default Github