import VacationModel from "../Components/Models/VacationModel";

// Products State: 
export class VacationsState {
    public vacations: VacationModel[] = [];
    constructor() {
        const vacations: VacationModel[] = JSON.parse(sessionStorage.getItem("vacations"));
        if (vacations && vacations.length) {
            const { userId } = JSON.parse(sessionStorage.getItem("auth")).user;

            //sorting the vacations array from SessionStorage. (Liked vacations will be first by specify userLogged);
            vacations.sort(v => v.followers && v.followers.includes(userId.toString()) ? -1 : 1);
            this.vacations = vacations;
        }
    }
}

// Vacations Action Types: 
export enum VacationsActionType {
    VacationsDownloaded = "VacationsDownloaded",
    VacationAdded = "VacationAdded",
    VacationUpdated = "VacationUpdated",
    VacationDeleted = "VacationDeleted",
    VacationReset = "VacationReset"
}

// Vacation Action: 
export interface VacationsAction {
    type: VacationsActionType;
    payload?: any;
}

// Vacation Action Creators: 
export function vacationDownloadedAction(vacation: VacationModel[]): VacationsAction {
    return { type: VacationsActionType.VacationsDownloaded, payload: vacation };
}

export function vacationAddedAction(addedVacation: VacationModel): VacationsAction {
    return { type: VacationsActionType.VacationAdded, payload: addedVacation };
}

export function vacationDeletedAction(vacationId: number): VacationsAction {
    return { type: VacationsActionType.VacationDeleted, payload: vacationId };
}

export function vacationUpdatedAction(updatedVacation: VacationModel): VacationsAction {
    return { type: VacationsActionType.VacationUpdated, payload: updatedVacation };
}

export function vacationResetAction(): VacationsAction {
    return { type: VacationsActionType.VacationReset };
}

// Vacation Reducer: 
export function vacationReducer(
    currentState: VacationsState = new VacationsState(),
    action: VacationsAction): VacationsState {

    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {
        case VacationsActionType.VacationsDownloaded:
            newState.vacations = action.payload; // payload = all Vacations
            break;

        case VacationsActionType.VacationAdded:
            newState.vacations.push(action.payload); // payload = the added Vacation
            break;

        case VacationsActionType.VacationUpdated:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            newState.vacations[indexToUpdate] = action.payload; // payload = the updated vacation
            break;

        case VacationsActionType.VacationDeleted:
            const indexToDelete = newState.vacations.findIndex(p => p.vacationId === action.payload); // payload = the deleted vacation id
            newState.vacations.splice(indexToDelete, 1);
            break;
        case VacationsActionType.VacationReset:
            newState.vacations = []; // payload = all Vacations
            break;
    }

    sessionStorage.setItem("vacations", JSON.stringify(newState.vacations));

    return newState; // Return the newState.
}
