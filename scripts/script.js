const eventsStore = [
    {
        title: "INFJ Personality Type - Coffee Shop Meet & Greet",
        description: "Being an INFJ",
        date: new Date(2024, 2, 23, 15),
        image:
            "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w ",
        type: "offline",
        attendees: 99,
        category: "Hobbies and Passions",
        distance: 50,
    },
    {
        title:
            "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and CustomerExperience",
        description: "New York AI Users",
        date: new Date(2024, 2, 23, 11, 30),
        image:
            "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
        type: "offline",
        attendees: 43,
        category: "Technology",
        distance: 25,
    },
    {
        title: "Book 40+ Appointments Per Month Using AI and Automation",
        description: "New Jersey Business Network",
        date: new Date(2024, 2, 16, 14),
        image:
            "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online",
        category: "Technology",
        distance: 10,
    },
    {
        title: "Dump writing group weekly meetup",
        description: "Dump writing group",
        date: new Date(2024, 2, 13, 11),
        image:
            "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online",
        attendees: 77,
        category: "Business",
        distance: 100,
    },
    {
        title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
        description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
        date: new Date(2024, 2, 14, 11),
        image:
            "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online",
        attendees: 140,
        category: "Social Activities",
        distance: 75,
    },
    {
        title: "All Nations - Manhattan Missions Church Bible Study",
        description: "Manhattan Bible Study Meetup Group",
        date: new Date(2024, 2, 14, 11),
        image:
            "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "offline",
        category: "Health and Wellbeing",
        distance: 15,
    },
];


// ******************************************************************************************
// ******************************************************************************************
// ******************************************************************************************
// массив всех установленных критериев  фильтров
const filtrCriterions = {
    category: "",
    type: "",
    distance: "",
}


const noResults = document.querySelector(".noResults");
// console.log(noResults);
const eventsFilltered = document.querySelector(".eventsFilltered");
const filterButtons = document.querySelectorAll(".filterButton");
const filterLists = document.querySelectorAll(".filterList");
const dropdown = document.querySelector(".filterDropdown");


// функция закрытия меню
function closeDropdown() {
    const openList = dropdown.querySelector(".filterList.open");

    if (openList) {
        openList.classList.remove("open");

        // Возвращаем открытое меню фильтра в его исходный родительский элемент
        openList._originalFilter.appendChild(openList);
    }

    dropdown.replaceChildren();
}

//Закрытие при щелчке вне меню
document.addEventListener("click", (event) => {
    const clickOnFilterButton = event.target.closest(".filterButton");
    const clickInsideDropdown = dropdown.contains(event.target);

    if (!clickOnFilterButton && !clickInsideDropdown) {
        closeDropdown();
    }
});

// Закрытие при прокрутке страницы
window.addEventListener("scroll", closeDropdown, true);

// закрываем при повторном выборе того же пункта
dropdown.addEventListener("click", (event) => {
    if (event.target.closest(".filterList label")) {
        closeDropdown();
        // setTimeout(closeDropdown, 0);
    }
});

// Меню для выбора фильтров
filterButtons.forEach(button => {
    // следующий HTML-элемент, который находится на том же уровне, сразу после button - подменю
    const list = button.nextElementSibling;
    //сохраняет ссылку на список фильтра внутри самой кнопки
    button._filterList = list;
    //сохраняем ссылку на родительский элемент списка
    list._originalFilter = button.closest(".filter");

    button.addEventListener("click", () => {
        const list = button._filterList;
        const isOpen = list.classList.contains("open");

        // Закрываем предыдущее меню и возвращаем его на место
        filterLists.forEach(item => {
            item.classList.remove("open");

            const originalFilter = item._originalFilter;
            if (originalFilter) {
                originalFilter.appendChild(item);
            }
        });

        dropdown.replaceChildren();

        if (!isOpen) {
            // Запоминаем исходный родитель
            list._originalFilter = button.closest(".filter");
            dropdown.appendChild(list);
            //сохраняем информацию о размере и положении элемента button
            const rect = button.getBoundingClientRect();

            dropdown.appendChild(list);
            list.classList.add("open");

            dropdown.style.left = `${rect.left}px`;
            dropdown.style.top = `${rect.bottom + 8}px`;
        }
    });
});

// Выбор значения
document.querySelectorAll(".filterList input").forEach(input => {
    input.addEventListener("change", () => {

        const filterKey = input.name;//поймали key - для процедуры фильтрации
        const filterValue = input.value;// поймали value - для процедуры фильтрации
        // console.log(input.name + "  " + input.value);

        filtrCriterions[filterKey] = filterValue;
        // console.log(filtrCriterions);
        filterEvents();

        //ищем ближайший элемент с указанным селектором, начиная с самого элемента 
        // и поднимаясь вверх по HTML-структуре
        const list = input.closest(".filterList");
        const filter = list._originalFilter;

        //ищем подходящий элемент внутри указанного элемента, 
        // спускаясь по его потомкам
        const buttonText = filter.querySelector(".filterButtonText");

        // Получаем выбранный текст
        const label = input.closest("label");
        const selectedText = label.textContent.trim();

        // Показываем выбранное значение на кнопке
        if (selectedText !== "All") { buttonText.textContent = selectedText; }
        else { buttonText.textContent = filterKey[0].toUpperCase() + filterKey.slice(1).toLowerCase() }

        // Закрываем список после выбора
        list.classList.remove("open");
        filter.appendChild(list);
        dropdown.replaceChildren();

    });
});
// ******************************************************************************************
// ******************************************************************************************
// ********************************         FILTER ARR          **********************************************************

// функция фильтрации : eventsStore -->  filtredArr
function filterEvents() {
    // console.log("filterEvents");
    // console.log(eventsStore);
    // console.log(filtrCriterions);
    if ((filtrCriterions.category !== "") || (filtrCriterions.type !== "") || (filtrCriterions.distance !== "")) {
        const filtredArr = eventsStore.filter((el) => {
            let flag1 = false; let flag2 = false; let flag3 = false;
            if ((filtrCriterions.category === "") || (el.category === filtrCriterions.category)) { flag1 = true };
            if ((filtrCriterions.type === "") || (el.type === filtrCriterions.type)) { flag2 = true };
            if ((filtrCriterions.distance === "") || (el.distance <= filtrCriterions.distance)) { flag3 = true };

            if (flag1 && flag2 && flag3) { return el; }
        })
        console.log(filtredArr);
        render(filtredArr); // отправляем отфильтрованный массив для прорисовки на экране
    }
    else {
        render(eventsStore); // отправляем нефильтрованный массив для прорисовки на экране
    }
}
filterEvents();



// *****            Рисуем результат на экране

function render(arr) {
    eventsFilltered.replaceChildren();
    // console.log("arr.length = " + arr.length);

    if (arr.length === 0) {

        noResults.hidden = false;
    }
    else {
        noResults.hidden = true;
        for (let el of arr) {
            // console.log(el.image);
            const eventsFillteredGr1 = document.createElement("div");
            eventsFillteredGr1.setAttribute("class", "eventsFillteredGr1");


            const eventsFillteredImg = document.createElement("div");
            eventsFillteredImg.setAttribute("class", "eventsFillteredImg");
            const linkImg = document.createElement("img");
            linkImg.setAttribute("class", "linkImg");
            linkImg.setAttribute("src", el.image);

            const eventsFillteredText = document.createElement("div");
            eventsFillteredText.setAttribute("class", "eventsFillteredText");

            const data = document.createElement("p");
            data.setAttribute("class", "data");
            data.textContent = el.date.toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit"
            });
            const h4 = document.createElement("h4");
            h4.textContent = el.title
            const category = document.createElement("p");
            category.setAttribute("class", "category");
            category.textContent = `${el.category} (${el.distance} km)`;

            const attendees = document.createElement("p");
            attendees.setAttribute("class", "attendees");
            attendees.textContent = (el.attendees || 0) + " attendees";



            eventsFillteredImg.appendChild(linkImg);
            if (el.type === "online") {
                const badgeOnline = document.createElement("img")
                badgeOnline.setAttribute("class", "badgeOnline");
                // badgeOnline.setAttribute("src", "./assets/icon/Online Event.svg");
                eventsFillteredImg.appendChild(badgeOnline);
            }

            // eventsFillteredGr1.appendChild(eventsFillteredImg);

            eventsFillteredText.appendChild(data);
            eventsFillteredText.appendChild(h4);
            eventsFillteredText.appendChild(category);
            eventsFillteredText.appendChild(attendees);
            eventsFillteredGr1.appendChild(eventsFillteredImg);
            eventsFillteredGr1.appendChild(eventsFillteredText);

            eventsFilltered.appendChild(eventsFillteredGr1);

        }
    }

}

// render(eventsStore);