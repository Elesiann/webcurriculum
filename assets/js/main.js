/* ============================================= SHOW MENU ============================================= */
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  // Validate that variables exist
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      // Add the show-menu class to the div tag with the nav__menu class
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/* ============================================= REMOVE MENU MOBILE ============================================= */
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // when each nav__link is clicked, remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*======================================== SCROLL SECTIONS ACTIVE LINK ========================================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// ======================================== SCROLL REVEAL ========================================

const srShowScrollTopIcon = ScrollReveal({
  distance: "500px",
  duration: 2000,
  reset: true
});

const srSkillBars = ScrollReveal({
  distance: "500px",
  duration: 1000,
  reset: false
});

srSkillBars.reveal(
  `
  .skills__bar-front-html, 
  .skills__bar-front-css, 
  .skills__bar-front-js, 
  .skills__bar-front-sass, 
  .skills__bar-front-react,
  .skills__bar-front-photoshop,
  .skills__bar-front-illustrator,
  .skills__bar-front-office,
  .skills__bar-front-portuguese,
  .skills__bar-front-english,
  .skills__bar-front-spanish,
  .skills__bar-front-bs,
  .skills__bar-front-sc,
  .skills__bar-front-redux
`,
  {
    origin: "left",
    interval: 200
  }
);

/* ================================================== SHOW SCROLL TOP ================================================== */
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  // When the scroll is higher than 500 height, add the show-scroll class to the function
  if (this.scrollY >= 500) scrollTop.classList.add("show-scroll");
  // Else remove the class
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

/* ================================================== DARK LIGHT THEME ======================================================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bxs-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const profileImage = document.getElementById("profileImage");

const imageUrls = {
  profilePicture: "/assets/img/pp.jpg",
  profileDarkPicture: "/assets/img/pp-dark.jpg"
};

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bxs-sun" : "bxs-moon";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bxs-sun" ? "add" : "remove"](
    iconTheme
  );

  document.body.classList.contains(darkTheme)
    ? (profileImage.src = imageUrls.profileDarkPicture)
    : (profileImage.src = imageUrls.profilePicture);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());

  document.body.classList.contains(darkTheme)
    ? (profileImage.src = imageUrls.profileDarkPicture)
    : (profileImage.src = imageUrls.profilePicture);
});

/* ======================================== REDUCE THE SIZE AND PRINT ON A4 ============================================*/
function scaleCV() {
  document.body.classList.add("scale-cv");
  document.body.classList.remove("dark-theme");
}

/* ======================================== REMOVE THE SIZE WHEN CV IS DOWNLOADED ============================================*/
function removeScale() {
  document.body.classList.remove("scale-cv");
}

/* ================================================== GENERATE PDF ======================================================*/
// pdf area
let areaCv = document.getElementById("area-cv");

let resumeButton = document.getElementById("resume-button");

// Html2pdf options
let opt = {
  margin: 0,
  filename: "CV-Giovani-M-Correa.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 4 },
  jsPDF: { format: "a4", orientation: "portrait" }
};

// Function to call areaCv and Html2Pdf options
function generateResume() {
  html2pdf(areaCv, opt);
}

resumeButton.addEventListener("click", () => {
  // 1. The class .scale-cv is added to the body, where it reduces the size of the elements
  scaleCV();

  // 2. The PDF is generated
  generateResume();

  // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size.
  setTimeout(removeScale, 5000);
});
