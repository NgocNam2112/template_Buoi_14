var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
const wrapList = document.getElementById("wrap_list");

const formContainer = document.getElementById("formContainer");
const API = document.getElementById("API");
const Cors = document.getElementById("Cors");
const Category = document.getElementById("Category");
const HTTPS = document.getElementById("HTTPS");
const img = document.getElementById("img");
const description = document.getElementById("description");
const link = document.getElementById("link");

const commonError = document.getElementById("commonError");

const BASE_URL =
  "https://637e44439c2635df8f9e520d.mockapi.io/api/v1/get-list/entries";

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

const handleUpdateEntry = async (item) => {
  console.log("item", item);
};

const handleDeleteEntry = async (item) => {
  const data = await axios.delete(`${BASE_URL}/${item.id}`);
  if (data.status === 200) {
    fetchListData();
  }
};

const handleCreateNewEntry = async () => {
  const data = axios.post(BASE_URL, {
    API: API.value,
    Description: "send request",
    HTTPS: true,
    Cors: Cors.value,
    Link: "dfd",
    Category: "asdf",
    image: "https://cataas.com/cat?t=sq&time=16692743002638",
    Auth: "",
  });
};

const fetchListData = async () => {
  wrapList.innerHTML = "";
  const { data } = await axios.get(BASE_URL);

  data.forEach((item) => {
    const b = document.createElement("b");
    b.innerHTML = item.Description;

    const h4 = document.createElement("h4");
    h4.appendChild(b);

    const p = document.createElement("p");
    p.innerHTML = item.Category;

    const container = document.createElement("div");
    container.setAttribute("class", "container");

    container.appendChild(h4);
    container.appendChild(p);

    const deleteIcon = document.createElement("img");
    deleteIcon.setAttribute("src", "https://i.stack.imgur.com/k59em.png");
    deleteIcon.setAttribute("alt", "");
    deleteIcon.setAttribute("class", "dots");
    deleteIcon.onclick = () => handleDeleteEntry(item);

    const avatar = document.createElement("img");
    avatar.setAttribute("src", item.image);
    avatar.setAttribute("alt", "");
    avatar.setAttribute("style", "width: 100%;");

    const cardContainer = document.createElement("div");
    cardContainer.setAttribute("class", "card");
    cardContainer.appendChild(avatar);
    cardContainer.appendChild(deleteIcon);
    cardContainer.appendChild(container);
    // cardContainer.onclick = () => handleUpdateEntry(item);

    wrapList.appendChild(cardContainer);
  });
};

const handleValidateForm = () => {
  commonError.style.display = "none";
  if (
    !API.value ||
    !Cors.value ||
    !Category.value ||
    !img.value ||
    !description.value ||
    !link.value
  ) {
    return true;
  }
};

formContainer.addEventListener("submit", (event) => {
  event.preventDefault();
  if (handleValidateForm()) {
    return;
  }
});

fetchListData();