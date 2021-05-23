

// animate images 
const myListOfAnimatedElements = document.querySelectorAll('.animate-wrapper');

const popInObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    
    let myAnimatedElement = entry.target.querySelector('.animate');

    // element intersecting with viewport
    if (entry.isIntersecting) {

      myAnimatedElement.classList.add('square-animation');
	  return; // if we added the class, exit the function
    }

    // element not intersecting with viewport -> remove the css class
    myAnimatedElement.classList.remove('square-animation');
  });
});

myListOfAnimatedElements.forEach(image => {
  popInObserver.observe(image);
});





// animate text left to right 
const listOfLeftTextElements = document.querySelectorAll('.slide-left-animate');

const slideInLeftObserver = new IntersectionObserver(textLeftEntries => {
  textLeftEntries.forEach(textLeftEntry => {
    
    let myAnimatedLeftTextElement = textLeftEntry.target.querySelector('.slide-left');

    // element intersecting with viewport
    if (textLeftEntry.isIntersecting) {
      myAnimatedLeftTextElement.classList.add('slide-left-animate');
	  return; // if we added the class, exit the function
    }

    // element not intersecting with viewport -> remove the css class
    myAnimatedLeftTextElement.classList.toggle('slide-left-animate');
  });
});

listOfLeftTextElements.forEach(leftText => {
  slideInLeftObserver.observe(leftText);
});




// animate text left to right 
const listOfRightTextElements = document.querySelectorAll('.slide-right-animate');

const slideInRightObserver = new IntersectionObserver(textRightEntries => {
  textRightEntries.forEach(textRightEntry => {
    
    let myAnimatedRightTextElement = textRightEntry.target.querySelector('.slide-right');

    // element intersecting with viewport
    if (textRightEntry.isIntersecting) {

      myAnimatedRightTextElement.classList.add('slide-right-animate');
	  return; // if we added the class, exit the function
    }

    // element not intersecting with viewport -> remove the css class
    myAnimatedRightTextElement.classList.toggle('slide-right-animate');
  });
});

listOfRightTextElements.forEach(rightText => {
  slideInRightObserver.observe(rightText);
});