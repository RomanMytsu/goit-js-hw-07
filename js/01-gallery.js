import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const list = document.querySelector(".gallery");

list.insertAdjacentHTML("beforeend", createMarkup(galleryItems));
list.addEventListener("click", onClick);

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
    
   <a class="gallery__link"${original}">
     <img
       class="gallery__image"
       src="${preview}"
       data-source="${original}"
      alt="${description}"
    />
  </a>
 </li>`
    )
    .join("");
}

function onClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const currentElement = evt.target.dataset.source;

  const instance = basicLightbox.create(`<img src="${currentElement}"/> `, {
    onShow: (instance) => {
      window.addEventListener("keydown", onEscape);
    },
    onClose: (instance) => {
      window.removeEventListener("keydown", onEscape);
    },
  });
  instance.show();

  function onEscape(evt) {
    if (evt.code === "Escape") {
      instance.close();
    }
  }
  document.addEventListener("keydown", onEscape);
}