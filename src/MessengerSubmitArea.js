import React from 'react'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Send'
import { withStyles } from '@material-ui/styles'

const styles = () => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        background: "#fcfcfc"
    },
    input: {
        marginLeft:"0.8em",
        flex: 1,
    },
    iconButton: {
        padding: 10,
        background: "#edf8ff"
    },
    divider: {
        height: 28,
        margin: 4,
    },
})


class MessengerSubmitArea extends React.Component  {
    render() {
        const { classes } = this.props
        return (
            <Paper onSubmit={this.props.submitMessage} width="100%" component="form" className={classes.root}>
                <InputBase
                    onChange={this.props.textHandler}
                    className={classes.input}
                    placeholder="Deine Nachricht"
                    value={this.props.message}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton onClick={this.props.submitMessage} className={classes.iconButton} aria-label="Versenden">
                    <SearchIcon />
                </IconButton>
            </Paper>
        )
    }
}

export default withStyles(styles)(MessengerSubmitArea)