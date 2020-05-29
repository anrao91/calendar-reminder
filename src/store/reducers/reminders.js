import * as actionTypes from "../actions/actionTypes";
import uniqueId from "uuid/v1";

const initialState = {};

const createReminder = (prevState, action) => {
    const reminder = {
        id: uniqueId(),
        time: action.reminder.time,
        description: action.reminder.description,
        color: action.reminder.color
    };

    return {
        ...prevState,
        [action.reminder.date]: prevState[action.reminder.date]
            ? prevState[action.reminder.date].concat(reminder) //Check if a reminder array is already present for the given date, if yes append the new reminder
            : //otherwise create a new array with current reminder as the array element
              [reminder]
    };
};

const updateReminder = (prevState, action) => {
    const reminders = [];
    [...prevState[action.reminder.date]].forEach(reminder => {
        //For every reminder already present,
        if (action.reminder.id === reminder.id) {
            // if the updated reminder id matched the array element, then
            reminder = {
                id: reminder.id, //retain the id
                time: action.reminder.time, //update the time sent as payload through action
                description: action.reminder.description, //update the description as well
                color: action.reminder.color //also the color
            };
        }
        reminders.push(reminder); // push all the changed / unchanged reminders in the loop to the reminders array
    });

    return {
        ...prevState, // retain other reminders as is.
        [action.reminder.date]: reminders //update the reminders to its date provided by the action
    };
};

const deleteReminder = (prevState, action) => {
    return {
        ...prevState,
        [action.date]: [...prevState[action.date]].filter(reminder => {
            return reminder.id !== action.id;
        })
    };
};

const reducer = (prevState = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_REMINDER:
            return createReminder(prevState, action);
        case actionTypes.UPDATE_REMINDER:
            return updateReminder(prevState, action);
        case actionTypes.DELETE_REMINDER:
            return deleteReminder(prevState, action);
        default:
            return prevState;
    }
};

export default reducer;
