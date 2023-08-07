import { gql } from '@apollo/client';


export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!, $patient: Boolean, $doctor: Boolean) {
  addUser(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName, patient: $patient, doctor: $doctor) {
    token
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

export const UPDATE_USER = gql`
  mutation updateUser($_id: ID!, $input: UpdateUserInput!) {
    updateUser(_id: $_id, input: $input) {
      _id
      username
      email
      firstName
      lastName
      doctor
      patient
    }
  }
`;

export const ADD_MESSAGE = gql`
mutation addMessage($messageData: MessageInput) {
  message(messageData: $messageData) {
    _id
    email
    firstName
    lastName
    phonenumber
    patient {
      _id
    }
    message
  }
}
`;


export const ADD_BILL = gql`
  mutation addBill($amount: Float!, $description: String!) {
    addBill(input: { amount: $amount, description: $description }) {
      _id
      amount
      description
      createdAt
      updatedAt
    }
  }
`;


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
        doctor
        patient
        username
      }
    }
  }
`;

export const SEND_EMAIL_MUTATION = gql`
  mutation SendEmail($emailInput: EmailInput!) {
    sendEmail(emailInput: $emailInput) {
      id
      subject
      sender
      recipients
      body
      timestamp
      status
    }
  }
`;

export const ADD_CHAT_MESSAGE = gql`
  mutation addChatMessage($message: ChatMessageInput) {
    addMessage(message: $message) {
      id
      text
    }
  }
`;


// export const UPDATE_EMAIL_MUTATION = gql`
//   mutation UpdateEmail($id: ID!, $emailInput: EmailInput!) {
//     updateEmail(id: $id, emailInput: $emailInput) {
//       id
//       subject
//       sender
//       recipients
//       body
//       timestamp
//       status
//     }
//   }
// `;

// export const DELETE_EMAIL_MUTATION = gql`
//   mutation DeleteEmail($id: ID!) {
//     deleteEmail(id: $id) {
//       id
//       subject
//       sender
//       recipients
//       body
//       timestamp
//       status
//     }
//   }
// `;
export const ADD_APPOINTMENT = gql`
  mutation AddAppointment(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $appointmentDate: String!
    $appointmentTime: String!
  ) {
    addAppointment(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      appointmentDate: $appointmentDate
      appointmentTime: $appointmentTime
    ) {
      id
      firstName
      lastName
      email
      phone
      appointmentDate
      appointmentTime
    }
  }
`;

