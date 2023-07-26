
(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type } = obj;

        if (type === "PageLoad") {
            setTimeout(() => {loadLogo()}, 0);
        }
    });

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
                resolve(obj["SelectedSize"] ? JSON.parse(obj["SelectedSize"]): "70")
            })
        })
    }

    let setIcon = async() => {
        logo = await fetchLogo();
        if (logo === "TwitterLogo") logo = "TwitterLogoBlue";
        var links = document.querySelectorAll("link[rel~='icon']")
        links.forEach(link => {
            link.href = chrome.runtime.getURL("assets/Images/" + logo + ".png");
        });
    }
    setIcon();

    let loadInterval = null;
    let loadLogo = async() => {
        if (document.getElementsByTagName("svg").length <= 5) {
            console.log("Page not yet loaded")
        } else  {
            if (!document.getElementsByClassName("HololiveLogo")[0]) {
                logo = await fetchLogo();
                size = await fetchSize();
                console.log(logo)
                console.log("Adding Hololive Logo...");
                let LogoElement = document.createElement("img");
                
                LogoElement.src = chrome.runtime.getURL("assets/Images/" + logo + ".png");
                LogoElement.width = size;
                LogoElement.height = size;
                LogoElement.className = "HololiveLogo";
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
                if (xLogo && !document.getElementsByClassName("HololiveLogo")[0]) { 
                    xLogo.parentElement.append(LogoElement);
                    xLogo.remove();
                    console.log("Logo Successfully Added!");
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
    loadInterval = setInterval(() => {loadLogo()}, 200)
    setTimeout(() => {clearInterval(loadInterval)}, 10000);
})();

