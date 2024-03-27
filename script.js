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

  // Update time block colors
  function updateTimeBlockColors() {
    const currentHour = dayjs().hour();

    document.querySelectorAll('.time-block').forEach((block) => {
      let blockHour = parseInt(block.id.split('-')[1], 10);

      let blockHour24 = blockHour < 9 ? blockHour + 12 : blockHour;

      block.classList.remove('past', 'present', 'future');

      // Add updated time class
      if (blockHour24 < currentHour) {
        block.classList.add('past');
      } else if (blockHour24 === currentHour) {
        block.classList.add('present');
      } else {
        block.classList.add('future');
      }
    });
  }
   updateTimeBlockColors();
   setInterval(updateTimeBlockColors, 60000);
});