package developerworks.ajax.store;

import java.math.BigDecimal;

public class Item {

    private String code;
    private String name;
    private String description;
    private int price;

    /**
     * Constructor for Item and initial the code,name, description, price
     *
     * @param code--code for the item
     * @param name---name for the item
     * @param description---description for the item
     * @param price ----price for the item
     */
    public Item(String code, String name, String description, int price) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    /**
     * method to get the code
     *
     * @return code for the item
     */
    public String getCode() {
        return code;
    }

    /**
     * method to get the name for the item
     *
     * @return name for the item
     */
    public String getName() {
        return name;
    }

    /**
     * get description for the item
     *
     * @return description for the item
     */
    public String getDescription() {
        return description;
    }

    /**
     * get price for the item
     *
     * @return price-int for the item
     */
    public int getPrice() {
        return price;
    }

    /**
     * get the price for the item
     *
     * @return format(2 decimal with $ sign) price for the item
     */
    public String getFormattedPrice() {
        return "$" + new BigDecimal(price).movePointLeft(2);
    }

    /**
     * compare objects
     *
     * @param o object
     * @return boolean value for compare result
     */
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (this == null) {
            return false;
        }
        if (!(o instanceof Item)) {
            return false;
        }
        return ((Item) o).getCode().equals(this.code);
    }
}
