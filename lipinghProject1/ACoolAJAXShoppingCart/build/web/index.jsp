<!--import java packages which need when getting the catelog-->
<%@ page import="java.util.*" %>
<%@ page import="developerworks.ajax.store.*" %>
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <!--set the head, including content type-->
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!-- Have the browser fetch two javascript files. -->
        <script type="text/javascript" language="javascript" src="ajax1.js"></script>
        <script type="text/javascript" language="javascript" src="cart.js"></script>
    </head>
    <!--set the layout-->
    <body>
        <div style="float: left; width: 500px">
            <h2>Catalog</h2>
            <!--table with labels and buttons-->
            <table border="1">
                <thead><th>Name</th><th>Description</th><th>Price</th><th></th></thead>
                <tbody>
                    <!--display each of the item from the catalog,here need the catalog-->
                    <%
                        for (Iterator<Item> I = new Catalog().getAllItems().iterator(); I.hasNext();) {
                            Item item = I.next();
                    %>
                    <!--get name, description, price,which need the item.java-->
                    <tr>
                        <td><%= item.getName()%></td>
                        <td><%= item.getDescription()%></td>
                        <td><%= item.getFormattedPrice()%></td>
                        <td>
                            <!--add buttons-->
                            <button onclick="addToCart('<%= item.getCode()%>')">Add to Cart</button>
                        </td>
                    </tr>
                    <% }%>
                </tbody>
            </table>
            <!--set the total position and initial as 0-->
            <div style="position: absolute; top: 0px; right: 0px; width: 250px">
                <h2>Cart Contents</h2>
                <!--contents should be unique-->
                <ul id="contents">
                </ul>
                Total cost: <span id="total">$0.00</span>
            </div>
    </body>
</html>
