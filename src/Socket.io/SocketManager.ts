import { vacationAddedAction, vacationDeletedAction, vacationUpdatedAction } from '../Redux/VacationsState';
import { io, Socket } from "socket.io-client";
import store from "../Redux/Store";
import { Globals } from '../Services/Globals';

class SocketManager {

    private socket: Socket;
    public connect(): void {

        // Connect to socket.io:
        this.socket = io(Globals.socketUrl);

        // Listen to socket.io events: 
        this.socket.on("msg-from-server-vacation-added", addedVacation => {
            store.dispatch(vacationAddedAction(addedVacation));
        });
        this.socket.on("msg-from-server-vacation-updated", updatedVacation => {
            store.dispatch(vacationUpdatedAction(updatedVacation));
        });
        this.socket.on("msg-from-server-vacation-deleted", vacationId => {
            store.dispatch(vacationDeletedAction(vacationId));
        });

    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}

export default SocketManager;
export const socketManagerInstance = new SocketManager();
