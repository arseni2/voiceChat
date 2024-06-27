import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {getDataFromForm} from "@/utils/getDataFromForm";
import {createRoomFetch, createRoomFetchPayloadType, RoomType} from "@/api/room";
import PasswordField from "@/sharedComponents/PasswordField";

type propsType = {
    onRoomCreated?: (room: RoomType) => void
}
const CreateRoomForm = ({ onRoomCreated }: propsType) => {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const data = getDataFromForm(e.currentTarget)

        const res = await createRoomFetch(data as createRoomFetchPayloadType)
        if (onRoomCreated) {
            onRoomCreated(res)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{p: 1}}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Название"
                name="title"
                autoComplete="email"
                autoFocus
            />

            <PasswordField name={"password"} helperText={"оставьте пустым если хотите сделать комнату публичной"} className={"w-full"} />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{mt: 3, mb: 2}}
            >
                Создать комнату
            </Button>
        </Box>
    );
};

export default CreateRoomForm;