import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import store from "../../../Redux/Store";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";


function App(): JSX.Element {
    
    //handling connect to Socket.io if user/admin did refresh
    useEffect(() => {
        if (store.getState().authState.auth.isLoggedIn) {
            socketManagerInstance.connect();
        }
    })

    return (
        <BrowserRouter>
            <div className="App">
                <header>
                    <Header />
                </header>
                <main>
                    <Routing />
                </main>
            </div>
        </BrowserRouter >
    );
}

export default App;
