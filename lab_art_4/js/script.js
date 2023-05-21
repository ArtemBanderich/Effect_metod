// Шаблон для доставки. Метод розраховує суму доставки 
class Delivery {
    calculate_delivery(delivery){}
}

// Клас доставки самовивозом. Сума незмінна
class Pickup extends Delivery{
    calculate_delivery(delivery){
       console.log("Доставка - самовивіз");
       console.log("Сума до сплати " + delivery + " гривень");
    }
}

// Клас зовнішньої доставки. Сума збільшується на 20%
class ExternalDelivery extends Delivery{
    calculate_delivery(delivery){
        delivery = delivery*1.2
        console.log("Доставка - зовнішня");
        console.log("Сума до сплати " + delivery + " гривень");
     }
}

// Клас внутрішньої доставки. Сума збільшується на 10%
class OwnDelivery extends Delivery{
    calculate_delivery(delivery){
        delivery = delivery*1.1
        console.log("Доставка - власна");
        console.log("Сума до сплати " + delivery + " гривень");
     }
}

// Клас Доставки їжі.
class FoodDelivery{
    delivery = new Pickup();
    // Встановлюємо тип доставки. Самовивіз за замовчуванням
    setDelivery(delivery){
        this.delivery = delivery;
    }
    // Розраховуємо суму доставки обраного типу
    order(price){
        this.delivery.calculate_delivery(price);
    }
}

let glovo = new FoodDelivery();

glovo.order(60);

glovo.setDelivery(new OwnDelivery());
glovo.order(60);