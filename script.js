function createGifElement(gifUrl) {
    // Lưu GIF URL vào localStorage
    localStorage.setItem('uploadedGif', gifUrl);

    const container = document.createElement('div');
    container.className = 'gif-container';

    const img = document.createElement('img');
    img.src = gifUrl;
    container.appendChild(img);

    const redirectUrl = 'https://aswrf.github.io/autodirect/redirect.html';
    
    const urlBox = document.createElement('div');
    urlBox.className = 'url-box';
    urlBox.textContent = redirectUrl;
    container.appendChild(urlBox);

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copy URL';
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(redirectUrl).then(() => {
            copyBtn.textContent = 'Đã copy!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy URL';
            }, 2000);
        });
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Xóa';
    deleteBtn.onclick = () => {
        localStorage.removeItem('uploadedGif');
        container.remove();
    };

    buttonGroup.appendChild(copyBtn);
    buttonGroup.appendChild(deleteBtn);
    container.appendChild(buttonGroup);

    gallery.insertBefore(container, gallery.firstChild);
}