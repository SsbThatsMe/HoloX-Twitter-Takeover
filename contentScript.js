(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type } = obj;

        if (type === "PageLoad") {
            setTimeout(() => {loadLogo()}, 0);
        }
    });

    const loadLogo = () => {
        let twitterLogoExists = document.getElementsByClassName("TwitterLogo")[0];
        if (!twitterLogoExists) {
            let twitterLogo = document.createElement("img");

            twitterLogo.src = chrome.runtime.getURL("assets/HoloXLogo.png");
            twitterLogo.width = "70";
            twitterLogo.height = "70";
            twitterLogo.className = "TwitterLogo";

            xLogo = document.getElementsByClassName("r-13v1u17 r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp")[0];
            if (xLogo) { 
                xLogo.parentElement.append(twitterLogo);
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

