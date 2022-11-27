
import {MessageModel, ChatBoxModel} from './models/chatbox';

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}
const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}
const broadcastMessage = (set, data, status) => {
    for (const element of set) {
        sendData(data, element);
        sendStatus(status, element);
    }
};


const makeName = (name, to) => { return [name, to].sort().join('_'); };

const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box) box = await new ChatBoxModel({ name, users: participants }).save();
    //return box.populate(["users", {path: 'messages', populate: 'sender' }]);
    return box;
};


const chatBoxes = {};
export default {
    onMessage: (ws, wss) => (
        async (byteString) => {
            const { data } = byteString;
            const [task, payload] = JSON.parse(data)
            console.log(`The data is ${data}`);
            switch (task) {
                case 'CHAT': {
                    const { name, to } = payload;
                    if (ws.box !== '' && chatBoxes[ws.box]) chatBoxes[ws.box].delete(ws);
                    const chatBoxName = makeName(name, to);

                    const chatBox = await validateChatBox(chatBoxName, [name, to]);
                    
                    if (!chatBoxes[chatBoxName]) chatBoxes[chatBoxName] = new Set(); // make new record for chatbox
                    chatBoxes[chatBoxName].add(ws);
                    ws.box = chatBoxName;
                    if (chatBox.messages.length !== 0){
                        await chatBox.populate(['messages', {path: 'messages', populate: 'body'}])
                        const messagesInChatBox = chatBox.messages.map(({sender, body}) => ({sender, body}));
                        console.log(messagesInChatBox);
                        broadcastMessage(
                            chatBoxes[ws.box], 
                            ["init", messagesInChatBox], 
                            {type: 'info', msg:'Message loaded.'}
                        );
                    }
                    else {
                        broadcastMessage(
                            chatBoxes[ws.box], 
                            ["init", []], 
                            {type: 'info', msg:'New Chatbox created!'}
                        );
                    }
                    
                    break;
                }
                case 'MESSAGE': {
                    const { name, body } = payload;
                    const newMessage = await new MessageModel({sender: name, body}).save();
                    const chatBox = await ChatBoxModel.findOne({name: ws.box});
                    chatBox.messages.push(newMessage._id);
                    await chatBox.save();
                    
                    broadcastMessage(
                        chatBoxes[ws.box], 
                        ['output', [{sender: name, body}]], 
                        {type: 'message', sender: name, msg:{sender: 'Message sent!', receiver:'Message received.'}}
                    );
                    break;
                }
                /*case 'CLEAR': {
                    ChatBoxModel.deleteMany({});
                    MessageModel.deleteMany({});
                    broadcastMessage(chatBoxes[ws.box], ['cleared'], { type: 'info', msg: 'Message cache cleared.'});
                    break;
                        
                }*/
                default: break;
}})}