// Клас для бд PostgreSQL
class PostgreSQLDatabase{
    // Констректор перевіряє чи створені вже екземпляри класу
    constructor(){
        // Якщо так, то працюємо зі створеним
        if(typeof PostgreSQLDatabase.instance === 'object'){
            return PostgreSQLDatabase.instance;
        }
        // Якщо ні, то створюємо змінну для переліку звернень та змінну самої бд
        this.querys = 0;
        PostgreSQLDatabase.instance = this;
        return this;
    }
    // Метод для перевірки кількості звернень
    numberOfAppeals(){
        return "Запитів до PostgreSQLDatabase " + this.querys;
    }
    // Метод для запитів до бд. Цей метод збільшує кількість запитів
    query(num){
        if(num == 1){
            console.log("Данні по цінам PostgreSQL");
        }else if(num == 2){
            console.log("Данні по клієнтам PostgreSQL");
        }else{
            console.log("Повна база даних PostgreSQL");
        }
        this.querys++;
    }
}

// Клас для бд MongoDBDatabase
class MongoDBDatabase{
    constructor(){
        if(typeof MongoDBDatabase.instance === 'object'){
            return MongoDBDatabase.instance;
        }
        this.querys = 0;
        MongoDBDatabase.instance = this;
        return this;
    }

    numberOfAppeals(){
        return "Запитів до MongoDBDatabase " + this.querys;
    }

    query(num){
        if(num == 1){
            console.log("Данні по цінам MongoDBDatabase");
        }else{
            console.log("Повна база даних MongoDBDatabase");
        }
        this.querys++;
    }
}

// Створення двох змінних для роботи з постгрес
let postgreFront = new PostgreSQLDatabase();
let postgreBack = new PostgreSQLDatabase();
// Виклики до бази даних з різними запитами з різних змінних
postgreFront.query(1);
postgreFront.query(2);
postgreFront.query(0);
postgreBack.query(0);
postgreBack.query(0);
postgreBack.query(2);
postgreBack.query(1);
// Виведення кількості запитів до бази даних постгрес з різних змінних (Повинна бути однакова)
console.log(postgreFront.numberOfAppeals());
console.log(postgreBack.numberOfAppeals());

// Створення двох змінних для роботи з МонгоДБ
// Виклики до бази даних з різними запитами з різних змінних
let mongoFront = new MongoDBDatabase();
mongoFront.query(1);

let mongoBack = new MongoDBDatabase();
mongoBack.query(0);

// Виведення кількості запитів до бази даних монгоДБ з різних змінних (Повинна бути однакова)
console.log(mongoFront.numberOfAppeals());
console.log(mongoBack.numberOfAppeals());