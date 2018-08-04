document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('resize', thunk);
    thunk();

    function thunk() {
        let viewboxes = document.getElementsByClassName('x-viewbox');
        for (let i = 0; i < viewboxes.length; i++) {
            onresize.call(viewboxes[i]);
        }
    }

    function onresize() {
        let parent = this.parentElement,
            child = this.firstChild,
            w, h, cw, ch, sw, sh, s;

        if (!parent) {
            w = window.innerWidth;
            h = window.innerHeight;
        }
        else {
            w = parent.scrollWidth;
            h = parent.scrollHeight;
        }

        if (child) {
            child.style.transformOrigin = '0 0';

            cw = child.width;
            ch = child.height;
        }
        sw = w / cw;
        sh = h / ch;
        if ((sw || sh) == NaN) {
            sw = w;
            sh = h;
        }

        if (sw > sh) {
            this.style.width = sh * cw + 'px';
            this.style.height = h + 'px';
            s = sh;
        }
        else {
            this.style.width = w + 'px';
            this.style.height = sw * ch + 'px';
            s = sw;
        }
        if (child) {
            child.style.transform = 'scale(' + s + ')';
        }
    }
});
