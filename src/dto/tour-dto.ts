import {ITour} from "@interfaces/tour";

export class TourDto implements ITour {
    name: string;
    description: string;
    tourOperator: string;
    price: string;
    img: string;
    id: string;
    // _id?: string;
    type: string;
    date: string;

    constructor(tour: ITour) {
        this.name = tour.name;
        this.description = tour.description;
        this.tourOperator = tour.tourOperator;
        this.price = tour.price;
        this.img = tour.img;
        this.id = tour._id;
        this.type = tour.type;
        this.date = tour.date;
    };
}
