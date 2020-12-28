package developerworks.websocket;

import developerworks.store.Cart;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/cartendpoint")
public class CartEndpoint {

    private static Cart cart = new Cart();

    private static Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());

    @OnOpen
    public void open(Session peer) throws IOException, EncodeException {
        //Adds the new connection
        peers.add(peer);
    }

    /**
     *
     * @param message
     * @param session
     * @throws IOException
     * @throws EncodeException
     */
    @OnMessage
    public void onMessage(String message, Session session) throws IOException, EncodeException {
        //System.out.println("Received: " + message);
        //get, or add,itemCode or minus, itemCode
        //split into action and itemCode(if send with)
        String[] cartAction = message.split(",");
        if (cartAction[0].equals("get")) {
            session.getBasicRemote().sendObject(cart.toJSON());
        }

        if (cartAction[0].equals("add")) {
            cart.addItem(cartAction[1]);
            for (Session peer : peers) {
                //Sends the received message to all connected users
                peer.getBasicRemote().sendObject(cart.toJSON());
            }
        }

        if (cartAction[0].equals("minus")) {
            cart.minusItem(cartAction[1]);
            for (Session peer : peers) {
                //Sends the received message to all connected users
                peer.getBasicRemote().sendObject(cart.toJSON());
            }
        }
    }

    @OnClose
    public void onClose(Session peer) throws IOException, EncodeException {
        //Removes a peer that has closed a connection
        peers.remove(peer);
    }
}
