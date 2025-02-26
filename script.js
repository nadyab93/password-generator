// Select elements
const passwordField = document.getElementById("password");
const lengthField = document.getElementById("length");
const uppercaseCheckbox = document.getElementById("uppercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn"); 
const strengthText = document.getElementById("strengthText");
const strengthBar = document.getElementById("strengthBar");

// Character sets
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/";

// Function to generate password
function generatePassword() {
    let length = parseInt(lengthField.value);
    let characters = lowercaseChars;
    
    if (uppercaseCheckbox.checked) characters += uppercaseChars;
    if (numbersCheckbox.checked) characters += numberChars;
    if (symbolsCheckbox.checked) characters += symbolChars;
    
    let password = "";
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    
    passwordField.value = password;
    checkStrength(password);
}

// Function to check password strength
function checkStrength(password) {
    let strength = 0;

    if (/[A-Z]/.test(password)) strength++; // Uppercase letters
    if (/[0-9]/.test(password)) strength++; // Numbers
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++; // Symbols
    if (password.length >= 12) strength++; // Length

    strengthBar.className = strength === 1 ? "weak" : strength === 2 ? "medium" : "strong";
    strengthText.textContent = `Strength: ${strength === 1 ? "Weak" : strength === 2 ? "Medium" : "Strong"}`;
}

// Clear Password
clearBtn.addEventListener("click", () => {
    passwordField.value = "";
    strengthBar.className = "";
    strengthText.textContent = "Strength:";
});

// Copy password to clipboard
copyBtn.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(passwordField.value);
        alert("Password copied to clipboard!");
    } catch {
        alert("Failed to copy password!");
    }
});

// Event listener for generate button
generateBtn.addEventListener("click", generatePassword);
