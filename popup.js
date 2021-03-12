let darkMode;

window.addEventListener("load", () => {
    
    console.log("Popup window loaded");

    //Set dark mode
    chrome.storage.sync.get(['darkMode'], function(data) {
        darkMode = data.darkMode;
        console.log("Setting dark mode to " + darkMode);

        if (darkMode) {
            document.body.style.backgroundColor = "rgb(45, 46, 48)";
            document.body.style.color = "white";
            document.querySelector(".footer").style.backgroundColor = "rgb(30, 30, 30)";
            document.querySelector("#extensionName").style.color = "rgb(150, 150, 150)";
            if (document.querySelector("#inputBox") != null) {
                document.querySelector("#inputBox").style.backgroundColor = "rgb(29, 31, 33)";
                document.querySelector("#inputBox").style.color = "white";
            }
        } else {
            if (document.querySelector("#encodeButton") != null) {
                document.querySelector("#encodeButton").style.textShadow = "0px 0px 0px rgb(0, 0, 0)";
                document.querySelector("#encodeButton").style.backgroundColor = "rgb(256, 256, 256)";
                document.querySelector("#encodeButton").style.color = "black";
                css().bind("#encodeButton:hover", {
                    "background-color": "#00FF00"
                });
                css().bind("#encodeButton:active", {
                    "background-color": "#FF0000"
                });
            }

            if (document.querySelector("#decodeButton") != null) {
                document.querySelector("#decodeButton").style.textShadow = "0px 0px 0px rgb(0, 0, 0)";
                document.querySelector("#decodeButton").style.backgroundColor = "rgb(256, 256, 256)";
                document.querySelector("#decodeButton").style.color = "black";
                css().bind("#decodeButton:hover", {
                    "background-color": "#00FF00"
                });
                css().bind("#decodeButton:active", {
                    "background-color": "#FF0000"
                });
            }
        }
    });

    //Extension Options button
    document.querySelector("#optionsButton").addEventListener("click", e => {
        chrome.tabs.create({url: "options.html"}); //Go to the options page
    });
    
    //Encode button
    document.querySelector("#encodeButton").addEventListener("click", e => {
        var text = document.querySelector("#inputBox").value;
        if (text != "") {
            encode(text);
        }
    });

    //Decode button
    document.querySelector("#decodeButton").addEventListener("click", e => {
        var text = document.querySelector("#inputBox").value;
        if (text != "") {
            decode(text);
        }
    });
});

function encode(text)
{
    try {
        var encodedText = btoa(text);
        displayInPopup(text, encodedText, true);
    } catch {
        displayInPopup(text, "Error", true);
    }
}

function decode(text)
{
    try {
        var decodedText = atob(text);
        displayInPopup(text, decodedText, true);
    } catch {
        displayInPopup(text, "Error", true);
    }
}

function displayInPopup(text, result, removeInputs)
{
    var ioSpace = document.querySelector("#ioSpace");
    
    if (removeInputs) {
        var inputTable = document.querySelector("#inputTable");
        ioSpace.removeChild(inputTable);
    }

    var resultOutput = document.createElement("div");
    //resultOutput.innerText = "Result: ";
    resultOutput.innerText += result;
    ioSpace.appendChild(resultOutput);

    var lineBreak = document.createElement("br");
    ioSpace.appendChild(lineBreak);

    var copyToClipboardButton = document.createElement("input");
    copyToClipboardButton.type = "button";
    copyToClipboardButton.className = "codeButton";
    copyToClipboardButton.id = "copyToClipboardButton";
    copyToClipboardButton.value = "Copy to clipboard";
    copyToClipboardButton.style.cssFloat = "right";
    copyToClipboardButton.onclick = () => {
        var dummy = document.createElement("input");
        //dummy.style.display = "none";
        document.body.appendChild(dummy);
        dummy.setAttribute("id", "dummyId");
        document.getElementById("dummyId").value = result;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    };
    ioSpace.appendChild(copyToClipboardButton);
}