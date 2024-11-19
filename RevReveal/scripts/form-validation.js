function validatePassword() {
    // Get the form fields
    let valid = document.forms["password-reset-form-js"]["new-confirm-password"].value;
    let validTwo = document.forms["password-reset-form-js"]["new-password"].value;

    // Check if passwords are blank
    if (valid.length === 0 || validTwo.length === 0) {
        alert("Password cannot be blank.");
        return false;
    }

    // Check if the password length is at least 8 characters
    if (valid.length < 8) {
        alert("Password must be at least 8 characters.");
        return false;
    }

    // Check if passwords match
    if (valid !== validTwo) {
        alert("Passwords do not match!");
        return false;
    }

    // If all checks pass
    return true;
}
