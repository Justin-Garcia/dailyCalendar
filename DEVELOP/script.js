// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var currentDayEl = document.getElementById('currentDay');
  if (currentDayEl) {
    currentDayEl.textContent = dayjs().format('dddd, MMMM D');
  }

  //load previously saved data entries
  var timeBlocks = document.querySelectorAll('.time-block');
  timeBlocks.forEach(function (block) {
    var savedData = localStorage.getItem(block.id);
    if (savedData !== null) {
      var textarea = block.querySelector('.description');
      textarea.value = savedData;
    }
  });

  //Save button event listener
  var saveButtons = document.querySelectorAll('.saveBtn');
  saveButtons.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      var timeBlock = event.target.closest('.time-block');
      if (!timeBlock) return;
      var textarea = timeBlock.querySelector('.description');
      localStorage.setItem(timeBlock.id, textarea.value);
    });
  });
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});