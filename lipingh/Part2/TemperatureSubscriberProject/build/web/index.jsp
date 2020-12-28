<%-- 
    Document   : index
    Created on : 08/06/2017, 10:12:54 PM
    Author     : huang
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" language="javascript" src="mqttws31.js"></script>
        <script type="text/javascript" language="javascript" src="subscriber.js"></script>
    </head>
    <body>
        <h1>Temperature Subscriber</h1>
        <form id="myForm">
            <input type="radio" name="topic" onclick="chooseTopic()" value="coldTemps" > Cold Temperatures<br>
            <input type="radio" name="topic" onclick="chooseTopic()" value="niceTemps"> Nice Temperatures<br>
            <input type="radio" name="topic" onclick="chooseTopic()" value="hotTemps"> Hot Temperatures<br>
            <input type="radio" name="topic" onclick="chooseTopic()" value="allTemps" checked> All Temperatures
        </form>
        <div id="messages"></div>
    </body>
</html>
