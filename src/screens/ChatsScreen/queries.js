export const GetUserChatRooms = `
query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatRooms {
        items {
          chatRoom {
            id
            updatedAt
            LastMessage {
              id
              text
              createdAt
            }
            users {
              items {
                user {
                  id
                  image
                  name
                }
              }
            }
          }
        }
      }
    }
  }
  
`;
