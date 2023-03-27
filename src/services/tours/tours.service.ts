import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Tour, TourDocument} from "@schemas/tour";
import {Model} from "mongoose";
import {ITour} from "@interfaces/tour";
import {TourDto} from "@dto/tour-dto";

@Injectable()
export class ToursService {
    private toursCount = 10;

    constructor(@InjectModel('Tour') private tourModel: Model<TourDocument>) {

    }

    async generateTours() {
        for (let i = 0; i < this.toursCount; i++) {
            const t: ITour = {
                name: `Tour`,
                description: `Description`,
                tourOperator: `Emerald Waterways`,
                price: `â‚¬2,192`,
                img: `ocean.jpg`,
                type: `multi`,
                date: `2022-10-22`,
            };
            const tour = new TourDto(t)
            const tourData = new this.tourModel(tour);
            await tourData.save();
        }
    }

    async createTour(t: ITour): Promise<Tour> {
        const tour = new TourDto(t)
        const tourData = new this.tourModel(tour);
        return tourData.save();
    }

    async getTourById(id): Promise<ITour> {
        return this.tourModel.findById(id);
    }

    async getAllTours(): Promise<ITour[]> {
        // this.generateTours();
        return this.tourModel.find();
    }

    async removeAllTours(): Promise<ITour[]> {
        return this.tourModel.remove();
    }

    async searchToursByName(name: string): Promise<ITour[]> {
        console.log('try to find tour by name: ' + name);
        if (!name || name === '') {
            return this.tourModel.find();
        }
        return this.tourModel.find({name: {'$regex': name, '$options' : 'i'}});
    }
}
