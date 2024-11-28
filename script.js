document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const gallery = document.getElementById('gallery');

    // Click để chọn file
    dropZone.addEventListener('click', () => fileInput.click());

    // Xử lý kéo thả
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#000';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = '#ccc';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ccc';
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    // Xử lý khi chọn file
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    function handleFile(file) {
        if (file.type !== 'image/gif') {
            alert('Chỉ chấp nhận file GIF!');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const gifUrl = e.target.result;
            createGifElement(gifUrl);
        };
        reader.readAsDataURL(file);
    }

    function createGifElement(gifUrl) {
        const container = document.createElement('div');
        container.className = 'gif-container';

        const img = document.createElement('img');
        img.src = gifUrl;
        container.appendChild(img);

        const urlBox = document.createElement('div');
        urlBox.className = 'url-box';
        const redirectUrl = 'https://aswrf.github.io/autodirect/redirect.html';
        urlBox.textContent = redirectUrl;
        container.appendChild(urlBox);

        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'button-group';

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy URL';
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(redirectUrl)
                .then(() => {
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
            container.remove();
        };

        buttonGroup.appendChild(copyBtn);
        buttonGroup.appendChild(deleteBtn);
        container.appendChild(buttonGroup);

        gallery.insertBefore(container, gallery.firstChild);
    }
});