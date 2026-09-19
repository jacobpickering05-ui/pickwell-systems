/* PWS: warm up the Start-page form while the visitor is on other pages,
   so it's already cached and appears instantly when they click Start/Join. */
(function(){
  var FORM="https://api.leadconnectorhq.com/widget/form/AAE5JD9iHZ3OzK1oR7RX";
  var c=navigator.connection||{};
  if(c.saveData||/2g/.test(c.effectiveType||""))return;   // respect slow / data-saver connections
  var done=false;
  function warm(){
    if(done)return; done=true;
    var l=document.createElement("link"); l.rel="prefetch"; l.href="start.html"; document.head.appendChild(l);
    var f=document.createElement("iframe");
    f.src=FORM; f.title=""; f.tabIndex=-1; f.setAttribute("aria-hidden","true");
    f.style.cssText="position:absolute;left:-9999px;top:0;width:600px;height:600px;border:0;opacity:0;pointer-events:none";
    document.body.appendChild(f);
  }
  // warm immediately if they reach for a Start/Join link, otherwise shortly after the page settles
  document.addEventListener("pointerover",function(e){var a=e.target.closest&&e.target.closest('a[href^="start.html"]');if(a)warm();},{passive:true});
  document.addEventListener("touchstart",function(e){var a=e.target.closest&&e.target.closest('a[href^="start.html"]');if(a)warm();},{passive:true});
  function later(){(window.requestIdleCallback||function(fn){setTimeout(fn,1200)})(warm,{timeout:2500});}
  if(document.readyState==="complete")later(); else window.addEventListener("load",later);
})();
