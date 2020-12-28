package developerworks.store;

import java.math.BigDecimal;
import java.util.*;

/**
 * A very simple shopping Cart
 */
public class Cart {

    private HashMap<Item, Integer> contents;

    /**
     * Creates a new Cart instance
     */
    public Cart() {
        contents = new HashMap<Item, Integer>();
    }

    /*
     * Adds a named item to the cart
     *
     * @param itemName The name of the item to add to the cart
     */
    public void addItem(String itemCode) {

        Catalog catalog = new Catalog();

        if (catalog.containsItem(itemCode)) {
            Item item = catalog.getItem(itemCode);

            int newQuantity = 1;
            if (contents.containsKey(item)) {
                Integer currentQuantity = contents.get(item);
                newQuantity += currentQuantity;
            }

            contents.put(item, newQuantity);
        }
    }

    /*
     * Count down the number of items from the cart
     * given the code of the item
     */
    public void minusItem(String itemCode) {

        Catalog catalog = new Catalog();
        int newQuantity;

        if (catalog.containsItem(itemCode)) {
            Item item = catalog.getItem(itemCode);

            if (contents.containsKey(item)) {
                Integer currentQuantity = contents.get(item);
                newQuantity = currentQuantity - 1;
                if (newQuantity == 0) {
                    removeItems(itemCode);
                } else {
                    contents.put(item, newQuantity);
                }
            }
        }
    }

    /* 
     * Remove the item from the cart.
     * @param itemName Name of item to remove
     */
    public void removeItems(String itemCode) {
        contents.remove(new Catalog().getItem(itemCode));
    }

    /*
     * @return JSON representation of cart contents
     */
    public String toJSON() {
        StringBuilder json = new StringBuilder();
        json.append("{\"ShoppingCart\": ");
        json.append("{\"Generated\": \"")
                .append(System.currentTimeMillis())
                .append("\", \"Total\": \"")
                .append(getCartTotal())
                .append("\"},")
                .append("\"Itemlist\": [");
        for (Item item : contents.keySet()) {
            int itemQuantity = contents.get(item);

            json.append("{\"Code\": \"")
                    .append(item.getCode())
                    .append("\", ")
                    .append("\"Name\": \"")
                    .append(item.getName())
                    .append("\", ")
                    .append("\"Quantity\": \"")
                    .append(itemQuantity)
                    .append("\"},");
        }

        if (",".equals(json.substring(json.length() - 1))) {
            json.delete(json.length() - 1, json.length()); //delete the last comma to get the right json format
        }
        json.append("]}");
        return json.toString();
    }

    private String getCartTotal() {
        int total = 0;

        for (Item item : contents.keySet()) {
            int itemQuantity = contents.get(item);

            total += (item.getPrice() * itemQuantity);
        }

        return "$" + new BigDecimal(total).movePointLeft(2);
    }
}
