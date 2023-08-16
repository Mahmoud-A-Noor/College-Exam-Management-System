import { useContext } from 'react'
import AuthContext from '../../context/AuthContext';

import useUserContent from '../../hooks/useUserContent';

import Sidebar from "./Sidebar";
import useUserData from '../../hooks/useUserData';


export default function Dashboard(){
    const { setPage, pageContent } = useUserContent();
    const { authTokens, setAuthTokens, setUser, logoutUser } = useContext(AuthContext)
    const { userData } = useUserData(authTokens, setAuthTokens, setUser, logoutUser);

    return (
        <>
            <Sidebar setPage={setPage} />
            { pageContent }
        </>
    )
}