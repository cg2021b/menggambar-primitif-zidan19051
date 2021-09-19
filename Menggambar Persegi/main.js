function main()
{
    //mendefinisikan kanvas (tempat untuk menggambar)
    var canvas = document.getElementById("meCanvas");
    //mendefinisikan konteks (tools untuk menggambar)
    var gl = canvas.getContext("webgl")

    //titik-titik sudut persegi
    var vertices = 
    [
        -0.3, 0.3,   
        -0.3, -0.3,  
        0.3, -0.3,   
        0.3, 0.3
    ];

    //buffer: memori untuk menampung data ketika data tsb. dikirim dari satu tempat ke tempat lain
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    //rumusan untuk membuat verteks (posisi dan ukuran)
    var vertexShaderCode = document.getElementById("vertexShaderCode").text;

    //mencetak verteks yang sudah dirumuskan
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    //rumusan untuk membuat fragment (posisi dan ukuran)
    var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;
    
    //mencetak fragment yang sudah dirumuskan
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    //kombinasi dari dua WebGLShader yang sudah di-compile (vertex & fragment)
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    var aPosition = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    //mengatur warna background (latar belakang)
    gl.clearColor(1.0, 0.3, 0.4, 0.7);

    //membersihkan background (latar belakang)
    gl.clear(gl.COLOR_BUFFER_BIT);

    //menggambar persegi
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}