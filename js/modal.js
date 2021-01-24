var modal = document.querySelector('.focus-modal');
var modalButton = document.querySelector('.focus-modal-button');
var modalOverlay = document.querySelector('.focus-modal-overlay');
var cancelButton = document.querySelector('.focus-modal-cancel');

modalButton.addEventListener('click', open);
cancelButton.addEventListener('click', close);

// Get a list of tabbable elements here:
// https://github.com/jkup/focusable

function open() {
  // Show the modal and overlay
  const focusableElements = modal.querySelectorAll(
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed'
  );
  const focusableElementsArray = Array.from(focusableElements);

  const firstItem = focusableElementsArray[0];
  const lastItem = focusableElementsArray[focusableElementsArray.length - 1];

  const activeElement = document.activeElement;
  modal.addEventListener('keydown', trap);

  function trap(event) {
    if (event.keyCode == 27) {
      console.log(event.keyCode);
      event.preventDefault();
      close();
    }

    if (event.keyCode == 9) {
      if (event.shiftKey) {
        if (document.activeElement === firstItem) {
          event.preventDefault();
          lastItem.focus();
        }
      } else {
        if (document.activeElement === lastItem) {
          event.preventDefault();
          firstItem.focus();
        }
      }
    }
  }

  modal.style.display = 'block';
  modalOverlay.style.display = 'block';
}

function close() {
  // Hide the modal and overlay
  modal.style.display = 'none';
  modalOverlay.style.display = 'none';

  modal.removeEventListener('keydown', trap);
}
