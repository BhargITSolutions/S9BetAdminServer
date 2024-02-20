 

if (screen.width > 767) { 
  var device = 'D';
} else {
  var device = 'M';
}
function getValColor(val) {
  if (val == '' || val == null || val == 0) return '#000000';else if (val > 0) return '#007c0e';else return '#ff0000';
}
 
function goBack() {
  window.history.back();
}
function updateTerm() {
  $.ajax({
    url: site_url + 'acceptterms',
    success: function success(output) {
      $('#myModal_popup').modal('hide');
    }
  });
}
function getBets(isVal) {
  $('.betdata.active a').click();
}
function openNav() {
  document.getElementById("lefttSidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("lefttSidenav").style.width = "0";
}
 