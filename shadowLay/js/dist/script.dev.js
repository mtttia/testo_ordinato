"use strict";

//hamburger menu
var menuclosed = true;

function toggleMobileMenu() {
  var menu_icon = document.getElementById('mobile-icon');

  if (menuclosed == true) {
    AddClass(menu_icon, 'mobile-menu-opened');
    menuclosed = false;
    ShowOption(true);
  } else {
    RemoveClass(menu_icon, 'mobile-menu-opened');
    menuclosed = true;
    ShowOption(false);
  }
}

function HasClass(el, className) {
  if (el.classList) return el.classList.contains(className);
  return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function AddClass(el, className) {
  if (el.classList) el.classList.add(className);else if (!HasClass(el, className)) el.className += "" + className;
}

function RemoveClass(el, className) {
  if (el.classList) el.classList.remove(className);else if (HasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className = el.className.replace(reg, '');
  }
}