const items = document.querySelectorAll(".item")
const overlay = document.querySelector('.overlay')
const overlayImage = overlay.querySelector('img')
const overlayTitle = overlay.querySelector('.overlay-title')
const overlayPrice = overlay.querySelector('.overlay-price')
const overlayDescription = overlay.querySelector('.overlay-description')
const overlayClose = overlay.querySelector('.close')

overlayClose.addEventListener('click', close);
overlay.addEventListener('click', close);


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
  // console.log(interval);
  let currSlide = 0;

  setInterval(() => {
    imgs[currSlide].classList.remove("active")
    currSlide = (currSlide + 1) % imgs.length;
    imgs[currSlide].classList.add("active");
  }, interval);
}

// overlay
function showDetailsOverlay(e) {
  const src = e.currentTarget.querySelector('img');
  const description = e.currentTarget.querySelector('.description');

  const title = e.currentTarget.querySelector('.title');
  const price = e.currentTarget.querySelector('.price');
  if (src) {
    overlayImage.src = src.src;
    overlayTitle.innerHTML = title.textContent;
    overlayPrice.innerHTML = price.textContent;
    overlayDescription.innerHTML = (
      description == null
    ) ? "no description" : description.textContent
    overlay.classList.add('open');
  }

}

// close overlay
function close() {
  overlay.classList.remove('open')
}

// truncate description from overlays of gallery items
function truncateDescription(item) {
  const desc = item.querySelector(".description");
  var truncated = ""
  const tr = {
    'small': 150,
    'medium': 300,
    'wide': 500
  }
  for (var key in tr) {
    if (item.classList.contains(key)) {
      return desc.innerText.substring(0, tr[key]) + "..."
    }
  }
}

// looping through all the tiles on a page to do some manipulations
items.forEach((item, i) => {
  const desc = item.querySelector(".description");
  const sliders = item.querySelectorAll('.slider');
  item.addEventListener('click', showDetailsOverlay);

  // make description overlay static if it is empty
  if (desc === null) {
    item.classList.add("no-footer");
  } else {
    if (desc.firstChild === null || desc.firstChild.nodeValue < 1) {
      item.classList.add("no-footer");
    }
    desc.innerText = truncateDescription(item);
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
