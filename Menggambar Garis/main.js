function main()
{
    var canvas = document.getElementById("meCanvas");
    var gl = canvas.getContext("webgl")

    var vertices = 
    [
        -0.6, 0.5,   //Titik A
        -0.6, -0.5,  //Titik B

        -0.3, 0.5,   //Titik C
        0.3, -0.5,  //Titik D

        0.6, 0.5,   //Titik E
        0.6, -0.5,  //Titik F
    ];

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexShaderCode = `
    attribute vec2 a_Position;
    void main()
    {
        gl_Position = vec4(a_Position, 0.0, 1.0);
        gl_PointSize = 20.0;
    }`;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShaderCode = `
    void main()
    {
        gl_FragColor = vec4(0.0, 0.0, 1.0, 0.6);
    }`;
    
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    var aPosition = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1.0, 0.3, 0.4, 0.7);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.LINES, 0, 6);

    
}