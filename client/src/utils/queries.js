import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
  query allUsers {
    users {
      _id
      doctor
      email
      firstName
      lastName
      patient
      username
    }
  }
`;

export const QUERY_PROFILE_USER = gql`
  query getUserProfile {
    query getUserProfile {
    user {
      _id
      username
      email
      firstName
      lastName
      patient
      doctor
    }
  }
  }
`;


export const MESSAGES = gql`
  query Messages {
    messages {
      _id
      email
      firstName
      lastName
      phonenumber
      patient {
        _id
        username
        email
        firstName
        lastName
        patient
        username
        }
        message
      }
    }
  `;



export const CHANNEL_DETAILS = gql`
  query ChannelDetailsQuery($channelId: ID!) {
    channel(id: $channelId) {
      id
      name
      messages {
        id
        username
        text
      }
    }
  }
`;

export const GET_EMAILS_QUERY = gql`
  query getAllEmails($inbox: Boolean!) {
  getAllEmails(inbox: $inbox) {
    id
    subject
    sender
    recipients
    body
    timestamp
    status
    user {
      patient
      doctor
    }
  }
}
`;
const GET_SENT_EMAILS_QUERY = gql`
  query getSentEmails {
    getSentEmails {
      id
      subject
      sender
      recipients
      body
      timestamp
      status
      user {
        patient
        doctor
      }
      message
    }
  }
`;

export const GET_RECEIVED_EMAILS_QUERY = gql`
  query getReceivedEmails {
    getReceivedEmails {
      id
      subject
      sender
      recipients
      body
      timestamp
      status
      user {
        patient
        doctor
      }
    }
  }
  `
;

