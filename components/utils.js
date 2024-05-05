export function toggleVisibility(element, displayValue) {
  if (!element) return;


  element.addEventListener('transitionend', () => {
    handleTransitionEnd(element, displayValue);
  });

  if (displayValue === "close") {
    closeElement(element);
  } else if (displayValue === "open" || displayValue === "flex" || displayValue === "inline") {
    openElement(element, displayValue);
  } else {
    removeOpenAndCloseClasses(element);
  }
}

export function handleTransitionEnd(element, displayValue) {
  if (displayValue === "close" || displayValue === "none" || displayValue === "hide") {
    hideElement(element);
  } else {
    if (displayValue === "open") {
      element.style.display = 'block';
    } else {
      element.style.display = displayValue;
    }
  }

  element.removeEventListener('transitionend', handleTransitionEnd)
}

export function closeElement(element) {
  element.classList.remove('open');
  element.classList.add('close');
}

export function openElement(element, displayValue) {
  if (displayValue === "open") {
    element.style.display = "block";
  } else {
    element.style.display = displayValue;
  }
  element.offsetWidth; // Trigger reflow
  element.classList.remove('close');
  element.classList.add('open');
}

export function removeOpenAndCloseClasses(element) {
  element.classList.remove('open');
  element.classList.remove('close');
}


export function hideElement(element) {
  element.style.display = "none";
}


export function generateRandomID(length) {
  const regex = /[a-zA-Z]/;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += String.fromCharCode(Math.floor(Math.random() * (122 - 48 + 1)) + 48).replace(/[^a-zA-Z]/, '');
  }

  return result;
}
