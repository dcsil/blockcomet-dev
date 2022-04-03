import { useState } from 'react';

const useToken = () => {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        return JSON.parse(tokenString)
    };
    const [token, setToken] = useState(getToken());
    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token
    }
}


export default useToken