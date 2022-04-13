const { AuthenticationError } = require('apollo-server-express');
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne(
                    { _id: context.user._id }).select('-__v-password');

                return userData;
            }
            throw new AuthenticationError("user not logged in")
        }

    },

    Mutation: {
        addUser: async (parent, args, context) => {
            const user = await User.create(args);

            if (!user) {
                throw new AuthentiactionError("user not logged in")
            }
            const token = signToken(user);
            return { token, user };
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
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true }
                );


                return saveBook;
            }
            throw new AuthenticationError('You need to be logged in!');

        },
         removeBook: async (parent, { bookId }, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );
            if (!updatedUser) {
                throw new AuthenticationError('Cannot find the user');
            }
            return updatedUser;
        }
    }

   

};





module.exports = resolvers;
