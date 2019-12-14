import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    card: {
        maxHeight: "3.8em",
        alignContent: "center",
        justifyContent: "center",
        background: "#365a9e"
    },
    title: {
        color: "white",
        align: "center",
        fontSize: "1.3em"
    },
}))

function MessengerToolbar(props) {
    const classes = useStyles()

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography align="center" className={classes.title} color="textPrimary" gutterBottom >
                    {props && props.title ? props.title : "TITLE NOT SPECIFIED"}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MessengerToolbar