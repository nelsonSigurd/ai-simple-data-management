function validateInput(input, regex, minLength = null, maxLength = null) {
    const value = input.value.trim();

    // Check min length
    if (minLength && value.length < minLength) {
        input.classList.add("input-error");
        return false;
    }

    // Check max length
    if (maxLength && value.length > maxLength) {
        input.classList.add("input-error");
        return false;
    }

    // Check regex pattern
    if (!regex.test(value)) {
        input.classList.add("input-error");
        return false;
    } else {
        input.classList.remove("input-error");
        return true;
    }
}

function validateForm(prefix) {
    let isValid = true;

    const firstName = document.getElementById(`${prefix}_first_name`);
    const lastName = document.getElementById(`${prefix}_last_name`);
    const dateOfBirth = document.getElementById(`${prefix}_date_of_birth`);
    const submitBtn = document.getElementById(`${prefix}-submit-btn`);

    // Validate First Name (2-50 chars)
    isValid = validateInput(firstName, /^[A-Za-z]+([-'][A-Za-z]+)*$/, 2, 50) && isValid;
    // Validate Last Name (2-50 chars)
    isValid = validateInput(lastName, /^[A-Za-z]+([-'][A-Za-z]+)*$/, 2, 50) && isValid;
    // Validate Date of Birth (Format & Must be in the past)
    isValid = validateInput(dateOfBirth, /^\d{4}-\d{2}-\d{2}$/) 
              && (new Date(dateOfBirth.value) < new Date()) 
              && isValid;

    // Enable or disable submit button
    if (isValid) {
        submitBtn.classList.add("enabled");
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.classList.remove("enabled");
        submitBtn.setAttribute("disabled", "true");
    }
}


// Attach validation listeners dynamically
document.addEventListener("DOMContentLoaded", function () {
  // Forms to validate: create-form and update-form
  ["create", "update"].forEach(prefix => {
      // Check if form exists on the page
      if (document.getElementById(`${prefix}-form`)) {
          // Attach input event listeners to all fields
          ["first_name", "last_name", "date_of_birth"].forEach(field => {
              const input = document.getElementById(`${prefix}_${field}`);
              input.addEventListener("input", () => validateForm(prefix));
          });
      }
  });
});