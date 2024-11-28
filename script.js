document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const gallery = document.getElementById('gallery');

    dropZone.addEventListener('click', () => fileInput.click());

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
        handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type === 'image/gif') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    createGifElement(e.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Chỉ chấp nhận file GIF!');
            }
        });
    }

    function createGifElement(gifUrl) {
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
        deleteBtn.onclick = () => container.remove();

        buttonGroup.appendChild(copyBtn);
        buttonGroup.appendChild(deleteBtn);
        container.appendChild(buttonGroup);

        gallery.insertBefore(container, gallery.firstChild);
    }
});