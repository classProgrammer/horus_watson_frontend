import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const messageCardStyles = makeStyles({
    cardbot: {
        maxWidth: "70%",
        background: "#e0f7a8",
        marginBottom: "0.7em"
    },
    carduser: {
        maxWidth: "70%",
        background: "#c2d7ff",
        marginBottom: "0.7em"
    },
    sender: {
        fontSize: "0.5em",
        marginTop: "-1em",
        marginLeft: "-0.6em"
    },
    message: {
        fontSize: "0.7em",
    },
    timestamp: {
        color: "textSecondary",
        fontSize: "0.5em",
        marginBottom: "-1.8em",
        marginRight: "-0.5em",
    },
})

function MessageCard(props) {
    const classes = messageCardStyles()
    const isBot = props.sender && props.sender === "BOT"
    return (
        <div align={isBot ? "left" : "right"}>
        <Card className={isBot ? classes.cardbot: classes.carduser}>
            <CardContent>
                <Typography align={"left"} className={classes.sender} color="textSecondary" gutterBottom>
                    {props.sender}
                </Typography>
                <Typography align={"center"} className={classes.message} variant="h5" component="h2">
                    {props.message}
                </Typography>

                <Typography align={"right"} className={classes.timestamp} color="textSecondary">
                    {props.timestamp}
                </Typography>
            </CardContent>
        </Card>
        </div>
    )
}

export default MessageCard