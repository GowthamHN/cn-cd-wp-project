import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Header from './components/Header/header'
import Login from './components/Login/login'
import Chat from './components/chat/chat.js'
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
    <Header />
    {/* <nav class="navbar fixed-top bg-info rounded-0 d-print-none">
            <div class="text-white">Video Call</div>

            <div class="pull-right room-comm" hidden>
                <button class="btn btn-sm rounded-0 btn-no-effect" id='toggle-video'>
                    <i class="fa fa-video text-white"></i>
                </button>

                <button class="btn btn-sm rounded-0 btn-no-effect" id='toggle-mute'>
                    <i class="fa fa-volume-up text-white"></i>
                </button>

                <button class="btn btn-sm text-white pull-right d-md-none btn-no-effect" id='toggle-chat-pane'>
                    <i class="fa fa-comment"></i> <span class="badge badge-danger very-small font-weight-lighter" id='new-chat-notification' hidden>New</span>
                </button>

                <button class="btn btn-sm rounded-0 btn-no-effect text-white">
                    <a href="/" class="text-white text-decoration-none">Leave Room</a>
                </button>
            </div>
        </nav> */}

        <Login />



        <div class="container-fluid" id='username-set' hidden>
            <div class="row">
                <div class="col-12 h4 mt-5 text-center">Your Name</div>
            </div>
            
            <div class="row mt-2">
                <div class="col-12 text-center">
                    <span class="form-text small text-danger" id='err-msg-username'></span>
                </div>

                <div class="col-12 col-md-4 offset-md-4 mb-3">
                    <label for="username">Your Name</label>
                    <input type="text" id='username' class="form-control rounded-0" placeholder="Your Name"/>
                </div>

                <div class="col-12 col-md-4 offset-md-4 mb-3">
                    <button id='enter-room' class="btn btn-block rounded-0 btn-info">Enter Room</button>
                </div>
            </div>
        </div>


        <Chat />
  
      </div>
  );
}

export default App;
