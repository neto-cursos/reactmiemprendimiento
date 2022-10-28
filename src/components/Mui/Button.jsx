import React from 'react'
import { Button as MuiButton} from "@mui/material";
import { styled } from '@mui/material/styles';

const useStyles = styled(Button)(({theme}) => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))

export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props
    //const classes = useStyles();

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}>
            {text}
        </MuiButton>
    )
}