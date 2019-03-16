import axios from "axios";

export const getNote = async () => {
  try {
    const response = await axios.get(
      "https://b9cz6cyn7h.execute-api.ap-southeast-1.amazonaws.com/dev/note"
    );
    return response.data.body.Item.content.S;
  } catch (err) {
    console.log(err);
  }
};

export const postNote = content => {
  return axios.post(
    "https://b9cz6cyn7h.execute-api.ap-southeast-1.amazonaws.com/dev/note",
    {
      content: content
    }
  );
};
