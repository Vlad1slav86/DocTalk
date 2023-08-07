const { AuthenticationError } = require('apollo-server-express');
// const { User, Message, Email } = require('../models');
const { signToken } = require('../utils/auth');
const User = require('../models/User');
const Message = require('../models/Message');
const Email = require('../models/Email');

const emails = [
  {
    id: '1',
    subject: 'Sample Email 1',
    sender: 'sender@example.com',
    recipients: ['recipient1@example.com', 'recipient2@example.com'],
    body: 'This is the content of the email.',
    timestamp: '2023-08-04T12:00:00.000Z',
    status: 'received',
    user: {
      patient: null,
      doctor: null,
    },
  },
  {
    id: '2',
    subject: 'Sample Email 2',
    sender: 'sender@example.com',
    recipients: ['recipient3@example.com'],
    body: 'This is another email.',
    timestamp: '2023-08-05T09:30:00.000Z',
    status: 'received',
    user: {
      patient: null,
      doctor: null,
    },
  },
  // Add more email objects as needed
];
const resolvers = {
  Query: {
    users: async () => {
      try {
        const allUsers = await User.find();
        return allUsers;
      } catch (error) {
        // Handle any errors here
        throw new Error('Error fetching all users');
      }
    },
    loggedInUser: async (_, __, { user }) => {
      if (!user) {
        throw new Error("Authentication required.");
      }

      
      try {
        const userProfile = await User.findOne({ email: user.email });
        return userProfile;
      } catch (error) {
        console.log(error);
        throw new Error('Error fetching user profile');
      }
    },

    messages: async (parent, args, context) => {
      if (context.user.doctor) {
        return await Message.find({}).populate('patient');
      } else {
        throw new AuthenticationError('You must be a doctor!');
      }
    },

    getAllEmails: async (parent, { inbox }, context) => {
      try {
        const query = inbox
          ? { recipients: { $elemMatch: { $eq: context.user.email } } }
          : { sender: context.user.email };

        const emails = await Email.find(query);
        return emails;
      } catch (error) {
        console.log(error);
        throw new Error('Error fetching emails');
      }
    },

    getOneEmail: async (parent, { id }) => {
      try {
        const email = await Email.findById(id);
        return email;
      } catch (error) {
        console.log(error);
        throw new Error('Error fetching email by id');
      }
    },

    getSentEmails: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to view sent emails');
      }

      try {
        const sentEmails = await Email.find({ sender: context.user.email });
        return sentEmails;
      } catch (error) {
        console.log(error);
        throw new Error('Error fetching sent emails');
      }
    },
    getReceivedEmails: async () => {
      console.log('Fetching received emails...');
    
      try {
        const receivedEmails = await Email.find({ recipientStatus: 'received' });
        console.log('Received emails:', receivedEmails);
        return receivedEmails;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch received emails');
      }
    },
    

  },
  Mutation: {
    addUser: async (parent, { username, email, password, firstName, lastName, patient, doctor }) => {
      const user = await User.create({
        username,
        firstName,
        lastName,
        email,
        password,
        patient,
        doctor,
      });

      const token = signToken(user);

      return { token, user };
    },

    message: async (parent, {messageData}, context) => {
      if (context.user) {
        const message = await Message.create({...messageData, patient:context.user._id})
        return message
      } 
        throw new AuthenticationError('You must be logged in!');
    },

    updateUser: async (parent, { _id, input }) => {
      try {
        const user = await User.findById(_id);
        if (!user) {
          throw new Error('User not found');
        }

        if (input.firstName) user.firstName = input.firstName;
        if (input.lastName) user.lastName = input.lastName;
        if (input.username) user.username = input.username;
        if (input.email) user.email = input.email;
        if (input.password) user.password = input.password;
        if (input.patient !== undefined) user.patient = input.patient;
        if (input.doctor !== undefined) user.doctor = input.doctor;

        await user.save();
        return user;
      } catch (error) {
        throw new Error('Error updating user');
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    sendEmail: async (parent, { emailInput }, context) => {
      // Check if the sender is logged in (assuming you have a user property in the context)
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to send an email');
      }
    
      // Set sender as the logged-in user's email
      const sender = context.user.email;
    
      // Check if the required fields are provided in the emailInput object
      const { subject, recipients, body } = emailInput;
      if (!subject || !recipients || !body) {
        throw new Error('Subject, recipients, and body are required fields');
      }
    
      // Set status as "sent" for the logged-in user and "received" for the recipient
      const status = 'sent';
      const recipientStatus = 'received';
    
      const email = new Email({
        subject,
        sender,
        recipients,
        body,
        timestamp: new Date().toISOString(),
        status,
        user: context.user._id,
        recipientStatus,
      });
    
      try {
        const savedEmail = await email.save();
    
        // Update sender's sentEmails
        const user = await User.findById(context.user._id);
        if (!user) {
          throw new Error('User not found');
        }
        
        if (!user.sentEmails) {
          user.sentEmails = [];
        }
        user.sentEmails.push(savedEmail._id);
        await user.save();
    
        // Update recipient's inbox if the recipient user exists
        const recipientUser = await User.findOne({ email: recipients[0] });
        if (recipientUser) {
          if (!recipientUser.receivedEmails) {
            recipientUser.receivedEmails = [];
          }
          recipientUser.receivedEmails.push(savedEmail._id);
          await recipientUser.save();
        } else {
          // Handle the case when the recipient user does not exist
          throw new Error('Recipient email is not valid');
        }
    
        return savedEmail;
      } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
      }
    },
    
    
    
    
    
    
    addMessage: async (parent, {message}) => {
        const channel = channels.find(ch => ch.id === message.channelId)
        if (!channel)
        throw new Error("Channel does not exist")
        
        const newMessage = {id: String(nextMessageId++), text: message.text}
        channel.messages.push(newMessage)
        return newMessage;
      }

  },
};

module.exports = resolvers;