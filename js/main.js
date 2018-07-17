const items = document.querySelectorAll(".item")

// random colors for spash + text tiles
function randomColor() {
  let colors = ["#3f51b5", "#22294e", "#328e6d", "#673AB7", "#20123a", "#844bef", "#7430f3", "#484848"];
  let n = Math.floor(Math.random() * colors.length);
  return colors[n];
}

// every slider on page gets initialized with the following function to switch slides
function switchSlide(slider) {
  let imgs = slider.querySelectorAll("img");
  let interval = ((Math.floor(Math.random() * 7) + 3) * 1000);
  console.log(interval);
  let currSlide = 0;

  setInterval(() => {
    imgs[currSlide].classList.remove("active")
    currSlide = (currSlide + 1) % imgs.length;
    imgs[currSlide].classList.add("active");
  }, interval);
}

// looping through all the tiles on a page to do some manipulations
items.forEach((item, i) => {
  const desc = item.querySelector(".description");
  const sliders = item.querySelectorAll('.slider');

  // make description overlay static if it is empty
  if (desc === null) {
    item.classList.add("no-footer");
  } else {
    if (desc.firstChild === null || desc.firstChild.nodeValue < 1) {
      item.classList.add("no-footer");
    }
  }

  // random backgroundColor for plain text tiles
  if (item.classList.contains("splash-text-center")) {
    item.style.backgroundColor = randomColor();
  }

  // initialize sliders on page load
  if (sliders.length > 0) {
    sliders.forEach((slider) => {
      slider.addEventListener('onload', switchSlide(slider));
    })
  }
})
