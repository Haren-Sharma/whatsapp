import { API, graphqlOperation } from "aws-amplify";
export const getCommonChatRoom = async (userId1, userId2) => {
  //get all chat rooms of user1 and check for user2 id
  console.log({ userId1, userId2 });
  const chats = await API.graphql(
    graphqlOperation(GetUserChatRooms, { id: userId1 })
  );
  let chatRoomId=null;
  chats.data?.getUser?.ChatRooms?.items?.forEach((i)=>{
    const users=i?.chatRoom?.users?.items;
    users?.forEach((user)=>{
      if(user.user.id===userId2){
        chatRoomId=i.chatRoom?.id;
      }
    })
  });
  //remove chat rooms with more than 2 users
  //get the common chat room
  return chatRoomId
};
const GetUserChatRooms = `
query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatRooms {
        items {
          chatRoom {
            id
            users {
              items {
                user {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
  
`;
