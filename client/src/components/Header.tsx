"use client"

import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import {DialogTitle} from "@mui/material";
import {Transition} from "@/components/Transition";
import CloseIcon from '@mui/icons-material/Close';
import {DialogStyled} from "@/components/DialogStyled";
import CreateRoomForm from "@/components/CreateRoomForm";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {RoomType} from "@/api/room";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useRouter} from "next/navigation";

type propsType = {
    onRoomCreated?: (room: RoomType) => void
}
const Header = ({ onRoomCreated }: propsType) => {
    const settings = ['Logout'];
    const router = useRouter()

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElPlus, setAnchorElPlus] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false)

    const handleClickOpenDialog = () => {
        setOpen(true)
        handleClosePlusMenu()
    }

    const handleClickCloseDialog = () => {
        setOpen(false)
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenPlusMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElPlus(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClosePlusMenu = () => {
        setAnchorElPlus(null);
    };

    const handleClickBackArrow = () => {
        router.back()
    }
    return (
        <AppBar position="static">
            <DialogStyled
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickCloseDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ marginRight: 20, p: 3 }} id="customized-dialog-title">
                    Создание комнаты
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClickCloseDialog}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogBody>
                    <CreateRoomForm onRoomCreated={onRoomCreated} />
                </DialogBody>
            </DialogStyled>

            <Container maxWidth="xl">
                <Toolbar disableGutters>

                        {onRoomCreated
                            ? <IconButton onClick={handleOpenPlusMenu} sx={{ p: 0 }}>
                                <AddIcon sx={{ mr: 1, fill: "#FFF" }} />
                            </IconButton>
                            : <ArrowBackIcon onClick={handleClickBackArrow} sx={{fill: "#FFF"}} />}


                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElPlus}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElPlus)}
                        onClose={handleClosePlusMenu}
                    >
                        <MenuItem>
                            <Typography onClick={handleClickOpenDialog} textAlign="center">Создать комнату</Typography>
                        </MenuItem>
                    </Menu>

                    <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;