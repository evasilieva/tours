import {Body, Controller, Delete, Get, Param, Post, Request, UseGuards} from '@nestjs/common';
import {ToursService} from "@services/tours/tours.service";
import {JwtAuthGuardService} from "@services/authentitication/jwt-auth.guard/jwt-auth.guard.service";
import {TourDto} from "@dto/tour-dto";

@Controller('tours')
export class ToursController {
    constructor(private toursService: ToursService) {
    }

    @UseGuards(JwtAuthGuardService)
    @Post()
    generateTours(@Body() data: TourDto) {
        return this.toursService.generateTours();
    }

    @UseGuards(JwtAuthGuardService)
    @Get()
    getAllTours(@Request() req) {
        // console.log(req.user);
        return this.toursService.getAllTours();
    }

    @UseGuards(JwtAuthGuardService)
    @Get(":id")
    getTourById(@Param('id') id) {
        return this.toursService.getTourById(id);
    }

    @UseGuards(JwtAuthGuardService)
    @Delete(':remove')
    removeAllTours(@Param('remove') remove) {
        return this.toursService.removeAllTours();
    }

}
