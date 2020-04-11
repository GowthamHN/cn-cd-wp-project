/**
 * @author Amir Sanni <amirsanni@gmail.com>
 * @date 6th January, 2020
 */
import h from './helpers.js';

window.addEventListener('load', ()=>{
    const room = h.getQString(location.href, 'room');
    const username = sessionStorage.getItem('username');

    if(!room){
        document.getElementById('#room-create').attributes.removeNamedItem('hidden');
    }

    else if(!username){
        document.getElementById('login-window').toggleAttribute('hidden');
        document.querySelector('#username-set').attributes.removeNamedItem('hidden');
    }

    else{
        let commElem = document.getElementsByClassName('room-comm');
        document.getElementById('login-window').toggleAttribute('hidden');
        for(let i = 0; i < commElem.length; i++){
            commElem[i].attributes.removeNamedItem('hidden');
        }

        var pc = [];

        let socket = io('/stream');

        var socketId = '';
        var myStream = '';

        socket.on('connect', ()=>{
            //set socketId
            socketId = socket.io.engine.id;


            socket.emit('subscribe', {
                room: room,
                socketId: socketId
            });


            socket.on('new user', (data)=>{
                socket.emit('newUserStart', {to:data.socketId, sender:socketId});
                pc.push(data.socketId);
                init(true, data.socketId);
            });


            socket.on('newUserStart', (data)=>{
                pc.push(data.sender);
                init(false, data.sender);
            });


            socket.on('ice candidates', async (data)=>{
                data.candidate ? await pc[data.sender].addIceCandidate(new RTCIceCandidate(data.candidate)) : '';
            });


            socket.on('sdp', async (data)=>{
                if(data.description.type === 'offer'){
                    data.description ? await pc[data.sender].setRemoteDescription(new RTCSessionDescription(data.description)) : '';

                    h.getUserMedia().then(async (stream)=>{
                        if(!document.getElementById('local').srcObject){
                            document.getElementById('local').srcObject = stream;
                        }

                        //save my stream
                        myStream = stream;
                        stream.getTracks().forEach((track)=>{
                            pc[data.sender].addTrack(track, stream);
                        });

                        let answer = await pc[data.sender].createAnswer();

                        await pc[data.sender].setLocalDescription(answer);

                        socket.emit('sdp', {description:pc[data.sender].localDescription, to:data.sender, sender:socketId});
                    }).catch((e)=>{
                        console.error(e);
                    });
                }

                else if(data.description.type === 'answer'){
                    await pc[data.sender].setRemoteDescription(new RTCSessionDescription(data.description));
                }
            });

            socket.on('base64 file', (data)=>{
              var secret_message = data.fileName.split(".png").pop();
              console.log(secret_message);
              h.addChat(data, 'remote');
            })

            socket.on('chat', (data)=>{
                document.getElementById('typing').innerHTML='';
                h.addChat(data, 'remote');
            })

            socket.on('typingMsg',(username)=>{
                console.log('typing')

                document.getElementById('typing').innerHTML=' is typing';
            })
        });


        function sendImage(message,img){
          var reader = new FileReader();
          reader.onload = function(evt){
            var msg ={};
            msg.room = room,
            msg.message = message;
            msg.username = username;
            msg.file = evt.target.result;
            msg.fileName = img.name + message;
            h.addChat(msg, 'local');
            socket.emit('base64 file', msg);
          };
          reader.readAsDataURL(img);
        }


        function sendMsg(msg){

                let data = {
                    room: room,
                    msg: msg,
                    sender: username
                };

                //emit chat message
                socket.emit('chat', data);


                //add localchat
                h.addChat(data, 'local');

        }

        function typingEvent(username){
            socket.emit('typingMsg',{data:username});
        }

        function init(createOffer, partnerName){
            pc[partnerName] = new RTCPeerConnection(h.getIceServer());

            h.getUserMedia().then((stream)=>{
                //save my stream
                myStream = stream;

                stream.getTracks().forEach((track)=>{
                    pc[partnerName].addTrack(track, stream);//should trigger negotiationneeded event
                });

                document.getElementById('local').srcObject = stream;
            }).catch((e)=>{
                console.error(`stream error: ${e}`);
            });



            //create offer
            if(createOffer){
                pc[partnerName].onnegotiationneeded = async ()=>{
                    let offer = await pc[partnerName].createOffer();

                    await pc[partnerName].setLocalDescription(offer);

                    socket.emit('sdp', {description:pc[partnerName].localDescription, to:partnerName, sender:socketId});
                };
            }



            //send ice candidate to partnerNames
            pc[partnerName].onicecandidate = ({candidate})=>{
                socket.emit('ice candidates', {candidate: candidate, to:partnerName, sender:socketId});
            };



            //add
            pc[partnerName].ontrack = (e)=>{
                let str = e.streams[0];
                if(document.getElementById(`${partnerName}-video`)){
                    document.getElementById(`${partnerName}-video`).srcObject = str;
                }

                else{
                    //video elem
                    let newVid = document.createElement('video');
                    newVid.id = `${partnerName}-video`;
                    newVid.srcObject = str;
                    newVid.autoplay = true;
                    newVid.className = 'remote-video';

                    //create a new div for card
                    let cardDiv = document.createElement('div');
                    cardDiv.className = 'card mb-3';
                    cardDiv.appendChild(newVid);

                    //create a new div for everything
                    let div = document.createElement('div');
                    div.className = 'col-sm-12 col-md-6';
                    div.id = partnerName;
                    div.appendChild(cardDiv);

                    //put div in videos elem
                    document.getElementById('videos').appendChild(div);
                }
            };



            pc[partnerName].onconnectionstatechange = (d)=>{
                switch(pc[partnerName].iceConnectionState){
                    case 'disconnected':
                    case 'failed':
                        h.closeVideo(partnerName);
                        break;

                    case 'closed':
                        h.closeVideo(partnerName);
                        break;
                }
            };



            pc[partnerName].onsignalingstatechange = (d)=>{
                switch(pc[partnerName].signalingState){
                    case 'closed':
                        console.log("Signalling state is 'closed'");
                        h.closeVideo(partnerName);
                        break;
                }
            };
        }

        document.getElementById('encrypt-button').addEventListener('click', ()=>{
          var ele = document.getElementById('encrypt');
          if(ele.checked)
          {
            var message = document.getElementById('image-steganography-text').value;
            var image = document.getElementById('file').files[0];
            if(!message || !image)
              window.alert('fill everything bitch');
            else {
              sendImage(message, image);
            }
          }
          else if(document.getElementById('decrypt').checked)
          {
            var enc_image = document.getElementById('file').files[0];
            if(!image)
              window.alert('upload file bitch');
            else {
              window.alert('everything fine');
            }
          }
        });

        //Check for unparlimentatory words
        document.getElementById('chat-input').addEventListener('keypress', (e)=>{
            typingEvent(username);
            if(e.which === 13 && (e.target.value.trim())){
                e.preventDefault();
                var msg = e.target.value;
                if (msg === 'fuck' || msg === 'Fuck')
                window.alert('Dont send bad words bitch');
                else
                sendMsg(e.target.value);

                setTimeout(()=>{
                    e.target.value = '';
                }, 50);
            }
        });


        document.getElementById('toggle-video').addEventListener('click', (e)=>{
            e.preventDefault();
            myStream.getVideoTracks()[0].enabled = !(myStream.getVideoTracks()[0].enabled);

            //toggle video icon
            e.srcElement.classList.toggle('fa-video');
            e.srcElement.classList.toggle('fa-video-slash');
        });


        document.getElementById('toggle-mute').addEventListener('click', (e)=>{
            e.preventDefault();

            myStream.getAudioTracks()[0].enabled = !(myStream.getAudioTracks()[0].enabled);

            //toggle audio icon
            e.srcElement.classList.toggle('fa-volume-up');
            e.srcElement.classList.toggle('fa-volume-mute');
        });
    }
});
