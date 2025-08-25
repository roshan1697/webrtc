import {WebSocket, WebSocketServer} from "ws";

const wss = new WebSocketServer({port:3001})

let senderWS: null | WebSocket = null
let receiverWS:null | WebSocket = null
wss.on('connection', (ws)=>{
    ws.on('error', console.error)

    ws.on('message', (data)=>{
        const message = JSON.parse(data)
        if(message.type == 'sender'){
            console.log('sender added')
            senderWS = ws
        }
        else if (message.type == 'receiver'){
            console.log('receiver added')
            receiverWS = ws
        }
        else if( message.type == 'createOffer'){
            if(ws != senderWS){
                return
            }

            console.log('sending offer ')
            receiverWS?.send(JSON.stringify({type: 'createOffer', sdp:message.sdp}))

        }else if (message.type == 'createAnswer'){
            if(ws != receiverWS){
                return
            }
            console.log('sending answer')
            senderWS?.send(JSON.stringify({type:'createAnswer', sdp: message.sdp}))
        }else if(message.type == 'iceCandidate'){
            console.log('sending iceCandidate')
            if(ws === senderWS){
                receiverWS?.send(JSON.stringify({
                    type:'iceCandidate',
                    candidate: message.candidate
                }))
            }else if(ws === receiverWS){
                senderWS?.send(JSON.stringify({
                    type:'iceCandidate',
                    candidate: message.candidate
                }))
            }
        }
    })

})