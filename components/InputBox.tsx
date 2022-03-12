import React, { useState } from 'react';
import { useRouter } from 'next/router';

function InputBox() {
    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(true);
    const [loading, setLoading] = useState(false);
    const { push } = useRouter();

    function updateUsername(evt: React.ChangeEvent<HTMLInputElement>) {
        setUsername(evt.target.value);
    }

    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        setLoading(true);
        let req = await fetch(`/api/check-gh-user?username=${username}`);
        let data = await req.json();
        if(!data.valid) {
            setValidUsername(false);
        } else {
            setValidUsername(false);
            push('/stats');
        }
        setLoading(false);
    }

    return (
        <div className="grid place-items-center">
            <form onSubmit={handleSubmit} className="w-2/6 mt-32 bg-white py-5 px-10 rounded-lg">
                <div className="mb-6">
                    <label htmlFor="gh-username" className="block mb-2 text-sm font-medium text-gray-900">Your GitHub Username</label>
                    <input type="text" value={username} onChange={updateUsername} id="gh-username" className={`bg-gray-50 border ${validUsername ? `border-gray-300` : `border-red-600`} text-gray-900 text-sm rounded-lg ${validUsername ? `focus:ring-blue-500` : `focus:border-red-600`} ${validUsername ? `focus:border-blue-500` : `focus:border-red-600`} block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="github_user" required />
                    {validUsername ? <></> : <small className="text-red-600">Please Enter a valid username</small>}
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {
                        loading ? 
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg> : "Submit"
                    }
                </button>
            </form>
        </div>
    )
}

export default InputBox;