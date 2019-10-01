import fetching from "./Fetch";
class API {
  constructor(props) {
    this.key = props;
  }
  getApi = async () => {
    try {
      const url = `http://localhost:${process.env.REACT_APP_PORT}/${this.key}`;
      const answer = await fetching(url);
      return answer;
    } catch (err) {
      return console.log(err);
    }
  };
  addApi = async body => {
    try {
      const url = `http://localhost:${process.env.REACT_APP_PORT}/${this.key}`;
      const answer = await fetching(url, "POST", body);
      return answer;
    } catch (err) {
      return console.log(err);
    }
  };
  deleteApi = async body => {
    try {
      const url = `http://localhost:${process.env.REACT_APP_PORT}/${this.key}`;
      const answer = await fetching(url, "DELETE", body);
      return answer;
    } catch (err) {
      return console.log("error", err);
    }
  };
  updateApi = async body => {
    try {
      const url = `http://localhost:${process.env.REACT_APP_PORT}/${this.key}`;

      const answer = await fetching(url, "PATCH", body);
      return answer;
    } catch (err) {
      return console.log("error", err);
    }
  };
}
export default API;
