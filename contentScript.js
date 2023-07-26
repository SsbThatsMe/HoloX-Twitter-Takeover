(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type } = obj;

        if (type === "PageLoad") {
            setTimeout(() => {loadLogo()}, 0);
        }
    });

    const loadLogo = () => {
        if (!document.getElementsByClassName("HoloXLogo")[0]) {
            let holoXLogo = document.createElement("img");

            holoXLogo.src = chrome.runtime.getURL("assets/HoloXLogo.png");
            holoXLogo.width = "70";
            holoXLogo.height = "70";
            holoXLogo.className = "HoloXLogo";

            xLogo = document.getElementsByTagName("svg")[0];
            if (xLogo) { 
                xLogo.parentElement.append(holoXLogo);
                xLogo.remove();
            }

            var links = document.querySelectorAll("link[rel~='icon']")
            links.forEach(link => {
                link.href = chrome.runtime.getURL("assets/HoloXLogo.png");
            });
        }
    }
    setTimeout(() => {loadLogo()}, 600);
    setTimeout(() => {loadLogo()}, 3000);
})();

