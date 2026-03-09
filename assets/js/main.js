function fitText() {
  const el = document.getElementById("hero-name");

  el.style.fontSize = "10px";

  const textWidth = el.getBoundingClientRect().width;
  const screenWidth = window.innerWidth;

  const newFontSize = (screenWidth / textWidth) * 10 * 0.98;

  el.style.fontSize = newFontSize + "px";
}

window.addEventListener("load", fitText);
window.addEventListener("resize", fitText);
