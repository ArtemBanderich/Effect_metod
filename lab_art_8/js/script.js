// Будівельник SQL-запитів
class SQLBuilder {
    // Конструктор містить таблицю, колонки, умову та 
    constructor() {
        this.fromTable = '';
        this.columns = [];
        this.сonditions = [];
        this.limitQuery = 0;
    }
  
    // Вказуємо таблицю
    from(table) {
        this.fromTable = table;
        return this;
    }
  
    // Вибираємо колонки з вказаної таблиці
    select(...columns) {
        this.columns = columns;
        return this;
    }
  
    // Додає умову
    where(condition) {
        this.сonditions.push(condition);
        return this;
    }
  
    // Встановлює ліміту записів
    limit(count) {
        this.limitQuery = count;
        return this;
    }
  
    // Повертає сформований SQL-запит
    getSQL() {
        let query = `SELECT ${this.columns.join(', ')} FROM ${this.fromTable}`;
    
        if (this.сonditions.length > 0) {
            query += ` WHERE ${this.сonditions.join(' AND ')}`;
        }
    
        if (this.limitQuery > 0) {
            query += ` LIMIT ${this.limitQuery}`;
        }
    
        return query;
    }
}
  
  // Клас будівельника SQL-запитів для PostgreSQL
class PostgreSQLBuilder extends SQLBuilder {
    constructor() {
        super();
    }
}

// Клас будівельника SQL-запитів для MySQL
class MySQLBuilder extends SQLBuilder {
    constructor() {
        super();
    }
}
  
// Створення змінних для будування запитів
let postgresBuilder = new PostgreSQLBuilder();
let mysqlBuilder = new MySQLBuilder();
  
// Створення запиту PostgreSQL
let postgresQuery = postgresBuilder
    .from('Players')
    .select('id', 'nickname', 'status')
    .where('rank > 18')
    .limit(10)
    .getSQL();
console.log('Запит до PostgreSQL ', postgresQuery);

// Створення запиту MySQL
const mysqlQuery = mysqlBuilder
    .from('Players')
    .select('id', 'nickname', 'status')
    .getSQL();
console.log('Запит до MySQL ', mysqlQuery);