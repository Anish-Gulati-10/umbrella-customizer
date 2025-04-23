const umbrellaImage = document.querySelector("#umbrellaImage");
const colorDots = document.querySelectorAll(".color-btn");
const section = document.querySelector("section");
const uploadBtn = document.querySelector(".upload-btn");
const uploadInput = document.querySelector("#uploadInput");
const fileStatus = document.querySelector("#fileStatus");
  const fileNameDisplay = document.querySelector("#fileName");
  const spinner = document.querySelector("#uploadSpinner");
const logoOverlay = document.querySelector("#logoOverlay");


colorDots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const color = dot.getAttribute("data-color");
    const bgColor = dot.getAttribute("data-bgcolor");
    document.querySelector(".selected").classList.remove("selected");
    e.target.classList.add("selected");

    umbrellaImage.src = `assets/umbrella/${color}.png`;
    section.style.backgroundColor = bgColor;
    uploadBtn.style.backgroundColor = dot.style.backgroundColor;
    fileStatus.style.backgroundColor = dot.style.backgroundColor;
  });
});


uploadInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file && file.size < 5 * 1024 * 1024) {
    fileStatus.style.display = "flex";
    fileNameDisplay.textContent = file.name;
    spinner.style.display = "inline-block";

    uploadBtn.style.display = "none";

    const reader = new FileReader();
    reader.onload = function (e) {
      logoOverlay.src = e.target.result;
      logoOverlay.style.display = "block";
      spinner.style.display = "none";
    };
    reader.readAsDataURL(file);
  } else {
    alert("File must be under 5MB and a valid image.");
  }
});


document.querySelector("#removeFileBtn").addEventListener("click", () => {
  uploadInput.value = "";
  document.querySelector("#fileStatus").style.display = "none";
  logoOverlay.style.display = "none";
  uploadBtn.style.display = "block";
});