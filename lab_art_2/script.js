class Mediator {
	constructor() {
		//	Записуємо посилання на елементи DOM
		this.deliveryDate = document.getElementById('delivery-date');
		this.deliveryTime = document.getElementById('delivery-time');
		this.recipientCheckbox = document.getElementById('recipient-checkbox');
		this.recipientDetails = document.getElementById('recipient-details');
		this.recipientName = document.getElementById('recipient-name');
		this.recipientPhone = document.getElementById('recipient-phone');
		this.selfPickupCheckbox = document.getElementById('self-pickup-checkbox');

		//	Встановлюємо обробники подій для елементів DOM
		this.deliveryDate.addEventListener('change', this.onDeliveryDateChange.bind(this));
		this.recipientCheckbox.addEventListener('change', this.onRecipientCheckboxChange.bind(this));
		this.selfPickupCheckbox.addEventListener('change', this.onSelfPickupCheckboxChange.bind(this));
	}

	onDeliveryDateChange() {
		//	Отримуємо обрану дату доставки
		const selectedDate = this.deliveryDate.value;

		//	Змінюємо список доступних проміжків часу в залежності від обраної дати
		if (selectedDate === '2023-05-13') {
			this.populateDeliveryTime(['10:00', '14:00', '18:00']);
		} else if (selectedDate === '2023-05-14') {
			this.populateDeliveryTime(['9:00', '13:00', '16:00']);
		} else {
			this.populateDeliveryTime(['8:00', '11:00', '14:00']);
		}
	}

	populateDeliveryTime(options) {
		//	Очищуємо поточні елементи у списку
		while (this.deliveryTime.firstChild) {
			this.deliveryTime.removeChild(this.deliveryTime.firstChild);
		}

		//	Додаємо нові елементи у список
		for (const option of options) {
			const optionElement = document.createElement('option');
			optionElement.textContent = option;
			this.deliveryTime.appendChild(optionElement);
		}
	}

	onRecipientCheckboxChange() {
		if (this.recipientCheckbox.checked) {
			//	Показуємо деталі отримувача
			this.recipientDetails.style.display = 'block';
			this.recipientName.required = true;
			this.recipientPhone.required = true;
		} else {
			//	Ховаємо деталі отримувача
			this.recipientDetails.style.display = 'none';
			this.recipientName.required = false;
			this.recipientPhone.required = false;
		}
	}

	onSelfPickupCheckboxChange() {
		if (this.selfPickupCheckbox.checked) {
			//	Деактивуємо всі елементи форми, які відповідають за надання інформації про доставку
			this.deliveryDate.disabled = true;
			this.deliveryTime.disabled = true;
			this.recipientCheckbox.disabled = true;
			this.recipientName.disabled = true;
			this.recipientPhone.disabled = true;
		} else {
			//	Активуємо всі елементи форми, які відповідаують за надання інформації про доставку
			this.deliveryDate.disabled = false;
			this.deliveryTime.disabled = false;
			this.recipientCheckbox.disabled = false;
			this.recipientName.disabled = false;
			this.recipientPhone.disabled = false;
		}
	}
}

//	Створюємо екземпляр класу Mediator
const mediator = new Mediator();