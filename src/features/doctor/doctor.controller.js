import ErrorHandler from "../../utils/errorHandler.js";
import DoctorRepository from "./doctor.repository.js";

export default class DoctorController {
  constructor() {
    this.doctorRepository = new DoctorRepository();
  }

  // Create new doctor profile
  async registerDoctor(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw new ErrorHandler(401, "username and password is required.");
      }

      const doctor = await this.doctorRepository.register(req.body);
      res.status(201).json({ success: true, res: doctor });
    } catch (error) {
      next(error);
    }
  }

  // login doctor
  async loginDoctor(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw new ErrorHandler(401, "username and password is required.");
      }

      const jwtToken = await this.doctorRepository.login(username, password);

      const cookieOptions = {
        expries: new Date(
          Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };

      res
        .status(200)
        .cookie("token", jwtToken, cookieOptions)
        .json({ success: true, token: jwtToken });
    } catch (error) {
      next(error);
    }
  }

  // Logout
  async logoutDoctor(req, res, next) {
    try {
      res
        .status(200)
        .cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        })
        .json({ success: true, msg: "logout successful" });
    } catch (error) {
      return next(new ErrorHandler(500, "Error while logout"));
    }
  }
}
