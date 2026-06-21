import { domToPng } from 'modern-screenshot';

window.downloadHasilGizi = function (filename) {
    const element = document.getElementById('capture-card');

    return document.fonts.ready.then(() => {
        return domToPng(element, {
            backgroundColor: '#ffffff',
            scale: 2
        });
    }).then(dataUrl => {
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
    });
};