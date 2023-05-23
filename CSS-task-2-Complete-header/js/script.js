$(document).ready(function() {
    // Navbar dropdowns
    $("#menu-drop-one").click(function() {
    $(".nav-right .account .accounts").toggleClass("show");
    });
    $("#menu-drop-two").click(function() {
    $(".nav-right .account .usd").toggleClass("show");
    });
    $("#menu-drop-three").click(function() {
    $(".nav-right .account .en").toggleClass("show");
    });
    
    // Navbar links
    $(".nav-bar .left .links li:not(.page)").click(function() {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    });
    
    // Navbar categories dropdown
    $(".nav-bar .left .categories .cat").click(function() {
    $(".nav-bar .left .categories .cat-dropDown").toggleClass("show");
    });
    
    // Pages dropdown
    $(".nav-bar .links .dropDown").click(function() {
    $(".nav-bar .left .links ul .pages-drop").toggleClass("show");
    });
    
    // Dresses menu
    $(".nav-bar .left .categories .cat-dropDown .dress-drop").click(function() {
    $(".nav-bar .left .categories .cat-dropDown .dressDown").toggleClass("show");
    });
    
    // Mobile dropdown
    $(".nav-bar .mobile-bars").click(function() {
    $(".nav-bar .left .links").toggleClass("show");
    });
    });