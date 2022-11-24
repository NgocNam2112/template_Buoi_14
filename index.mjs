const BASE_URL = "https://637e44439c2635df8f9e520d.mockapi.io/api/v1";

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var wrapList = document.getElementById("wrap_list");

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// axios

const fetchListEntries = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/get-list/entries`);
    console.log("data", data);
    //     const layout = data
    //       .map(
    //         (item) => `<div class="card" key=${item.id}>
    //     <img onclick="handleDeleteEntry()" src="https://static.thenounproject.com/png/2854151-200.png" alt="" class="dots">
    //     <img src="${item.image}" alt="Avatar" class="avatar">
    //     <div class="container">
    //         <h4><b>${item.Description}</b></h4>
    //         <p>${item.Category}</p>
    //     </div>
    // </div>`
    //       )
    //       .join("");

    const handleDeleteEntry = async () => {
      console.log("click here");
      // await axios.delete(`${BASE_URL}/get-list/entries`, {
      //   id: "6",
      // });
    };

    data.forEach((item) => {
      const description = document.createElement("b");
      description.innerHTML = item.Description;

      const wrapDescription = document.createElement("h4");
      wrapDescription.appendChild(description);

      const category = document.createElement("p");
      category.innerHTML = item.Category;

      const wrapEntryInfo = document.createElement("div");
      wrapEntryInfo.setAttribute("class", "container");
      wrapEntryInfo.appendChild(wrapDescription);
      wrapEntryInfo.appendChild(category);

      const avatar = document.createElement("img");
      avatar.setAttribute("src", item.image);
      avatar.setAttribute("alt", "");
      avatar.setAttribute("class", "avatar");

      const imageDot = document.createElement("img");
      imageDot.setAttribute(
        "src",
        "https://static.thenounproject.com/png/2854151-200.png"
      );
      imageDot.setAttribute("alt", "");
      imageDot.setAttribute("class", "dots");
      imageDot.onclick = handleDeleteEntry;

      const card = document.createElement("div");
      card.setAttribute("class", "card");
      card.appendChild(imageDot);
      card.appendChild(avatar);
      card.appendChild(wrapEntryInfo);

      wrapList.appendChild(card);
    });
  } catch (error) {
    console.log("error", error);
  }
};

fetchListEntries();
