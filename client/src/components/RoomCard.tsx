import React, {useState} from 'react';
import {Box} from '@mui/material';
import {RoomType} from "@/api/room";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from "@mui/material/IconButton";
import RoomToolTip from "@/components/RoomToolTip";
import Button from "@mui/material/Button";
import Link from "next/link";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {useRouter} from "next/navigation";

type propsType = {
    deleteRoomById: (id: number) => void
}
const RoomCard = (props: RoomType & propsType) => {
    const router = useRouter()
    const [anchorElDots, setAnchorElDots] = useState<null | HTMLElement>(null);

    const handleOpenDotsMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElDots(event.currentTarget);
    }

    const handleClickJoinRoom = () => {
        if (!props.password) {
            router.push(`/room/${props.id}`)
            return
        }
        let passwordEntered = prompt("введите пароль")

        if (passwordEntered === props.password) {
            router.push(`/room/${props.id}`)
        }


    }

    return (
        <Box className={"shadow-lg p-3 rounded-lg w-fit border-gray-200 border-1 flex flex-col gap-4"}>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                <strong>{props.title}</strong>
                <IconButton onClick={handleOpenDotsMenu}>
                    <MoreVertIcon/>
                </IconButton>
                <RoomToolTip deleteRoomById={props.deleteRoomById} roomId={props.id} anchorElDots={anchorElDots} setAnchorElDots={setAnchorElDots}/>
            </Box>

            <Box>
                <div className={"flex gap-1"}>
                    <PersonOutlineIcon className={"text-gray-600"}/>
                    {/*{props.memberCount}*/}
                </div>
            </Box>

            <Box>
                <Button
                    onClick={handleClickJoinRoom}
                    className={"focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 capitalize"}>
                    Присоедениться
                </Button>
            </Box>
        </Box>
    )
}


export default RoomCard;