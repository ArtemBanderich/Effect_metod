class TouristAttraction {
    constructor(name, location, rating) {
      this.name = name;
      this.location = location;
      this.rating = rating;
    }
}

class TouristAttractionsCollection {
    constructor() {
        this.attractions = [];
    }

    addAttraction(attraction) {
        this.attractions.push(attraction);
    }

    getIterator(type) {
        switch (type) {
        case 'own':
            return new OwnIterator(this.attractions);
        case 'navigator':
            return new NavigatorIterator(this.attractions);
        case 'guide':
            return new GuideIterator(this.attractions);
        }
    }
}

class OwnIterator {
    constructor(attractions) {
        this.attractions = attractions;
        this.index = 0;
    }

    hasNext() {
        return this.index < this.attractions.length;
    }

    next() {
        return this.attractions[this.index++];
    }
}

class NavigatorIterator {
    constructor(attractions) {
        this.attractions = attractions.filter(attraction => attraction.rating >= 4);
        this.index = 0;
    }

    hasNext() {
        return this.index < this.attractions.length;
    }

    next() {
        return this.attractions[this.index++];
    }
}

class GuideIterator {
    constructor(attractions) {
        this.attractions = attractions.sort((a, b) => b.rating - a.rating);
        this.index = 0;
    }

    hasNext() {
        return this.index < this.attractions.length;
    }

    next() {
        return this.attractions[this.index++];
    }
}

// Додамо декілька туристичних місць
const touristAttractionsCollection = new TouristAttractionsCollection();
touristAttractionsCollection.addAttraction(new TouristAttraction('Софіївський парк', 'Україна, Київська область, Узинський район', 4.5));
touristAttractionsCollection.addAttraction(new TouristAttraction('Кам’янець-Подільська фортеця', 'Україна, Хмельницька область, м. Кам’янець-Подільський', 4.7));
touristAttractionsCollection.addAttraction(new TouristAttraction('Говерла', 'Україна, Івано-Франківська область, м. Яремче', 4.9));
touristAttractionsCollection.addAttraction(new TouristAttraction('Одеський оперний театр', 'Україна, м. Одеса', 4.3));
touristAttractionsCollection.addAttraction(new TouristAttraction('Києво-Печерська лавра', 'Україна, м. Київ', 4.8));

// Отримаємо доступ до туристичних місць за допомогою різних ітераторів
const ownIterator = touristAttractionsCollection.getIterator('own');
console.log('Туристичні місця за власним розсудом туриста:');
while (ownIterator.hasNext()) {
    const attraction = ownIterator.next();
    console.log(`- ${attraction.name} (${attraction.location}) - ${attraction.rating}`);
}

const navigatorIterator = touristAttractionsCollection.getIterator('navigator');
console.log('Туристичні місця за рекомендаціями навігатора:');
while (navigatorIterator.hasNext()) {
    const attraction = navigatorIterator.next();
    console.log(`- ${attraction.name} (${attraction.location}) - ${attraction.rating}`);
}

const guideIterator = touristAttractionsCollection.getIterator('guide');
console.log('Туристичні місця за допомогою місцевого гіда:');
while (guideIterator.hasNext()) {
    const attraction = guideIterator.next();
    console.log(`- ${attraction.name} (${attraction.location}) - ${attraction.rating}`);
}