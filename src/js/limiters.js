export async function delay(ms) {
    return new Promise((resolve) => setTimeout(() => {resolve(true)}, ms));
  }

  export let isAnimating = false;

  export function debounceClick(handler, delay = 450) {
    isAnimating = false;
  
    return async function (e) {
      if (isAnimating) return;
  
      isAnimating = true;
      await handler.call(this, e);
  
      setTimeout(() => {
        isAnimating = false;
      }, delay);
    };
  }