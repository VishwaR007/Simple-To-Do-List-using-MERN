const newToDoSubmitBtn = document.querySelector(".newToDoSubmitBtn");

newToDoSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const valueOfTitle = document.querySelector(".titleInputClass").value;
  const valueOfContent = document.querySelector(".contentInputClass").value;

  if (valueOfTitle.length > 0 && valueOfContent.length > 0) {
    let obj = {
      valueOfTitle,
      valueOfContent,
    };

    fetch("/toDoListObjects", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((msg) => {
        console.log(msg);
        if (msg.statusFrombackEnd == "OK") {
          window.location.href = "/";
        }
      });
  }
});
