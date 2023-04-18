import {Common} from "./Common";
import {HomePage} from "./HomePage";
import {CartPage} from "./CartPage"

class POManager {
    constructor(page){
        this.page = page;
        this.common= new Common(page);
        this.homePage= new HomePage(page);
        this.cartPage= new CartPage(page);
    }

    getHomePage(){
        return this.homePage;
    }

    getCommonPage(){
        return this.common;
    }

    getCartPage(){
        return this.cartPage;

    }
} 
module.exports = { POManager };
