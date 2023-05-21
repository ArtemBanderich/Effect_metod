// Клас для перекодування відео у інший формат та завантаження його на ютюб
class Transcoding{
    constructor(){
        this.myVideo;
    }
    // Метод завантаження відео
    loading(video){
        this.myVideo = video;
        console.log("Завантаження " + this.myVideo);
    }

    // Перекудання відео у формат mp4
    transcoding(){
        console.log("Кодування")
        let trueFormat = "mp4";
        this.myVideo = this.myVideo.replace(/\.[^.]+$/, "." + trueFormat);
        console.log(this.myVideo);
    }
    // Завантаження на Ютюб
    uploaded(){
        console.log("Завантаження на сайт");
    }
    // Завантаження ключа для API
    useKey(key){
        console.log("Підключення API YouTube");
        console.log("Використання ключа " + key);
    }
}

// Клас фасаду для завантаження відео
class FacadeForYouTube {
    constructor(transcod){
        this.transcod = transcod;
    }
    // Метод ля завантаження через свої методи
    uploadedYouTube(myVideo){
        this.transcod.loading(myVideo);
        this.transcod.transcoding();
        this.transcod.uploaded();
    }
    // Метод для завантаження через API
    YouTubeAPI(myVideo, key){
        this.transcod.loading(myVideo);
        this.transcod.useKey(key);
        this.transcod.transcoding();
        this.transcod.uploaded();
    }

}
// Створення змінної для використання фасаду
let myChannel = new FacadeForYouTube(new Transcoding());
// Використання двух методів завантаження відео
myChannel.uploadedYouTube("My Video.avi");
myChannel.YouTubeAPI("My Video.avi", "1235jhg1j55gol13");