import React from 'react';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {deleteRoomFetch, RoomType} from "@/api/room";
import {HttpException} from "@/api";

type propsType = {
    anchorElDots: HTMLElement | null
    setAnchorElDots: (anchorElDots: HTMLElement | null) => void
    roomId: number
    deleteRoomById: (id: number) => void
}
const RoomToolTip = ({anchorElDots, setAnchorElDots, roomId, deleteRoomById}: propsType) => {
    const handleCloseDotsMenu = () => {
        setAnchorElDots(null)
    }

    const handleDeleteClick = async () => {
        let res: RoomType | HttpException = await deleteRoomFetch(roomId)
        if(!res?.status) {
            deleteRoomById(res?.id)
        }
        handleCloseDotsMenu()
    }
    return (
        <Menu
            sx={{ mt: '45px', ml: '50px' }}
            id="menu-appbar"
            anchorEl={anchorElDots}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElDots)}
            onClose={handleCloseDotsMenu}
        >
            <MenuItem className={"text-red-600 flex justify-between gap-4"}>
                <DeleteOutlineIcon />
                <Typography onClick={handleDeleteClick} textAlign="center">Удалить комнату</Typography>
            </MenuItem>
        </Menu>
    );
};

export default RoomToolTip;