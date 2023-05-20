import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");

let instanceOfModal;

const markupItems = makeMarkupItemsOfGallery(galleryItems);

galleryEl.insertAdjacentHTML("beforeend", markupItems);

galleryEl.addEventListener("click", onItemOfGalleryClick);

function makeMarkupItemsOfGallery(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join("\n");
}

function onItemOfGalleryClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  const SrcFullSizeImage = evt.target.dataset.source;

  instanceOfModal = basicLightbox.create(
    `
    <img src="${SrcFullSizeImage}" width="800" height="600" >
`,
    {
      onShow: () => document.addEventListener("keydown", onEscPress),
      onClose: () => document.removeEventListener("keydown", onEscPress),
    }
  );

  instanceOfModal.show();
}

function onEscPress(evt) {
  if (evt.code === "Escape") {
    instanceOfModal.close();
  }
}
