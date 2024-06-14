import {checkAuth} from "@/utils/checkAuth";
import {redirect} from 'next/navigation';
import {getAllRoomsFetch} from "@/api/room";
import {HomePage} from "@/components/HomePage"

export default async function Home() {
    const user = await checkAuth();
    if (!user) {
        redirect("/signin");
    }
    const initialRooms = await getAllRoomsFetch();

    return (
        <HomePage user={user} initialRooms={initialRooms}/>
    );
}

