import gql from "graphql-tag";

export const REMOVE_USER = gql`
  mutation($id: String!) {
    removeUser(name: $id) {
      id
      name
    }
  }
`;
