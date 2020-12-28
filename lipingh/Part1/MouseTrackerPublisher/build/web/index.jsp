<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <script type="text/javascript" language="javascript" src="mqttws31.js"></script>
        <script type="text/javascript" language="javascript" src="publisher.js"></script>
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
        <h1>Mouse Tracker Publisher</h1>
        <!--execute myFunction() in the JavaScript when moving the mouse point
        and execute clearCoor() function in the JavaScript 
        when moving the mouse pointer out of the range over a div element-->
        <div onmousemove="myFunction(event)" onmouseout="clearCoor()"></div>
        <!--mark the following three paragraph(including the id "demo" which assigned values by functions defined in the java script)-->
        <p>Mouse over the rectangle above, and get the coordinates of your mouse pointer.</p>

        <p>When the mouse is moved over the div, the p element will display the horizontal and vertical coordinates of your mouse pointer, whose values are returned from the clientX and clientY properties on the 
            MouseEvent object.</p>
        <p id="demo"></p>
    </body>
</html>
