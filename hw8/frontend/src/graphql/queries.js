import { gql } from '@apollo/client';

export const CHATBOX_QUERY = gql`
  query {
    chatbox {
      name {
        messages {
          sender
          body
        }
      }
    }
  }
`