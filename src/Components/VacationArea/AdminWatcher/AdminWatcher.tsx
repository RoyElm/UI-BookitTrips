import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import { Unsubscribe } from "redux";
import { useHistory } from "react-router-dom";
import { creatingRandomColors } from "../../../Services/GlobalHelpers";
import GlobalPaths from "../../../Services/GlobalPaths.env";

interface adminWatcherModel {
    count: number;
    destination: string;
    backgroundColor: string;
}

function AdminWatcher() {

    const history = useHistory();

    //creating array of objects with Count of likes to each destination
    let follower: adminWatcherModel[] = [];
    store.getState().vacationState.vacations.map(v => v.countFollows ? follower.push({ count: v.countFollows, destination: v.destination, backgroundColor: creatingRandomColors() }) : null);
    const [vacationFollowers, setVacationFollowers] = useState<adminWatcherModel[]>(follower);
    const { auth } = store.getState().authState;

    useEffect(() => {
        //Handling unauthorized behavior of user
        if (!auth.isLoggedIn || !auth.user.isAdmin) {
            return history.push(GlobalPaths.page404);
        };

        //listen to Store state changes to render the new vacations that has been like/unlike.
        const unSubscribe: Unsubscribe = store.subscribe(() => {
            //reCreating array of objects with Count of likes to each destination because of Store change
            const vacationFollowers = [];
            store.getState().vacationState.vacations.map(v => v.countFollows ? vacationFollowers.push({ count: v.countFollows, destination: v.destination, backgroundColor: creatingRandomColors() }) : null);
            setVacationFollowers(vacationFollowers);
        });

        return unSubscribe;
    }, [auth, history])

    return (
        <div className="AdminWatcher">
            <Bar
                data={{
                    labels: vacationFollowers.map(f => f.destination),
                    datasets: [{
                        label: 'Vacations Follows',
                        data: vacationFollowers.map(f => f.count),
                        backgroundColor: vacationFollowers.map(f => f.backgroundColor),
                        borderColor: vacationFollowers.map(f => f.backgroundColor),
                        borderWidth: 1,
                    }
                    ]
                }}
                height={300}
                width={400}
                options={{
                    legend: {
                        fontColor: "white",
                        fontWeight: 18
                    },
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: "white",
                                fontSize: 18,
                                stepSize: 1,
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: "white",
                                fontSize: 15,
                                font: 900
                            }
                        }]
                    }

                }}

            />
        </div>
    );
}

export default AdminWatcher;
