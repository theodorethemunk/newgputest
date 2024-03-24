const mmConnectButton = document.getElementById("mmConnectButton");

const stopMMBtnLoading = () => {
    const timeout = setTimeout(() => {
        mmConnectButton.classList.remove("mmLoadingButton");
        clearTimeout(timeout);
    }, 300);
};

const storeAddressInLocalStorage = (address) => {
    localStorage.setItem("metamaskAddress", address);
};

const removeAddressFromLocalStorage = () => {
    localStorage.removeItem("metamaskAddress");
};

const getAddressFromLocalStorage = () => {
    const address = localStorage.getItem("metamaskAddress");
    return address ? address : null;
};

const getInitials = (address) => {
    if (!address) return "";
    const trimmedAddress = address.trim();
    const initials = trimmedAddress.slice(0, 10);
    return `${initials}...`;
};

function convertToWei(ethAmount) {
    const weiAmount = ethAmount * 10 ** 18;
    return weiAmount;
}

function convertToEth(weiAmount) {
    const ethAmount = weiAmount / 10 ** 18;
    return ethAmount;
}

const connectWallet = () => {
    ethereum
        .request({
            method: "eth_requestAccounts"
        })
        .then((accounts) => {
            const account = accounts[0];
            console.log(account);

            // Update the text inside the button to display the first 15 initials of the account address
            mmConnectButton.querySelector("span").innerText = getInitials(account);

            // Store the full account address in local storage
            storeAddressInLocalStorage(account);

            stopMMBtnLoading();
        })
        .catch((error) => {
            console.log(error, error.code);
            stopMMBtnLoading();
        });
};

const disconnectWallet = () => {

    // Revert the button text back to "Connect wallet"
    mmConnectButton.querySelector("span").innerText = "Connect wallet";

    // Remove the account address from local storage
    removeAddressFromLocalStorage();
};

mmConnectButton.addEventListener("click", () => {
    if (typeof window.ethereum !== "undefined") {
        mmConnectButton.classList.add("mmLoadingButton");

        const storedAddress = getAddressFromLocalStorage();
        if (storedAddress) {

            console.log("Wallet Disconnected");

            alert("Wallet Disconnected");

            // If there is a stored address, it means the user is already connected, so disconnect instead
            disconnectWallet();
            stopMMBtnLoading();
        } else {
            // If there is no stored address, connect the wallet
            connectWallet();
        }
    } else {
        window.open("https://metamask.io/download/", "_blank");
    }
});

// Check if address is already available in local storage on page load
document.addEventListener("DOMContentLoaded", () => {
    const storedAddress = getAddressFromLocalStorage();
    if (storedAddress) {
        // Update the text inside the button to display the first 15 initials of the stored address
        mmConnectButton.querySelector("span").innerText = getInitials(storedAddress);
    }
});

// On account change
if (window.ethereum) {
    window.ethereum.on('accountsChanged', handleMMAccountsChanged);
}


// eth_accounts always returns an array.
function handleMMAccountsChanged(accounts) {

    // Show laoding
    mmConnectButton.classList.add("mmLoadingButton");

    if (accounts.length === 0) {

        // MetaMask is locked or the user has not connected any accounts.
        console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== getAddressFromLocalStorage()) {

        // Reload your interface with accounts[0].
        currentAccount = accounts[0];

        console.log(currentAccount);

        // Update the text inside the button to display the first 15 initials of the currentAccount address
        mmConnectButton.querySelector("span").innerText = getInitials(currentAccount);

        // Store the full currentAccount address in local storage
        storeAddressInLocalStorage(currentAccount);
    }

    // Stop loading
    stopMMBtnLoading();
}