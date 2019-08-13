import { combineReducers } from "redux";
import game from "./game";
import config from "./config";
import pieces from "./pieces";

export default combineReducers({ game, config, pieces });
