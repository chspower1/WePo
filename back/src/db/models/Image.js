import { ImageModel } from "../schemas/Image";

class Image {
  static async getRandomURL(){
    const datas = await ImageModel.find()
    console.log(datas)
    const URLs = (datas[0]).urls
    const randomIndex = Math.floor(Math.random()*(URLs.length-1))
    return URLs[randomIndex]
  }
}
export { Image };