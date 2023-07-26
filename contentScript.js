(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type } = obj;

        if (type === "PageLoad") {
            setTimeout(() => {loadLogo()}, 0);
        }
    });

    var links = document.querySelectorAll("link[rel~='icon']")
    links.forEach(link => {
        link.href = chrome.runtime.getURL("assets/HoloXLogo.png");
    });
    let loadInterval = null;
    const loadLogo = () => {
        if (document.getElementsByTagName("svg").length <= 5) {
            console.log("Page not yet loaded")
        } else  {
            if (!document.getElementsByClassName("HoloXLogo")[0]) {
                console.log("Adding HoloX Logo...");
                let holoXLogo = document.createElement("img");
                
                holoXLogo.src = chrome.runtime.getURL("assets/HoloXLogo.png");
                holoXLogo.width = "70";
                holoXLogo.height = "70";
                holoXLogo.className = "HoloXLogo";
                xPath = document.querySelector("path[d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z']");
                xLogo = null;
                if (xPath != null) {
                    xLogo = xPath.parentElement.parentElement;
                    console.log("X logo found")
                }
                else {
                    xLogo = document.getElementsByTagName("svg")[0];
                    console.log("X logo not found, trying to add logo to any SVG.")
                }
                if (xLogo) { 
                    xLogo.parentElement.append(holoXLogo);
                    xLogo.remove();
                    console.log("HoloX Logo Successfully Added!");
                    if(loadInterval) clearInterval(loadInterval);
                }
                else {
                    console.log("Could not add logo.")
                }
            }
            else {
                console.log("HoloX Logo Found")
            }
        }
    }
    loadInterval = setInterval(() => {loadLogo()}, 250)
    setTimeout(() => {clearInterval(loadInterval)}, 10000);
})();

