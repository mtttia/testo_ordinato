//dark mode
function toggleMode()
{
    $(".lay").toggleClass("lay-dark");
    $(".body").toggleClass("body-dark");
}

function OpenMenu()
{
    $(".horizontal-menu").toggleClass("horizontal-menu-open");
    $(".other-menu").toggleClass("other-menu-open");
}

//hamburger menu
$(".other-menu").click(function(){
    toggleMobileMenu();
})
$(".icon-close").click(function (){
    toggleMobileMenu();
})

let menuclosed = true;
function toggleMobileMenu() {
    let menu_icon = document.getElementById('mobile-icon');

    if (menuclosed == true) {
        
        menuclosed = false;
        Menu_Click(!menuclosed);
        OpenMenu();
    }
    else {
        
        menuclosed = true;
        Menu_Click(!menuclosed);
        OpenMenu();
    }
}
