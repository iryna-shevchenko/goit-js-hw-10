import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as m,i as a}from"./assets/vendor-77e16229.js";const e={daysEl:document.querySelector("[data-days]"),hoursEl:document.querySelector("[data-hours]"),minutesEl:document.querySelector("[data-minutes]"),secondsEl:document.querySelector("[data-seconds]"),startBtn:document.querySelector("[data-start]"),datePicker:document.querySelector("#datetime-picker")};e.startBtn.disabled=!0;let c=null;m(e.datePicker,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){const n=t[0];if(n.getTime()<new Date().getTime()){a.error({position:"topRight",title:"Error!",message:"Please choose a date in the future"}),e.startBtn.disabled=!0;return}a.success({position:"topRight",title:"Success!",message:`It's valide date, click on "Start"`}),c=n,e.startBtn.disabled=!1}});e.startBtn.addEventListener("click",f);function f(){e.startBtn.disabled=!0;const t=setInterval(()=>{const n=h();if(n<=0){clearInterval(t),e.daysEl.textContent="00",e.hoursEl.textContent="00",e.minutesEl.textContent="00",e.secondsEl.textContent="00";return}const o=y(n);return E(o)},1e3)}function h(){const t=Date.now(),n=c.getTime()-t;return n<0?0:n}function y(t){const i=r(Math.floor(t/864e5)),u=r(Math.floor(t%864e5/36e5)),d=r(Math.floor(t%864e5%36e5/6e4)),l=r(Math.floor(t%864e5%36e5%6e4/1e3));return{days:i,hours:u,minutes:d,seconds:l}}function r(t){return String(t).padStart(2,"0")}function E({days:t,hours:n,minutes:o,seconds:s}){e.daysEl.textContent=t,e.hoursEl.textContent=n,e.minutesEl.textContent=o,e.secondsEl.textContent=s}
//# sourceMappingURL=commonHelpers.js.map