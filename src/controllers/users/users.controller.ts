import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '@services/users/users.service';
import { User } from '@schemas/user';
import { UserDto } from '@dto/user-dto';
import { AuthGuard } from '@nestjs/passport';

// import RejectedValue = jest.RejectedValue;

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() data: UserDto): Promise<User> {
    console.log(data);
    return this.userService.checkRegUser(data.login).then((queryRes) => {
      console.log('data reg', queryRes);
      if (!queryRes) {
        return this.userService.createUser(data);
      } else {
        console.log('err - user is exists');
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            errorText: 'user already exist',
          },
          HttpStatus.CONFLICT,
        );
      }
    });
  }

  @UseGuards(AuthGuard('local'))
  @Post(':login')
  authUser(@Body() data: UserDto, @Param('login') login): any {
    return this.userService.login(data);
  }

  @Put(':id')
  updateUsers(@Param('id') id, @Body() data): Promise<User> {
    return this.userService.updateUsers(id, data);
  }

  @Delete()
  deleteUsers(): Promise<User> {
    return this.userService.deleteUsers();
  }

  @Delete(':id')
  deleteUserById(@Param('id') id): Promise<User> {
    return this.userService.deleteUserById(id);
  }
}
