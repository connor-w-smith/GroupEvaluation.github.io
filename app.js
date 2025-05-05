/*
    Author: Connor Smith & Damian Owen
    Date: 3/13/2025
    Description: Javascript File for Group Evaluation Website.
*/

// Function to show a specific form and hide others
function showForm(formIdToShow) {
    const allForms = [
        "formLoginWrapper",
        "formAuthWrapper",
        "registerWrapper",
        "evaluationWrapper"
    ];

    allForms.forEach((formId) => {
        const formElement = document.getElementById(formId);
        if (formElement) {
            formElement.style.display = formId === formIdToShow ? "flex" : "none";
        }
    });
}

//Not sure if we still need these
// Event listener for "Don't have an account? Register Here!" button
document.getElementById("registerBtn")?.addEventListener("click", function () {
    showForm("registerWrapper"); // Show the registration form
});

// Event listener for "Already have an account? Login here!" button
document.getElementById("goBackToLogin")?.addEventListener("click", function () {
    showForm("formLoginWrapper"); // Show the login form
});

// Event listener for "Login" button (optional, if you want to handle login logic here)
document.getElementById("loginBtn")?.addEventListener("click", function () {
    // Add your login logic here
    console.log("Login button clicked");
});

// Event listener for "Submit" button in registration form (optional, if you want to handle registration logic here)
document.getElementById("btnSubmit")?.addEventListener("click", function () {
    // Add your registration logic here
    console.log("Registration form submitted");
});

document.querySelector("#loginBtn").addEventListener("click",(e) => {
  //alert("Test");
  const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  let strUsername = document.querySelector("#loginEmail").value
  const strPassword = $('#loginPassword').val()
  strUsername = strUsername.toLowerCase()
  let blnError = false
  let strMessage = ''
  if(!regEmail.test(strUsername)){
      blnError = true
      strMessage += '<p class="mb-0 mt-0">Please input a proper email address</p>'
  }
  //Test the length of the password string
  if(strPassword.length < 1){
      blnError = true
      strMessage += '<p class="mb-0 mt-0">Password Cannot Be Blank</p>'
  }
  //If no errors were encountered, give a sweet alert to show successful login
  if(blnError == false){
      Swal.fire({
          title: "You have logged in. The Success Hippo says hello!",
          html: strMessage,
          imageUrl: 'HippoSuccess.svg', // Replace with the path to your image
          imageWidth: 300, // Adjust the width of the image
          imageHeight: 300, // Adjust the height of the image
          imageAlt: 'Hippo Success', // Optional description for accessibility
      });


      //clear form on successful login
      document.getElementById("frmLogin").reset();
  }

  //Sweet alert for validating email and password
  if(blnError == true){
      blnError = false
      Swal.fire({
          title: "You have encountered the Error Hippo!",
          html: strMessage,
          imageUrl: 'HippoError.svg', // Replace with the path to your image
          imageWidth: 300, // Adjust the width of the image
          imageHeight: 300, // Adjust the height of the image
          imageAlt: 'Hippo Error', // Optional description for accessibility
      });
  }

})

// //Vanilla JS query selector for btnRegister for alerts
document.querySelector("#btnSubmit").addEventListener("click",(e) => {
  //alert("Test");
  const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  let strUsername = document.querySelector("#txtEmail").value
  strUsername = strUsername.toLowerCase()
  const strPswd = $('#txtPswd').val()

  let blnError = false
  let strMessage = ''

  //Test 
  if(!regEmail.test(strUsername)){
      blnError = true
      strMessage += '<p  class="mb-0 mt-0">Please input a proper email address</p>'
  }
  
  //Test the length of the password string
  if(strPswd.length < 1){
      blnError = true
      strMessage += '<p class="mb-0 mt-0">Password Cannot Be Blank</p>'
  }

  //If no errors, take user back to login page
  if(blnError == false){
      // JQuery handler to take user back to login page after registration
      $('#frmRegister').slideUp('slow')
      $('#frmLogin').slideDown('fast') 
          
      //give page enough time to swap (time in milliseconds)
      setTimeout(() => {
          //Alert for successful registration
          Swal.fire({
              title: "You have successfully registered and encounter the Success Hippo! Please log in.",
              html: strMessage,
              imageUrl: 'HippoSuccess.svg', // Replace with the path to your image
              imageWidth: 300, // Adjust the width of the image
              imageHeight: 300, // Adjust the height of the image
              imageAlt: 'Hippo Success', // Optional description for accessibility
          });
      }, 800);

      //clear form upon successful registration
      document.getElementById("selectionForm").reset();
  }
  
  //Alert for missing inputs or incorrect inputs
  if(blnError == true){
      blnError = false
      Swal.fire({
          title: "You have encountered the Error Hippo!",
          html: strMessage,
          imageUrl: 'HippoError.svg', // Replace with the path to your image
          imageWidth: 200, // Adjust the width of the image
          imageHeight: 200, // Adjust the height of the image
          imageAlt: 'Hippo Error', // Optional description for accessibility
      });
  }
})
