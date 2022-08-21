import * as PlayerActionCreators from "../actions-creators/player";
import * as TrackActionCreators from "../actions-creators/track";

export default {
  ...PlayerActionCreators,
  ...TrackActionCreators,
};
