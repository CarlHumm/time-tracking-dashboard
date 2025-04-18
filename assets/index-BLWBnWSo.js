(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=r(a);fetch(a.href,s)}})();async function d(e){const t=localStorage.getItem("timedata");if(t)try{return JSON.parse(t)}catch{console.warn("Invalid state attempting to fetch new data!"),localStorage.removeItem("timedata")}try{const r=await fetch(e);if(!r.ok)throw new Error(`Response Status: ${r.status}`);const n=await r.json();return localStorage.setItem("timedata",JSON.stringify(n)),n}catch(r){return console.error("Fetch error:",r.message),null}}function l(){return localStorage.getItem("rangeSelection")||"daily"}function u(e){return e.toLowerCase().replace(/\s+/g,"-")}function f(e){return Object.entries(e).map(([t,{current:r,previous:n}])=>`
      <div class="card__stats ${t===l()?"show animate-in":""}" data-range="${t}">
        <p class="card__stat card__stat--current">${r}hrs</p>
        <p class="card__stat card__stat--previous">${h(t)} - ${n}hrs</p>
      </div>
    `).join("")}function m(e){return`
      <article class="card dashboard__item rounded card--${u(e.title)}">
        <div class="card__background" aria-hidden="true"></div>
        <div class="card__inner rounded cushion-2">
          <div class="card__header">
            <h3 class="card__title">${e.title}</h3>
            <button class="card__menu-button" aria-label="Options">
              <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/>
              </svg>
            </button>
          </div>
          ${f(e.timeframes)}
        </div>
      </article>
    `}function g(e,t=".dashboard__grid"){const r=document.querySelector(t);r.innerHTML=e.map(m).join("")}function h(e){return{daily:"Yesterday",weekly:"Last week",monthly:"Last month"}[e]||""}async function c(e){return new Promise(t=>setTimeout(()=>{t(!0)},e))}let i=!1;function p(e,t=450){return i=!1,async function(r){i||(i=!0,await e.call(this,r),setTimeout(()=>{i=!1},t))}}window.addEventListener("DOMContentLoaded",async()=>{const e=await d("./data.json");e&&(g(e),y())});function y(){const e=document.querySelectorAll(".dashboard__control-button");document.querySelector(`[data-range=${l()}]`).setAttribute("aria-pressed",!0),e.forEach(t=>t.addEventListener("click",p(r=>{const n=r.target.dataset.range,a=document.querySelectorAll(".card__stats");localStorage.setItem("rangeSelection",n),r.target.getAttribute("aria-pressed")!=="true"&&(document.querySelector('[aria-pressed="true"]').setAttribute("aria-pressed",!1),r.target.setAttribute("aria-pressed",!0),a.forEach(async function(s){let o=s.dataset.range===n;_(s,o)}))})))}async function _(e,t){t?(e.classList.add("show"),e.classList.add("animate-in"),e.classList.remove("animate-out"),await c(450)):(e.classList.add("animate-out"),e.classList.remove("animate-in"),await c(450),e.classList.remove("show"))}
