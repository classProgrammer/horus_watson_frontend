import React from 'react'
import Divider from '@material-ui/core/Divider'
import axios from 'axios'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import MessengerToolbar from './MessengerToolbar.js'
import MessageArea from './MessageArea.js'
import MessengerSubmitArea from './MessengerSubmitArea.js'

class Messenger extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            message: "",
            session_id: null
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://3-banken-it-watson-server.azurewebsites.net/watson/session'
        })
            .then((response) => {
                console.log("Ready For Text")
                this.setState({
                    session_id: response.data["session_id"]
                })
            }).catch(exception => {
                var messages = this.state.messages
                
                messages.push({
                    sender: "SYSTEM",
                    message: "Watson Server konnte nicht erreicht werden",
                    timestamp: this.getTimestamp()
                })
                this.setState(messages)
            })
    }

    handleMessage(event) {
        event.preventDefault()
        this.setState({ message: event.target.value })
    }

    getTimestamp() {
        const time = new Date()
        return ("0" + time.getHours()).slice(-2) + ":" +
        ("0" + time.getMinutes()).slice(-2) + ":" +
        ("0" + time.getSeconds()).slice(-2)
    }

    handleSubmit(event) {
        event.preventDefault()
        
        if (this.state.message === "") return

        var messages = this.state.messages
        const message = {
            sender: "YOU",
            message: this.state.message,
            timestamp: this.getTimestamp()
        }
        messages.push(message)
        const data = {
            "sessionId": this.state.session_id,
            "message": this.state.message
        }
        this.setState({
            messages: messages,
            message: ""
        })

        axios({
            method: 'post',
            url: 'https://3-banken-it-watson-server.azurewebsites.net/watson/message/send',
            headers: { 'Content-Type': 'application/json' },
            data: data
        })
            .then((response) => {
                
                console.log("GOT RESPONSE")

                var messages = this.state.messages
                var message = {
                    sender: "BOT",
                    message: "Ich konnte deine Anfrage leider nicht zuordnen. Kannst du das bitte anders formulieren?",
                    timestamp: this.getTimestamp()
                } 

                if (response.data.output.generic[0].text) {
                    message.message = response.data.output.generic[0].text
                }

                messages.push(message)
                this.setState(messages)
            }).catch(exception => {
                var messages = this.state.messages
                
                messages.push({
                    sender: "SYSTEM",
                    message: "Watson Server nicht erreichbar",
                    timestamp: this.getTimestamp()
                })

                this.setState(messages)
            })
    }

    render() {
        return (
            <Grid
                container
                direction="column"
                alignItems="center"
            >
                <Grid item >
                    <Box width={"25em"}>
                        <MessengerToolbar title="3 Banken IT: Watson Bot" />
                        <MessageArea entries={this.state.messages} />
                        <Divider light />
                        <MessengerSubmitArea 
                            message={this.state.message} 
                            textHandler={this.handleMessage.bind(this)} 
                            submitMessage={this.handleSubmit.bind(this)} 
                        />
                    </Box>
                </Grid>
            </Grid>
        )
    }
}

export default Messenger