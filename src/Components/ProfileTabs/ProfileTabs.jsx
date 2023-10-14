import { Completed } from "./Completed/Completed";
import { Modify } from "./Modify/Modify";
import { Nothing } from "./Nothing/Nothing";
import { Schedule } from "./Schedule/Schedule";
import { Scheduled } from "./Scheduled/Scheduled";
import { Requested } from "./Requested/Requested";

export function ProfileTabsComponent({ tab }) {
    switch (tab) {
        case "asignatura":
            return <Modify />;
        case "horarios":
            return <Schedule />;
        case "agendadas":
            return <Scheduled />;
        case "realizadas":
            return <Completed />;
        case "requested":
            return <Requested />;
        default:
            return <Nothing />;
    }
}
