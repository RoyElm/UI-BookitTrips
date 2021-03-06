export class Globals {
    public static vacationUrl: string;
    public static authUrl: string;
    public static socketUrl:string;

    public static url() {
        if (process.env.NODE_ENV === "production") {
            Globals.vacationUrl = "https://bookit-trips.herokuapp.com/api/vacations/";
            Globals.authUrl = "https://bookit-trips.herokuapp.com/api/auth/";
            Globals.socketUrl = "https://bookit-trips.herokuapp.com/";
        } else {
            Globals.vacationUrl = "http://localhost:3001/api/vacations/";
            Globals.authUrl = "http://localhost:3001/api/auth/";
            Globals.socketUrl = "http://localhost:3001/";
        }
    }
}

Globals.url();