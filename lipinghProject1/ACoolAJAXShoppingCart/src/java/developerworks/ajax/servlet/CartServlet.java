package developerworks.ajax.servlet;

import developerworks.ajax.store.Cart;
import javax.servlet.http.*;

import java.util.Enumeration;

public class CartServlet extends HttpServlet {

    /**
     * Updates Cart, and outputs XML representation of contents
     *
     * @param req-httpServletRequest
     * @param res-Servlet response
     * @throws java.io.IOException
     */
    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws java.io.IOException {
        //Create a Enumeration object reference
        Enumeration headers = req.getHeaderNames();
        //Print the header name until it become null
        while (headers.hasMoreElements()) {
            String header = (String) headers.nextElement();
            System.out.println(header + ": " + req.getHeader(header));
        }

        //Create a Cart object reference
        Cart cart = getCartFromSession(req);
        //Specific request data for action and item 
        String action = req.getParameter("action");
        String item = req.getParameter("item");
        //Add or remove items from Cart
        if ((action != null) && (item != null)) {

            if ("add".equals(action)) {
                cart.addItem(item);

            } else if ("remove".equals(action)) {
                cart.removeItems(item);

            }
        }
        // Serialize the Cart's state to XML
        String cartXml = cart.toXml();
        // Write XML to response.
        res.setContentType("text/xml");
        res.getWriter().write(cartXml);
    }

    public void doGet(HttpServletRequest req, HttpServletResponse res) throws java.io.IOException {
        // Bounce to post, for debugging use
        // Hit this servlet directly from the browser to see XML
        doPost(req, res);
    }

    private Cart getCartFromSession(HttpServletRequest req) {
        //Return the current session associated with this request
        HttpSession session = req.getSession(true);
        Cart cart = (Cart) session.getAttribute("cart");
        //If the cart is null, create a new shopping cart
        if (cart == null) {
            cart = new Cart();
            session.setAttribute("cart", cart);
        }

        return cart;
    }
}
