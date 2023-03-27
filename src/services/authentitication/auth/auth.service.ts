import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {UsersService} from "@services/users/users.service";

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({usernameField: 'login', passwordField: 'password'});
  }

  async validate(login:string, password: string): Promise<any> {
    const user = await this.userService.checkAuthUser(login, password);
    if (!user) {
        throw new HttpException({
            status: HttpStatus.CONFLICT,
            errorText: "user not found"
        }, HttpStatus.CONFLICT);
    }
    return true;
  }
}
