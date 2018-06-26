import axios from 'axios';
import Config from './../config.json';
import Base64 from './base64';

Post.defaults = {
  urlData: [],
  data: {},
  command: (data) => {
    console.log("POST - DEFAULT COMMAND",data);
    return(data);
  },
  error: (error) => {
    return(error);
  }
};

Post.urlData = Post.defaults.urlData;
Post.data = Post.defaults.data;
Post.command = Post.defaults.command;
Post.error = Post.defaults.error;

Post.resetDefaults = () => {
  console.log("LIB AXIOS - RESETING DEFAULTS");
  Post.data = Post.defaults.data;
  Post.urlData = Post.defaults.urlData;
  Post.command = Post.defaults.command;
  Post.error = Post.defaults.error;
  console.log("LIB AXIOS - DEFAULTS RESETED");
};

export function Post(route, postInfo = {
    urlData: Post.defaults.urlData,
    data: Post.defaults.data,
    command: Post.defaults.command,
    error: Post.defaults.error
  }) {

  if(route === undefined) {
    console.log("LIB AXIOS - ROUTE MISSING!");
    return(null);
  }

  Object.keys(postInfo).map(
    (key) => {
      console.log("LIB AXIOS - MAPPING",key);
      const test = Post[key] === Post.defaults[key]
                && postInfo[key] !== Post.defaults[key]
                && postInfo[key] !== undefined;
      Post[key] = test ? postInfo[key] : Post[key];
      console.log("LIB AXIOS - MAPPED: ",Post[key]);
      return(null);
    }
  );

  let urlComplement = "";

  Post.urlData.map(
    (urlItem) => {
      urlComplement = urlComplement+urlItem+"/";
      return(null);
    }
  );

  const URL = Config.rest.routes[route]+urlComplement;

  axios.defaults.baseURL = Config.rest[Config.rest.environment];
  axios.post(
    URL,
    "data="+Base64.encode(Post.data)
  )
  .then(
    function(response) {
      if(response.request.status === 200) {
        console.log("LIB AXIOS - THEN OK:",response);
        Post.command(response.data);
        Post.resetDefaults();
      } else {
        console.log("LIB AXIOS - THEN FAIL:",response);
        return(null);
      }
    }
  )
  .catch(
    function(error) {
      console.log("LIB AXIOS - CATCH:",error);
      Post.error(error);
      Post.resetDefaults();
    }
  );
}

export default Post;
