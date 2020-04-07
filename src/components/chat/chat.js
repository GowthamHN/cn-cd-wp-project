import React from "react";
import './chat.css'
class chat extends React.Component {

      componentDidMount() {
        var dropZoneId = "drop-zone";
        var buttonId = "clickHere";
        var mouseOverClass = "mouse-over";

        var dropZone = document.getElementById(dropZoneId);
        var ooleft = dropZone.offsetleft;
        var ooright = dropZone.outerWidth + ooleft;
        var ootop = dropZone.offsettop;
        var oobottom = dropZone.outerHeight + ootop;
        var inputFile = dropZone.querySelector("input");
        console.log(inputFile)
        document.getElementById(dropZoneId).addEventListener("dragover", function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('dragover')
            dropZone.classList.add(mouseOverClass);
            var x = e.pageX;
            var y = e.pageY;

            if (!(x < ooleft || x > ooright || y < ootop || y > oobottom)) {
                //inputFile.offset({ top: y - 15, left: x - 100 });
                inputFile.setAttribute('style','{ top: y - 15, left: x - 100 }')
            } else {
                inputFile.setAttribute('style','{ top: -400, left: -400 }')
                //inputFile.offset({ top: -400, left: -400 });
            }

        }, true);

        if (buttonId != "") {
            var clickZone = document.getElementById(buttonId);

            var oleft = clickZone.offsetleft;
            var oright = clickZone.outerWidth + oleft;
            var otop = clickZone.offsettop;
            var obottom = clickZone.outerHeight + otop;

            document.getElementById(buttonId).addEventListener( 'onmousemove',function (e) {
                var x = e.pageX;
                var y = e.pageY;
                if (!(x < oleft || x > oright || y < otop || y > obottom)) {
                    inputFile.offset({ top: y - 15, left: x - 160 });
                } else {
                    inputFile.offset({ top: -400, left: -400 });
                }
            });
        }

        document.getElementById(dropZoneId).addEventListener("drop", function (e) {
            document.getElementById(dropZoneId).classList.remove(mouseOverClass);
        }, true);

        document.getElementById('file').addEventListener("change",(e)=>{
            e.preventDefault();
            var fileName = e.target.value;
        })

    }
    render(){
        return(
            <div class="container-fluid room-comm" hidden>

             <div class="row">
                <video class="local-video" id='local' volume='0' autoplay muted></video>
            </div>

            <div class="row">
                <div class='col-md-3 mt-2 files'>

                    Image Steganography<br/>
                    <input type = "radio" id = "encrypt" name="encrypt-or-decrypt" value ="encrypt" />
                    <label for="encrypt">Encrypt and send</label><br/>
                    <input type = "radio" id = "decrypt" name="encrypt-or-decrypt" value ="decrypt" />
                    <label for="decrypt">Decrypt</label><br />
                    <div>
                      Enter the data to be encrypted
                      <input id = "image-steganography-text" type="text" class="form-control form-rounded" placeholder="Text input" />
                    </div>

                    <div id="drop-zone">
                      Drop files here...
                      <div id="clickHere">
                        <input type="file" name="file" id="file" />
                      </div>
                    </div>
                    <button id = "encrypt-button" type="submit"> submit </button>
                </div>


                <div class="col-md-6 mt-3 mb-3 main">

                  <video class="local-video" id='local' autoplay muted></video>

                  <div class="row" id='videos'></div>
                </div>

                <div class="col-md-3 mb-2 " id='chat-pane'>
                    <div class="row">
                        <div class="col-12 text-center h2 mb-3">CHAT</div>
                        <span class="form-text small align-center " ><p id='typing'></p></span>

                    </div>

                    <div id='chat-messages'></div>

                    <div class='row'>
                    <textarea id='chat-input' class="form-control rounded-5 chat-box border-info" rows='3' placeholder="Type here..."></textarea>
                    </div>

                </div>

            </div>
        </div>
        )
    }
}

export default chat;
