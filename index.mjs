const BASE_URL = "https://637e44439c2635df8f9e520d.mockapi.io/api/v1";

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var wrapList = document.getElementById("wrap_list");
const formSubmit = document.getElementById("formSubmit");
const submitFormBtn = document.getElementById("submitForm");

const API = document.getElementById("API");
const Cors = document.getElementById("Cors");
const Category = document.getElementById("Category");
const HTTPS = document.getElementById("HTTPS");
const Image = document.getElementById("img");
const Description = document.getElementById("description");
const Link = document.getElementById("link");

let entryItem;

btn.onclick = function () {
  modal.style.display = "block";
  submitFormBtn.value = "Submit";
};

span.onclick = function () {
  modal.style.display = "none";
  entryItem = null;
  resetInputForm();
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    entryItem = null;
    resetInputForm();
  }
};

// axios

const validateForm = () => {
  if (
    !API.value ||
    !Cors.value ||
    !Category.value ||
    !Image.value ||
    !Description.value ||
    !Link.value
  ) {
    return true;
  }
};

const resetInputForm = () => {
  API.value = "";
  Cors.value = "";
  Category.value = "";
  HTTPS.value = "yes";
  Image.value = "";
  Description.value = "";
  Link.value = "";
};

const handleCreateNewEntry = async () => {
  document.getElementById("common__error").style.display = "none";
  if (validateForm()) {
    document.getElementById("common__error").style.display = "block";
    return;
  }
  const formData = {
    API: API.value,
    Description: Description.value,
    image: Image.value,
    Auth: "",
    HTTPS: HTTPS.value === "yes" ? true : false,
    Cors: Cors.value,
    Link: Link.value,
    Category: Category.value,
  };
  const data = await axios.post(`${BASE_URL}/get-list/entries`, {
    ...formData,
  });
  if (data.status === 201) {
    modal.style.display = "none";
    resetInputForm();
    fetchListEntries();
  }
};

const handleUpdateEntry = async () => {
  document.getElementById("common__error").style.display = "none";
  if (validateForm()) {
    document.getElementById("common__error").style.display = "block";
    return;
  }
  const formData = {
    API: API.value,
    Description: Description.value,
    image: Image.value,
    Auth: "",
    HTTPS: HTTPS.value === "yes" ? true : false,
    Cors: Cors.value,
    Link: Link.value,
    Category: Category.value,
  };
  const data = await axios.put(`${BASE_URL}/get-list/entries/${entryItem.id}`, {
    ...formData,
  });
  if (data.status === 200) {
    modal.style.display = "none";
    resetInputForm();
    fetchListEntries();
  }
};

formSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  if (submitFormBtn.value === "Update") {
    handleUpdateEntry();
  } else {
    handleCreateNewEntry();
  }
});

const handleDeleteEntry = async (item) => {
  try {
    const data = await axios.delete(`${BASE_URL}/get-list/entries/${item.id}`);
    if (data.status === 200) {
      fetchListEntries();
    }
  } catch (error) {
    console.log("error", error);
  }
};

const fetchListEntries = async () => {
  wrapList.innerHTML = "";
  try {
    const { data } = await axios.get(`${BASE_URL}/get-list/entries`);

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
      imageDot.onclick = (event) => {
        event.stopPropagation();
        handleDeleteEntry(item);
      };

      const card = document.createElement("div");
      card.setAttribute("class", "card");
      card.appendChild(imageDot);
      card.appendChild(avatar);
      card.appendChild(wrapEntryInfo);

      card.onclick = () => {
        entryItem = {
          ...item,
        };
        modal.style.display = "block";
        API.value = item.API;
        Cors.value = item.Cors;
        Category.value = item.Category;
        HTTPS.value = item.HTTPS ? "yes" : "no";
        Image.value = item.image;
        Description.value = item.Description;
        Link.value = item.Link;
        submitFormBtn.value = "Update";
      };

      wrapList.appendChild(card);
    });
  } catch (error) {
    console.log("error", error);
  }
};

fetchListEntries();
