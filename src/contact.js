// ============================================
// VALIDATION RULES (Pure Functions)
// ============================================

const validateFullName = (name) => {
    const trimmed = name.trim();
    if (!trimmed) {
        return { isValid: false, message: "Full name is required" };
    }
    if (trimmed.length < 2) {
        return {
            isValid: false,
            message: "Name must be at least 2 characters",
        };
    }
    return { isValid: true, message: "" };
};

const validateEmail = (email) => {
    const trimmed = email.trim();
    if (!trimmed) {
        return { isValid: false, message: "Email is required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
        return {
            isValid: false,
            message: "Please enter a valid email (e.g., name@example.com)",
        };
    }

    return { isValid: true, message: "" };
};

const validateSubject = (subject) => {
    const trimmed = subject.trim();
    if (!trimmed) {
        return { isValid: false, message: "Subject is required" };
    }
    if (trimmed.length < 3) {
        return {
            isValid: false,
            message: "Subject must be at least 3 characters",
        };
    }
    return { isValid: true, message: "" };
};

const validateMessage = (message) => {
    const trimmed = message.trim();
    if (!trimmed) {
        return { isValid: false, message: "Message is required" };
    }
    if (trimmed.length < 10) {
        return {
            isValid: false,
            message: "Message must be at least 10 characters",
        };
    }
    return { isValid: true, message: "" };
};

// ============================================
// UI FUNCTIONS (Side Effects)
// ============================================

const showError = (errorElementId, message) => {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }
};

const clearError = (errorElementId) => {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.textContent = "";
        errorElement.style.display = "none";
    }
};

const showSuccessMessage = () => {
    const main = document.querySelector("main");

    // Remove existing success message if any
    const existingSuccess = document.querySelector(
        '[data-testid="test-contact-success"]'
    );
    if (existingSuccess) {
        existingSuccess.remove();
    }

    const successDiv = document.createElement("div");
    successDiv.setAttribute("data-testid", "test-contact-success");
    successDiv.className = "success-message";
    successDiv.textContent =
        "✓ Message sent successfully! We'll get back to you soon.";
    successDiv.setAttribute("role", "status");
    successDiv.setAttribute("aria-live", "polite");

    main.insertBefore(successDiv, main.firstChild);

    // Scroll to success message
    successDiv.scrollIntoView({ behavior: "smooth", block: "center" });
};

const clearForm = () => {
    document.getElementById("fullname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
};

// ============================================
// FIELD VALIDATION ORCHESTRATION
// ============================================

const validateField = (fieldId, validator, errorId) => {
    const field = document.getElementById(fieldId);
    const value = field ? field.value : "";
    const result = validator(value);

    if (result.isValid) {
        clearError(errorId);
        field?.setAttribute("aria-invalid", "false");
    } else {
        showError(errorId, result.message);
        field?.setAttribute("aria-invalid", "true");
    }

    return result.isValid;
};

const validateAllFields = () => {
    const validations = [
        validateField("fullname", validateFullName, "error-name"),
        validateField("email", validateEmail, "error-email"),
        validateField("subject", validateSubject, "error-subject"),
        validateField("message", validateMessage, "error-message"),
    ];

    return validations.every((isValid) => isValid);
};

// ============================================
// EVENT HANDLERS
// ============================================

const handleFieldBlur = (fieldId, validator, errorId) => () => {
    validateField(fieldId, validator, errorId);
};

const handleFieldInput = (errorId) => () => {
    clearError(errorId); // this helps o clear the error message when a user is typing
};

const handleSubmit = (event) => {
    event.preventDefault();

    const isFormValid = validateAllFields();

    if (isFormValid) {
        // console.log("amen");
        showSuccessMessage();
        const existingSuccess = document.querySelector(
            '[data-testid="test-contact-success"]'
        );
        setTimeout(() => {
            existingSuccess.remove();
        }, 1000);

        clearForm();

        // Clear all errors
        ["error-name", "error-email", "error-subject", "error-message"].forEach(
            (errorId) => clearError(errorId)
        );
    } else {
        // Focus on first invalid field
        const firstInvalidField = document.querySelector(
            '[aria-invalid="true"]'
        );

        if (firstInvalidField) {
            firstInvalidField.focus();
        }
    }
};

// ============================================
// INITIALIZATION
// ============================================

const initializeFormValidation = () => {
    const form = document.querySelector("main");
    const submitButton = document.querySelector(
        '[data-testid="test-contact-submit"]'
    );

    if (!form || !submitButton) {
        console.error("Form elements not found");
        return;
    }

    // Field configurations
    const fields = [
        { id: "fullname", validator: validateFullName, errorId: "error-name" },
        { id: "email", validator: validateEmail, errorId: "error-email" },
        { id: "subject", validator: validateSubject, errorId: "error-subject" },
        { id: "message", validator: validateMessage, errorId: "error-message" },
    ];

    // Attach blur event listeners for validation
    fields.forEach(({ id, validator, errorId }) => {
        const field = document.getElementById(id);
        if (field) {
            field.addEventListener(
                "blur",
                handleFieldBlur(id, validator, errorId)
            );

            field.addEventListener("input", handleFieldInput(errorId));
        }
    });

    // Attach submit handler
    submitButton.addEventListener("click", handleSubmit);

    // Prevent form submission on Enter key in input fields
    fields.forEach(({ id }) => {
        const field = document.getElementById(id);
        if (field && field.tagName !== "TEXTAREA") {
            field.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    submitButton.click();
                }
            });
        }
    });
};

// ============================================
// AUTO-INITIALIZE
// ============================================

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeFormValidation);
} else {
    initializeFormValidation();
}
