const fetchLogo = () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get("SelectedLogo", (obj) => {
            resolve(obj["SelectedLogo"] ? JSON.parse(obj["SelectedLogo"]): "HoloXLogo")
        })
    })
}
const fetchSize = () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get("SelectedSize", (obj) => {
            resolve(obj["SelectedSize"] ? JSON.parse(obj["SelectedSize"]): "60")
        })
    })
}

document.addEventListener("DOMContentLoaded", () => {
    let LogoSelecter = document.getElementById("LogoSelecter")
    LogoSelecter.onchange = function() {
        chrome.storage.sync.set({"SelectedLogo": JSON.stringify(LogoSelecter.value)});
        /*chrome.runtime.sendMessage("PopupStateChange", (response) => {
            console.log('received user data', response);
          }); */
    }

    let SizeSelecter = document.getElementById("SizeSelecter")
    SizeSelecter.onchange = function() {
        chrome.storage.sync.set({"SelectedSize": JSON.stringify(SizeSelecter.value)});
        /*chrome.runtime.sendMessage("PopupStateChange", (response) => {
            console.log('received user data', response);
          }); */
    }
});

let OptionLoader = async() => {
    let logo = await fetchLogo()
    let size = await fetchSize() 
    document.getElementById("LogoSelecter").value = logo;
    document.getElementById("SizeSelecter").value = size;

    let options = LogoSelecter.getElementsByTagName("option");
    console.log(options);
    for(let i = 0; i < options.length; i++)
    {
        let logo = chrome.runtime.getURL("assets/Images/" + options[i].value + ".png");
        options[i].style = "background-image:url(" + logo + ");";
    }
}
OptionLoader();