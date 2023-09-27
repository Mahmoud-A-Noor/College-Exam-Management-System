

import useUserContent from '../../hooks/useUserContent';

import Sidebar from "./Sidebar";


export default function Dashboard(){
    const { page, setPage, pageContent } = useUserContent();

    return (
        <>
            <Sidebar page={page} setPage={setPage} />
            { pageContent }
        </>
    )
}