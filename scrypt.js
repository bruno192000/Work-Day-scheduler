function startpage() {
    // we are using const to not re-declared some variables
    // getting the time of the present day
        const actualhour = parseInt(moment().format("kk"))
    // using moment to deploy the time of current day, and format
    const currentDayEl = document.getElementById("currentDay");
     // format of the time ,  day/month/day order/year
    currentDayEl.innerHTML = moment().format("dddd, MMMM Do YYYY");

    // Initialize a new array of note objects if none exists in local storage
    const emptyPlan = [
        {
            "time": 9,
            "note": ""
        },
        {
            "time": 10,
            "note": ""
        },
        {
            "time": 11,
            "note": ""
        },
        {
            "time": 12,
            "note": ""
        },
        {
            "time": 13,
            "note": ""
        },
        {
            "time": 14,
            "note": ""
        },
        {
            "time": 15,
            "note": ""
        },
        {
            "time": 16,
            "note": ""
        },
       
        

        
    ];

    const dayPlan = JSON.parse(localStorage.getItem("plan")) || emptyPlan;
    const timeblockContainer = document.getElementById("timeblock-container");
    timeblockContainer.innerHTML = "";

    // information for time. if time is before 12 then will be "AM", If not "PM"
    for (let i=0; i<dayPlan.length; i++) {
        let hourString;
        const hour = 9 + i;
        if (hour<12) {
            hourString = `${hour} AM`;
        } else if (hour === 12) {
            hourString = `${hour} PM`;
        } else {
            hourString = `${hour - 12} PM`
        }
        const timeBlock = document.createElement("div");
        timeBlock.setAttribute("class", "row input-group time-block");
        timeblockContainer.append(timeBlock);

        const timeContainer = document.createElement("div");
        timeContainer.setAttribute("class", "input-group-prepend");
        timeBlock.append(timeContainer);

         //to deploy the time of the planner 
        const timeSpan = document.createElement("span");
        timeSpan.setAttribute("class", "input-group-text hour");
        timeSpan.innerHTML = hourString;
        timeContainer.append(timeSpan);

        const noteEl = document.createElement("input");
        noteEl.setAttribute("type", "text");

         // Adding clases, adding details about time. If it's in the past, present or future then it will have specifics styles from style.css
        if (hour < actualhour) {
            noteEl.setAttribute("class", "form-control description past");
        } else if (hour === actualhour) {
            noteEl.setAttribute("class", "form-control description present");
        } else {
            noteEl.setAttribute("class", "form-control description future");
        }

        // the text for the plan, schedule. deploy the container
        noteEl.setAttribute("placeholder", dayPlan[i].note);
        timeBlock.append(noteEl);

        // save btn container
        const saveContainer = document.createElement("div");
         // adding class for btn, that way the btn will have the style from css
        saveContainer.setAttribute("class", "input-group-append");
        // appending
        timeBlock.append(saveContainer);



        // save btn constant
        const saveSpan = document.createElement("span");
        // adding class for btn, that way the btn will have the style from css
        saveSpan.setAttribute("class", "saveBtn");
        // appending
        saveContainer.append(saveSpan);



        // icon of the save button
        const saveIcon = document.createElement("i");
        // adding a class for the button. that way style.css will reconigze it and add the specific style
        saveIcon.setAttribute("class", "fas fa-save");
         // adding an event listener, the text content of plan will be save in local storage
        saveIcon.addEventListener("click", () => {
            dayPlan[i].note = noteEl.value;
            localStorage.setItem("plan", JSON.stringify(dayPlan));
        });
        saveSpan.append(saveIcon);
    }
}
// Run the function
startpage();