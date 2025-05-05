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
