import {Injectable} from '@nestjs/common';
import {User, UserDocument} from "@schemas/user";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import {UserDto} from "@dto/user-dto";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private jwtService: JwtService) {
    }

    /**
     * Получение всех пользователей
     */
    async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    }

    /**
     * Получение пользователя по id
     * @param id
     */
    async getUserById(id): Promise<User> {
        return this.userModel.findById(id);
    }

    /**
     * Создание ползователя
     * @param data
     */
    async createUser(data): Promise<User> {
        const userData = new this.userModel(data);
        return userData.save();
    }

    /**
     * Обновление пользователя
     * @param id
     * @param body
     */
    async updateUsers(id: string, body): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, body);
    }

    /**
     * Удаление всех пользователей
     */
    async deleteUsers(): Promise<User> {
        return this.userModel.remove()
    }

    /**
     * Удаление пользователя по id
     * @param id
     */
    async deleteUserById(id: string): Promise<User> {
        return this.userModel.findByIdAndRemove(id);
    }

    /**
     * Проверка пользователя
     * @param login
     * @param psw
     */
    async  checkAuthUser(login: string, psw: string): Promise<User[]> {
        const users = await this.userModel.find({login: login, password: psw});
        return users.length == 0 ? null : users;
    }

    /**
     * Проверка на существование пользователя
     * @param login
     */
    async checkRegUser(login: string): Promise<User[]> {
        return this.userModel.findOne({login: login});
    }

    /**
     * Авторизация пользователя
     * @param user
     */
    async login(user: UserDto) {

        const userFromDb = await this.userModel.findOne({login: user.login});
        const payload = {login:user.login, id: userFromDb._id};
        return {
            id: userFromDb._id,
            access_token: this.jwtService.sign(payload),
        };
    }


}
