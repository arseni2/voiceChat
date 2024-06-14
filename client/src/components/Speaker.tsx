import React from 'react';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

type propsType = {
    isVoice?: boolean
}
const Speaker = (props: propsType) => {
    return (
        <div>
            {!props.isVoice
                ?
                <div className={"flex flex-col gap-1"}>
                    <Avatar sx={{width: 80, height: 80}} alt={"demo"} />
                    <Typography>user anme</Typography>
                </div>
                :
                <div className={"flex flex-col gap-1"}>
                    <Avatar sx={{width: 80, height: 80, border: "3px solid green"}} alt={"demo"}/>
                    <Typography>user anme</Typography>
                </div>
            }
        </div>
    );
};

export default Speaker;