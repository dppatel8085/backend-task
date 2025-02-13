import userRepo from './schema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import bookIns from './bookingSchema.js';

class UserService {

    async verifyPassword(dbPassword, userPassword) {
        try {
            const isCorrectPassword = await bcrypt.compare(userPassword, dbPassword);
            return isCorrectPassword;
        } catch (error) {
            throw error
        }
    }

    async generateToken(userData) {
        console.log(userData)
        try {
            const token = await jwt.sign({ role: userData.role }, 'super_secret', { expiresIn: '1 hour', algorithm: 'HS256' })
            return token;
        } catch (error) {
            throw error
        }
    }

    async hashPassword(password) {
        try {
            const hashpassword = await bcrypt.hash(password, 10);
            return hashpassword;
        }
        catch (error) {
            throw error;
        }
    }

    async login(body) {
        try {
            const userData = await userRepo.findOne({ email: body?.email });
            if (userData) {
                const verifyPassword = await this.verifyPassword(userData.password, body?.password);
                if (verifyPassword) {
                    const generateToken = await this.generateToken(userData);
                    let obj = {
                        email: userData?.email,
                        _id: userData?._id,
                        role: userData?.role,
                        name: userData?.name,
                        file: userData?.file,
                        token: generateToken
                    }
                    return obj;

                }
                throw new Error("password not valid")
            }
            throw new Error("email not valid")
        } catch (error) {
            throw error
        }
    }

    async cancelAppointMent(id) {
        try {
            console.log("id",id)
            const userData = await bookIns.findOne({ _id: id })

            if (userData) {
                return await bookIns.findByIdAndDelete(id)
            }
            throw new Error("user not found")
        } catch (error) {
            throw error
        }
    }

    async createUser(body) {
        try {
            const hashPassowrd = await this.hashPassword(body?.password);
            body.password = hashPassowrd;
            const userIns = new userRepo(body);
            return userIns.save();
        } catch (error) {
            throw error
        }
    }

    
    async bookAppointment(body) {
        try {
            const userIns = new bookIns(body);
            return userIns.save();
        } catch (error) {
            throw error
        }
    }

   
    async userdata() {
        try {
            return await bookIns.find();
        } catch (error) {
            throw error;
        }
    }


    
    async userList() {
        try {
            return await userRepo.find();
        } catch (error) {
            throw error;
        }
    }




    async userdataById(id) {
        try {
            return await userRepo.findOne(id);
        } catch (error) {
            throw error;
        }
    }

}

const userIns = new UserService();
export default userIns;

