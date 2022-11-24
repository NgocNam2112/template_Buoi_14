const BASE_URL = "https://637e44439c2635df8f9e520d.mockapi.io/api/v1";

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

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
    const layout = data
      .map(
        (item) => `<div class="card">
    <img src="https://static.thenounproject.com/png/2854151-200.png" alt="" class="dots">
    <img src="${item.image}" alt="Avatar" style="width:100%" class="avatar">
    <div class="container">
        <h4><b>${item.Description}</b></h4> 
        <p>${item.Category}</p> 
    </div>
</div>`
      )
      .join("");
    document.getElementById("wrap_list").innerHTML = layout;
    console.log(data);
  } catch (error) {
    console.log("error", error);
  }
};

fetchListEntries();
