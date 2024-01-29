// Main DOM Elements :
const bodyBody = document.querySelector(".bodyBody");
const bodyBodyMainContainer = document.querySelector(".bodyBodyMainContainer");

// New To Do creater :
function createNewToDo(title, content) {
  const toDoMainContainer = document.createElement("div");
  toDoMainContainer.classList.add("toDoMainContainer");
  bodyBodyMainContainer.appendChild(toDoMainContainer);
  const iconSection = document.createElement("div");
  iconSection.classList.add("iconSection");
  toDoMainContainer.appendChild(iconSection);
  const titleSection = document.createElement("div");
  titleSection.classList.add("titleSection");
  toDoMainContainer.appendChild(titleSection);
  const contentSection = document.createElement("div");
  contentSection.classList.add("contentSection");
  toDoMainContainer.appendChild(contentSection);

  //   Icons :
  const deleteIcon = document.createElement("p");
  deleteIcon.classList.add("deleteIcon");
  deleteIcon.innerText = " X ";
  deleteIcon.setAttribute("id", title);
  deleteIcon.addEventListener("click", (e) => {
    deleteFunction(e);
  });
  iconSection.appendChild(deleteIcon);

  //   Title:
  const titleOfToDo = document.createElement("h1");
  titleOfToDo.classList.add("titleOfToDo");
  titleOfToDo.innerText = title;
  titleSection.appendChild(titleOfToDo);

  //   Content :
  const contentOfToDo = document.createElement("p");
  contentOfToDo.classList.add("contentOfToDo");
  contentOfToDo.innerText = content;
  contentSection.appendChild(contentOfToDo);
}
// Fetch all Lists from DB :
function fetchAllTheList() {
  fetch("/allListsRoute")
    .then((res) => res.json())
    .then((msg) => {
      msg.findAllLists.forEach((obj) => {
        createNewToDo(obj.title, obj.content);
      });
    });
}
fetchAllTheList();

// Delete Function :
function deleteFunction(e) {
  let obj = {
    titleToDelete: e.target.id,
  };

  fetch("/deletItem", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((msg) => {
      console.log("Hai");
      console.log("msg.findTitle : ", msg.findTitle);
      if (msg.statusFromBackEnd == "OK") {
        console.log("Inside final round");
        window.location.reload();
      }
    });
}
