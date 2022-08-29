import { awardService } from "../services/awardService";

function check_authority(req, res, next) {
  try {
    next();
  } catch (error) {

    return;
  }
}

export { check_authority };
