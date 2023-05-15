//	Клас, що представляє налаштування користувача
class UserSettings {
	constructor() {
		this.emailNotifications = false;
		this.smsNotifications = false;
	}
}

//	Клас, що представляє знімок стану налаштувань користувача
class SettingsSnapshot {
	constructor(settings) {
		this.emailNotifications = settings.emailNotifications;
		this.smsNotifications = settings.smsNotifications;
	}
}

//	Клас, що відповідає за збереження та відтворення знімків стану налаштувань
class SettingsCareTaker {
	constructor() {
		this.snapshots = [];
	}

	addSnapshot(snapshot) {
		this.snapshots.push(snapshot);
	}

	getSnapshot(index) {
		return this.snapshots[index];
	}
}

const notificationSettings = document.getElementById('notificationSettings');
const emailCheckbox = document.getElementById('emailNotifications');
const smsCheckbox = document.getElementById('smsNotifications');
const applyButton = document.querySelector('button[onclick="applySettings()"]');
const cancelButton = document.querySelector('button[onclick="cancelSettings()"]');

const userSettings = new UserSettings();
const settingsCareTaker = new SettingsCareTaker();

//	Застосувати налаштування
function applySettings() {
	const snapshot = new SettingsSnapshot(userSettings);
	settingsCareTaker.addSnapshot(snapshot);

	//	Збереження обраних налаштувань
	userSettings.emailNotifications = emailCheckbox.checked;
	userSettings.smsNotifications = smsCheckbox.checked;

	cancelButton.disabled = false;
}

//	Відмінити налаштування
function cancelSettings() {
	if (settingsCareTaker.snapshots.length > 0) {
		const lastSnapshot = settingsCareTaker.getSnapshot(settingsCareTaker.snapshots.length - 1);
		//	Відтворення попереднього стану налаштувань
		userSettings.emailNotifications = lastSnapshot.emailNotifications;
		userSettings.smsNotifications = lastSnapshot.smsNotifications;
		//	Оновлення стану інтерфейсу
		emailCheckbox.checked = userSettings.emailNotifications;
		smsCheckbox.checked = userSettings.smsNotifications;
		//	Видалення останнього знімка
		settingsCareTaker.snapshots.pop();

		//	Вимкнення кнопки "Відмінити", якщо більше немає знімків
		if (settingsCareTaker.snapshots.length === 0) {
			cancelButton.disabled = true;
		}
	}
}