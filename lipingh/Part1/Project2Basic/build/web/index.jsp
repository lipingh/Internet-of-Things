<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <!--use div to layout the web page with an element with width, height and border-->
        <style>
            div {
                width: 200px;
                height: 100px;
                border: 1px solid black;
            }
        </style>
    </head>
    <body>
        <!--execute myFunction() in the JavaScript when moving the mouse point
        and execute clearCoor() function in the JavaScript 
        when moving the mouse pointer out of the range over a div element-->
        <div onmousemove="myFunction(event)" onmouseout="clearCoor()"></div>
        <!--mark the following three paragraph(including the id "demo" which assigned values by functions defined in the java script)-->
        <p>Mouse over the rectangle above, and get the coordinates of your mouse pointer.</p>

        <p>When the mouse is moved over the div, the p element will display the horizontal and vertical coordinates of your mouse pointer, whose values are returned from the clientX and clientY properties on the 
            MouseEvent object.</p>
        <p id="demo"></p>
        <!--this java script file contain two functions, which are myFunction and clearCoor-->
        <script>
            //myFunction is to get the position(x and y) from the client
            //and write the coor inside an HTML element with id = "demo"
            function myFunction(e) {
                var x = e.clientX;
                var y = e.clientY;
                var coor = "Coordinates: (" + x + "," + y + ")";
                document.getElementById("demo").innerHTML = coor;
            }
            //clear Coordinates
            function clearCoor() {
                document.getElementById("demo").innerHTML = "";
            }
        </script>

    </body>
</html>
