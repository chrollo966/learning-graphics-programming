(() => { // prevent global namespace pollution
    // declare variables globally.
    let canvas = null;
    let ctx = null;
    let image = null;

    // detect when the HTML file has completely loaded.
    window.addEventListener('load', () => {
        imageLoader('./images/lotus.jpeg', (loadedImage) => {
            image = loadedImage;
            initialize();
            render();
        });
    }, false);

    function initialize() {
        // Create Canvas element
        canvas = document.body.querySelector('#canvas'); // get canvas element from DOM

        // setting canvas size to cover thw entire window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Get context from Canvas element
        ctx = canvas.getContext('2d');
    }

    function render() {
        ctx.drawImage(image, 100, 100);
        ctx.drawImage(image, 300, 100, 200, 200);
        ctx.drawImage(image, 16, 16, 96, 96, 100, 300, 50, 50);
    }

    // drawing functions

    /**
     * @param {number} x — x coordinate of the uppler-left vertex of the rectangle.
     * @param {number} y — y coordinate of the uppler-left vertex of the rectangle.
     * @param {number} width — width of the rectangle
     * @param {number} height — height of the rectangle
     * @param {string} [color] –  color filling the rectangle
     */
    function drawRect(x, y, width, height, color) {
        // set the style if color is specified        
        if (color != null) {
            ctx.fillStyle = color;
        }
        ctx.fillRect(x, y, width, height);
    }

    /**
     * 
     * @param {number} x1 — x coordinate of starting point of line 
     * @param {number} y1 — y coordinate of starting point of line 
     * @param {number} x2 — x coordinate of ending point of line 
     * @param {number} y2 — y coordinate of ending point of line 
     * @param {string} color — line color
     * @param {number} [width=1] — line width 
     */
    function drawLine(x1, y1, x2, y2, color, width = 1) {
        // set the style if color is specified
        if (color != null) {
            ctx.strokeStyle = color;
        }
        // set line width
        ctx.lineWidth = width;

        // Let's get started set the path
        ctx.beginPath();

        // setting starting point
        ctx.moveTo(x1, y1);

        // line path to ending point
        ctx.lineTo(x2, y2);

        // close path
        ctx.closePath();

        // draw the path
        ctx.stroke();
    }

    /**
     * 
     * @param {Array<number>} points — polygon vertices coordinates
     * @param {string} color — color
     */
    function drawPolygon(points, color) {
        // check if points are in an array and enough to draw polygon
        if (Array.isArray(points) !== true || points.length < 6) {
            return;
        }

        // set the style if color is specified
        if (color != null) {
            ctx.fillStyle = color;
        }

        // begin path
        ctx.beginPath();

        // set the starting point
        ctx.moveTo(points[0], points[1]);

        // set a path connecting each vertex
        for (let i = 2; i < points.length; i += 2) {
            ctx.lineTo(points[i], points[i + 1]);
        }

        // close path
        ctx.closePath();

        // fill the polygon
        ctx.fill();
    }

    /**
     * 
     * @param {number} x -- x coordinate of the center
     * @param {number} y -- y coordinate of the center
     * @param {number} radius -- radius of the circle
     * @param {string} [color] -- color of the circle
     */
    function drawCircle(x, y, radius, color) {
        if (color != null) {
            ctx.fillStyle = color;
        }

        // begin the path setting
        ctx.beginPath()
        // set the path of the circle
        ctx.arc(x, y, radius, 0.0, Math.PI * 2.0);
        // close the path
        ctx.closePath();
        // draw circle along the path
        ctx.fill();

    }

    /**
     * 
     * @param {number} x -- x coordinate of the center
     * @param {number} y -- y coordinate of the center
     * @param {number} radius -- radius of the fan
     * @param {number} startRadian -- starting radian
     * @param {number} endRadian -- ending radian
     * @param {string} [color] -- color of the fan
     */
    function drawFan(x, y, radius, startRadian, endRadian, color) {
        if (color != null) {
            ctx.fillStyle = color
        }
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, radius, startRadian, endRadian);
        ctx.closePath();
        ctx.fill();
    }

    /**
     * drawing by quadratic bezier curve
     * @param {number} x1 -- x coordinate of starting point
     * @param {number} y1 -- y coordinate of starting point
     * @param {number} x2 -- x coordinate of ending point
     * @param {number} y2 -- y coordinate of ending point
     * @param {number} cx -- x coordinate of control point
     * @param {number} cy -- y coordinate of control point
     * @param {sgring} [color] -- color
     * @param {number} [width=1] -- line width
     */
    function drawQuadraticBezier(x1, y1, x2, y2, cx, cy, color, width = 1) {
        if (color != null) {
            ctx.strokeStyle = color;
        }
        // setting line width
        ctx.lineWidth = width;
        // begin path setting
        ctx.beginPath();
        // starting point of path
        ctx.moveTo(x1, y1);
        // set the control point and ending point
        ctx.quadraticCurveTo(cx, cy, x2, y2);
        // close path setting
        ctx.closePath();
        // stroke the path
        ctx.stroke();
    }

    /**
     * draw a cubic bezier curve
     * @param {number} x1 -- x of starting point
     * @param {number} y1 -- y of starting point
     * @param {number} x2 -- x of ending point
     * @param {number} y2 -- y of ending point
     * @param {number} cx1 -- x of control point of starting point
     * @param {number} cy1 -- y of control point of starting point
     * @param {number} cx2 -- x of control point of ending point
     * @param {number} cy2 -- y of control point of ending point
     * @param {string} [color] -- drawing color
     * @param {number} [width=1] -- line width
     */
    function drawCubicBezier(x1, y1, x2, y2, cx1, cy1, cx2, cy2, color, width = 1) {
        // set the style if color is specified
        if (color != null) {
            ctx.strokeStyle = color;
        }
        // setting line width
        ctx.lineWidth = width;
        // begin the path setting
        ctx.beginPath();
        // set the starting point
        ctx.moveTo(x1, y1);
        // set the control point and ending point of cubic berzier curve
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
        // close the path
        ctx.closePath();
        // draw the path
        ctx.stroke();
    }

    /**
     * generating random integers
     * @param {number} range — range for random numbers
     */
    function generateRandomInt(range) {
        let random = Math.random();
        return Math.floor(random * range);
    }

    /**
     * loading image and call back a function
     * @param {string} path - path to image file
     * @param {function} [callback] - callback function
     */
    function imageLoader(path, callback) {
        // generate image instance
        let target = new Image();

        // process when the image has been loaded
        target.addEventListener('load', () => {
            if (callback != null) {
                callback(target);
            }
        }, false);
        target.src = path;
    }


})();

