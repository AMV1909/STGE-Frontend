import { Modify } from "./Modify/Modify";
import { Nothing } from "./Nothing/Nothing";
import { Schedule } from "./Schedule/Schedule";
import { EventsList } from "./EventsList/EventsList";

export function ProfileTabsComponent({ tab }) {
    switch (tab) {
        case "asignatura":
            return <Modify />;
        case "horarios":
            return <Schedule />;
        case "agendadas":
            return <EventsList type="Scheduled" />;
        case "realizadas":
            return <EventsList type="Completed" />;
        case "requested":
            return <EventsList type="Requested" />;
        default:
            return <Nothing />;
    }
}
