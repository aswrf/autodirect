document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const gallery = document.getElementById('gallery');

    // Xử lý click để chọn file
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
                    const gifUrl = e.target.result;
                    createGifElement(gifUrl);
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

        // Tạo phần tử img
        const img = document.createElement('img');
        img.src = gifUrl;
        container.appendChild(img);

        // Tạo URL box
        const urlBox = document.createElement('div');
        urlBox.className = 'url-box';
        // Thay thế YOUR_GITHUB_USERNAME và REPOSITORY_NAME bằng thông tin thực tế
        const redirectUrl = `https://aswrf.github.io/autodirect/redirect.html`;
        urlBox.textContent = redirectUrl;
        container.appendChild(urlBox);

        // Tạo nút copy
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy URL';
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(redirectUrl);
            copyBtn.textContent = 'Đã copy!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy URL';
            }, 2000);
        };
        container.appendChild(copyBtn);

        // Thêm vào gallery
        gallery.insertBefore(container, gallery.firstChild);
    }
});