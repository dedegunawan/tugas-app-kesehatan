//menu_id = *.html

function pushMenu(menu_id) {
  if (is_valid_menu(menu_id)) {
    window.localStorage.setItem(menuStorageName, menu_id);
  }
  else {
    window.localStorage.setItem(menuStorageName, 'not-found');
  }
}

function is_valid_menu(menu_id) {
  var idx = registeredMenu.indexOf(menu_id);
  if (idx < 0) {
    return false;
  }
  else {
    return true;
  }
}

function getMenu() {
  var menu_id = window.localStorage.getItem(menuStorageName);
  //console.log("Get Menu : ", !menu_id || (!is_valid_menu(menu_id) && menu_id != 'not-found'));
  if (!menu_id || (!is_valid_menu(menu_id) && menu_id != 'not-found')) {
    return 'home';
  }
  else {
    return menu_id;
  }
}
function successCallback(response) {
  alert("Sukses");
}
function errorCallback(response) {
  alert("Error");
}
function loadMenu() {
  //load Loading
  $('.page-loader-wrapper').fadeIn();
  var menu_id = getMenu();

  //console.log(menu_id);
  $(".menu-utama").addClass('hidden');
  $("#"+menu_id).removeClass('hidden');
  //console.log($("#"+menu_id));
  setTimeout(function () {
    $('.page-loader-wrapper').fadeOut();
    $(".overlay").fadeOut();
    $("body").removeClass('overlay-open');
  }, 50);
}
function menuNotFound() {
  //load Loading
  $('.page-loader-wrapper').fadeIn();
  var menu_id = getMenu();

  $(".menu-utama").addClass('hidden');
  $("#not-found").removeClass('hidden');
  setTimeout(function () {
    $('.page-loader-wrapper').fadeOut();
    $(".overlay").fadeOut();
    $("body").removeClass('overlay-open');
  }, 50);
}
function loadThenPush(event, menu_id) {
  event.preventDefault();
  //console.log("loadThenPush");
  pushMenu(menu_id);
  loadMenu();
}
function firstLoader() {
  //console.log("first Loader");
  var time=1000;
  navigator.vibrate(time);
  var gm = getMenu();
  if (gm == 'not-found') {
    pushMenu('home');
  }
  loadMenu();
}
$(".menuku").click(function(event) {
  event.preventDefault();
  var menu_id = $(this).attr('href');
  if (menu_id != '#') {
    //console.log("Menu Clicked, ", menu_id);
    loadThenPush(event, menu_id);


  }
});
