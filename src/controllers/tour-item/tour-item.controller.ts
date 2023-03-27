import {Body, Controller, Get, Param, Post, UseGuards, UseInterceptors, Query} from '@nestjs/common';
import {ToursService} from "@services/tours/tours.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {ITour} from "@interfaces/tour";
import {JwtAuthGuardService} from "@services/authentitication/jwt-auth.guard/jwt-auth.guard.service";

@Controller('tour-item')
export class TourItemController {
    constructor(private toursService: ToursService) {
    }

    static imgName: string;

    @UseGuards(JwtAuthGuardService)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './public/images/',
                filename: (req, file, cb) => {
                    const imgType = file.mimetype.split('/');
                    const uniqSuffix = Date.now() + Math.round(Math.random() * 1e9);
                    const imgName = `${file.fieldname}-${uniqSuffix}.${imgType[1]}`;
                    cb(null, imgName);
                    TourItemController.imgName = imgName;
                }
            })
        })
    )

    @Post()
    async createTour(@Body() body: ITour) {
        body.img = TourItemController.imgName;
        const res = this.toursService.createTour(body);
        TourItemController.imgName = null;
        return res;
    }

    @UseGuards(JwtAuthGuardService)
    @Get()
    searchToursByName(@Query('name') name: string) {
        return this.toursService.searchToursByName(name);
    }
}
