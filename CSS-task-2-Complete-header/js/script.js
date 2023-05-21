// jQuery code to handle the click event and toggle the dropdown menu
$(document).ready(function() {
    $('#accountDropdownButton').click(function() {
        $('#accountDropdownMenu').toggle();
      });

    $('#currencyDropdownButton').click(function() {
        $('#currencyDropdownMenu').toggle();
      });
    
      $('#languageDropdownButton').click(function() {
        $('#languageDropdownMenu').toggle();
      });

      
  });






// $(document).ready(function() {
//     // Toggle the dropdown menus on click
//     $('.dropdown-toggle').click(function() {
//       var menu = $(this).siblings('.dropdown-menu');
//       $('.dropdown-menu').not(menu).removeClass('show');
//       menu.toggleClass('show');
//     });
  
//     // Hide the dropdown menus when clicking outside
//     $(document).click(function(event) {
//       var target = $(event.target);
//       if (!target.closest('.dropdown').length) {
//         $('.dropdown-menu').removeClass('show');
//       }
//     });
//   });

 