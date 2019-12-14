import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import MessageCard from './MessageCard.js'

const styles = () => ({
    card: {
        minHeight: "28em",
        maxHeight: "28em",
        height: "100%",
        width: "100%",
        overflow: "auto",
        background: "#fcfcfc"
    },
})

class MessageArea extends React.Component {

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" })
    }

    componentDidMount() {
        this.scrollToBottom()
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    render() {
        const { classes } = this.props

        return (
            <Card className={classes.card}>
                <CardContent>
                    {this.props.entries.map((entry, idx) => {
                        return <MessageCard key={"div_" + idx}
                            message={entry.message}
                            sender={entry.sender}
                            timestamp={entry.timestamp}
                        />
                    })}
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el }}>
                    </div>
                </CardContent>
            </Card>
        )
    }
}

MessageArea.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MessageArea)