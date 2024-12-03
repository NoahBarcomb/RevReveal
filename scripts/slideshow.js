//add event listener and wait for the dom to load otherwise it'll act like the elements to dot exist
window.addEventListener('load', function() {
    var slideIndex = 0;
    showDivs();
  
    function showDivs() {
      var i;
      var x = document.getElementsByClassName("slideshow");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > x.length) {slideIndex = 1}
      x[slideIndex-1].style.display = "block";
      setTimeout(showDivs, 3000); // Change image every 3 seconds
    }
  
    function plusDivs(n) {
      showDivs(slideIndex += n);
    }
  });
  