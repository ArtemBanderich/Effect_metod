const consoleElement = document.getElementById("console");

//	Функція для виведення тексту
function log(message) {
	consoleElement.innerHTML += message + "<br>";
	console.log(message);
}

//	Базовий клас для REST API
class RestApi {
	//	Метод для виконання запиту
	makeRequest(request) {
		const object = this.getObjectToUpdate(request);
		if (!this.validateInputData(object)) {
			this.sendNotificationToAdmin();
			return this.createErrorResponse('Validation failed');
		}
		const requestBody = this.buildRequestBody(object);
		const response = this.sendRequestToServer(requestBody);
		if (response.status === 'success') {
			return this.createSuccessResponse();
		} else {
			return this.createErrorResponse(response.message);
		}
	}

	//	Метод, який повинен бути реалізований в похідних класах для отримання об'єкта, який треба оновити
	getObjectToUpdate(request) {
		log('getObjectToUpdate method must be implemented');
	}

	//	Метод, який повинен бути реалізований в похідних класах для валідації вхідних даних
	validateInputData(object) {
		log('validateInputData method must be implemented');
	}

	//	Метод, який повинен бути реалізований в похідних класах для побудови запиту на збереження інформації
	buildRequestBody(object) {
		log('buildRequestBody method must be implemented');
	}

	//	Метод, який повинен бути реалізований в похідних класах для відправки запиту на сервер
	sendRequestToServer(requestBody) {
		log('sendRequestToServer method must be implemented');
	}

	//	Метод для відправлення сповіщення адміністратору
	sendNotificationToAdmin() {
		log('Sending notification to admin');
	}

	//	Метод для створення відповіді з успішним статусом
	createSuccessResponse() {
		return {
			status: 'success',
			code: 200,
			message: 'Request processed successfully'
		};
	}

	//	Метод для створення відповіді з помилкою
	createErrorResponse(message) {
		return {
			status: 'error',
			code: 500,
			message: message
		};
	}
}

//	Клас для обробки оновлення товару
class ProductRestApi extends RestApi {
	getObjectToUpdate(request) {
		//	Отримати товар, який треба оновити
		//	Наприклад, з бази даних або іншого джерела даних
		return request.product;
	}

	validateInputData(product) {
		//	Перевірка вхідних даних товару
		//	Повертає true, якщо дані валідні, інакше - false
		return product.price > 0 && product.quantity > 0;
	}

	buildRequestBody(product) {
		//	Побудувати запит на оновлення товару у форматі, зрозумілому для сервера
		return {
			id: product.id,
			price: product.price,
			quantity: product.quantity
		};
	}

	sendRequestToServer(requestBody) {
		//	Відправити запит на сервер для оновлення товару
		//	Повернути відповідь з сервера у форматі, зрозумілому для додатку
		const response = {
			status: 'success',
			message: 'Product updated successfully'
		};
		return response;
	}
}

//	Клас для обробки оновлення користувача
class UserRestApi extends RestApi {
	getObjectToUpdate(request) {
		//	Отримати користувача, якого треба оновити
		//	Наприклад, з бази даних або іншого джерела даних
		return request.user;
	}

	validateInputData(user) {
		//	Перевірка вхідних даних користувача
		//	Повертає true, якщо дані валідні, інакше - false
		return user.name !== '' && user.email !== '';
	}

	buildRequestBody(user) {
		//	Побудувати запит на оновлення користувача у форматі, зрозумілому для сервера
		return {
			id: user.id,
			name: user.name
		};
	}

	sendRequestToServer(requestBody) {
		//	Відправити запит на сервер для оновлення користувача
		//	Повернути відповідь з сервера у форматі, зрозумілому для додатку
		const response = {
			status: 'success',
			message: 'User updated successfully'
		};
		return response;
	}
}

//	Клас для обробки оновлення замовлення
class OrderRestApi extends RestApi {
	getObjectToUpdate(request) {
		//	Отримати замовлення, яке треба оновити
		//	Наприклад, з бази даних або іншого джерела даних
		return request.order;
	}

	validateInputData(order) {
		//	Перевірка вхідних даних замовлення
		//	Повертає true, якщо дані валідні, інакше - false
		return order.products.length > 0;
	}

	buildRequestBody(order) {
		//	Побудувати запит на оновлення замовлення у форматі, зрозумілому для сервера
		return {
			id: order.id,
			products: order.products
		};
	}

	sendRequestToServer(requestBody) {
		//	Відправити запит на сервер для оновлення замовлення
		//	Повернути відповідь з сервера у форматі, зрозумілому для додатку
		const response = {
			status: 'success',
			message: 'Order updated successfully',
			order: requestBody //	Повернути оновлене замовлення
		};
		return response;
	}
}

//	Використання класів для оновлення різних сутностей через REST API

//	Оновлення товару
function runCode() {
	//	Створення об'єктів для тестування
	const product = {
		id: 1,
		price: 10,
		quantity: 20
	};

	const user = {
		id: 1,
		name: 'John Doe',
		email: 'john@example.com'
	};

	const order = {
		id: 1,
		products: [product]
	};

	//	Тестування ProductRestApi
	log("Тестування ProductRestApi");
	const productRestApi = new ProductRestApi();
	const productUpdateRequest = {
		product: product
	};
	const productUpdateResult = productRestApi.makeRequest(productUpdateRequest);
	console.log(productUpdateResult);
	log(JSON.stringify(productUpdateResult));

	//	Тестування UserRestApi
	log("Тестування UserRestApi");
	const userRestApi = new UserRestApi();
	const userUpdateRequest = {
		user: user
	};
	const userUpdateResult = userRestApi.makeRequest(userUpdateRequest);
	console.log(userUpdateResult);
	log(JSON.stringify(userUpdateResult));

	//	Тестування OrderRestApi
	log("Тестування OrderRestApi");
	const orderRestApi = new OrderRestApi();
	const orderUpdateRequest = {
		order: order
	};
	const orderUpdateResult = orderRestApi.makeRequest(orderUpdateRequest);
	console.log(orderUpdateResult);
	log(JSON.stringify(orderUpdateResult));
}