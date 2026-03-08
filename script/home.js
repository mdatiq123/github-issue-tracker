const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("card-Container").classList.add("hidden")
    } else {
        document.getElementById("card-Container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }
}
let allIssues = [];

const loadData = () => {
    manageSpinner(true)
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    fetch(url)
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;
            displayData(allIssues);
            manageSpinner(false)
        })
}
const displayData = (card) => {

    const cardContainer = document.getElementById("card-Container")
    const issueCounter = document.getElementById("issues-Counter")

    cardContainer.innerHTML = ""

    issueCounter.innerText = card.length
    // {
    // "id": 1,
    // "title": "Fix navigation menu on mobile devices",
    // "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
    // "status": "open",
    // "labels": [
    // "bug",
    // "help wanted"
    // ],
    // "priority": "high",
    // "author": "john_doe",
    // "assignee": "jane_smith",
    // "createdAt": "2024-01-15T10:30:00Z",
    // "updatedAt": "2024-01-15T10:30:00Z"
    // },




    card.forEach(card => {
        const cardDiv = document.createElement("div")
        cardDiv.innerHTML = `<div onclick="loadIssue(${card.id})" class="card border-t-4   rounded-md shadow-md space-y-1 py-3 px-2 h-[256px] ">
                <div class="flex justify-between items-center">
                    <img id="open" class=" open" src="./assets/Open-Status.png" alt="">
                    <img id="close" class=" close" src="./assets/Closed- Status .png" alt="">
                    <button  class="priority  rounded-lg py-1 px-3 font-bold italic border">${card.priority}</button>
                </div>
                <div class="space-x-1">
                    <h2 class="font-semibold text-xl text-neutral">${card.title}</h2>
                    <p class="text-[#64748B] font-normal text-xs">${card.description}</p>
                </div>
                <div class="space-x-1 mb-2">
                   <div class="space-x-1">${createElement(card.labels)}
                </div>
                </div>
                <hr class="text-gray-400">
                <div class="space-x-1">
                    <h4 class="text-[#64748B]">#1by ${card.author}</h4>
                    <p class="text-[#64748B]">${card.createdAt}</p>
                </div>
            </div>
            `
        const open = cardDiv.querySelector(".open")
        const close = cardDiv.querySelector(".close")
        const cardBox = cardDiv.querySelector(".card")

        if (card.status === "open") {
            close.classList.add("hidden")
            cardBox.classList.add("border-t-[#00A96E]")
        } else {
            open.classList.add("hidden")
            cardBox.classList.add("border-t-[#A855F7]")


        }
        const priority = cardDiv.querySelector(".priority")

        if (card.priority === "high") {
            priority.classList.add("bg-red-100", "text-red-500")
        }
        else if (card.priority === "medium") {
            priority.classList.add("bg-yellow-100", "text-yellow-500")
        }
        else if (card.priority === "low") {
            priority.classList.add("bg-green-100", "text-green-500")
        }
        cardContainer.append(cardDiv)
    })
}

const loadIssue = async (id) => {
    manageSpinner(true)
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    // console.log(url);
    const res = await fetch(url)
    const data = await res.json()
    displayIssue(data.data);
    manageSpinner(false)
}
// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// }

// modal Container
const displayIssue = (data) => {

    console.log(data);
    const issueBox = document.getElementById("modalContainer")
    issueBox.innerHTML = `
                 <div class="px-5 py-3 space-y-4">
        <h2 class="text-2xl font-bold">${data.title}</h2>
               <div class="space-x-2"> <div id="statusBtn" class="badge badge-soft outline-none bg-green-500 text-xs px-3 py-2 rounded-xl">${data.status} </div>&bull;<span class="text-[#64748B] text-xs "> Opened by ${data.assignee}</span>&bull;<span class="text-[#64748B] text-xs">${data.createdAt}</span></div>
                <div class="space-x-1">${createElement(data.labels)}
                </div>
                <p class="text-[#64748B] text-xs">${data.description}</p>
                <div class="flex justify-evenly items-center bg-gray-100 px-2 py-2">
                    <div>
                        <h4 class="text-[#64748B] text-xs">Assignee:</h4>
                        <p class="font-semibold text-xs text-neutral">${data.assignee}</p>
                    </div>
                    <div>
                        <h4 class=" text-[#64748B] text-xs">Priority:</h4>
                        <button class="priority badge badge-soft  text-xs px-2 py-2 rounded-xl outline-none">${data.priority}</button>
                    </div>
                </div>
    </div>
    `
    const statusBtn = document.getElementById("statusBtn")

    if (data.status !== "open") {
        statusBtn.classList.remove("bg-green-500")
        statusBtn.classList.add("bg-[#A855F7]")
    }
    const priority = issueBox.querySelector(".priority")

    if (data.priority === "high") {
        priority.classList.add("bg-red-100", "text-red-500", "italic")
    }
    else if (data.priority === "medium") {
        priority.classList.add("bg-yellow-100", "text-yellow-500", "italic")
    }
    else if (data.priority === "low") {
        priority.classList.add("bg-green-100", "text-green-500", "italic")
    }

    document.getElementById("my_modal").showModal()
}


const createElement = (arr) => {
    return arr.map(el => {

        if (el === "bug") {
            return `<span class="badge badge-soft badge-secondary rounded-full"><i class="fa-solid fa-bug"></i>${el}</span>`
        }

        if (el === "help wanted") {
            return `<span class="badge badge-soft badge-warning rounded-full"><i class="fa-regular fa-life-ring"></i>${el}</span>`
        }
        if (el === "enhancement") {
            return `<span class="badge badge-soft badge-success rounded-full"><img src="./assets/Vector (1).png" alt="">${el}</span>`
        }
        if (el === "good first issue") {
            return `<span class="badge badge-soft badge-info rounded-full"><i class="fa-solid fa-crosshairs"></i>${el}</span>`
        }
        if (el === "documentation") {
            return `<span class="badge badge-soft badge-error rounded-full"><i class="fa-regular fa-clipboard"></i>${el}</span>`
        }

        return `<span class="btn italic">${el}</span>`

    }).join("")


}

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");


const toggleButtonStyle = (clickedBtn) => {

    [allBtn, openBtn, closeBtn].forEach(btn => {
        btn.classList.add("btn-outline");
        btn.classList.remove("btn-primary");
    });


    clickedBtn.classList.remove("btn-outline");
    clickedBtn.classList.add("btn-primary");
};


allBtn.addEventListener("click", () => {
    toggleButtonStyle(allBtn);
    displayData(allIssues);
});

openBtn.addEventListener("click", () => {
    toggleButtonStyle(openBtn);
    const filtered = allIssues.filter(issue => issue.status === "open");
    displayData(filtered);
});

closeBtn.addEventListener("click", () => {
    toggleButtonStyle(closeBtn);


    const filtered = allIssues.filter(issue =>
        issue.status === "closed"
    );

    displayData(filtered);
});

loadData()

// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// }

document.getElementById("search-btn").addEventListener("click", () => {
    const input = document.getElementById("search-input");
    const searchText = input.value.trim().toLowerCase();


    manageSpinner(true);

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
        .then(res => res.json())
        .then(data => {
            const allCard = data.data;


            const filterCard = allCard.filter(card => {
                return card.title.toLowerCase().includes(searchText);
            });

            
            displayData(filterCard);
            manageSpinner(false);

            
            [allBtn, openBtn, closeBtn].forEach(btn => {
                btn.classList.add("btn-outline");
                btn.classList.remove("btn-primary");
            });
        })
        
});
