window.addEventListener("load", () => {
    
    //Set options
    chrome.storage.sync.get(['darkMode'], function(data) {
        setDarkMode(data.darkMode);
        if (data.darkMode == null) {
            resetSettings();
        }
    });

    //Save button
    document.querySelector("#saveButton").addEventListener("click", e => {
        saveSettings();
    });
    
    //Reset button
    document.querySelector("#resetButton").addEventListener("click", e => {
        resetSettings();
    });
});

function saveSettings()
{
    setDarkMode(document.getElementById("darkModeCheckbox").checked);
}

function resetSettings()
{
    setDarkMode(false);
}

function setDarkMode(darkMode)
{
    if (darkMode) {
        document.getElementById("darkModeCheckbox").checked = true;
        document.body.style.backgroundColor = "rgb(45, 46, 48)";
        document.body.style.color = "white";
    } else {
        document.getElementById("darkModeCheckbox").checked = false;
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    }
    
    chrome.storage.sync.set({darkMode: darkMode});
}