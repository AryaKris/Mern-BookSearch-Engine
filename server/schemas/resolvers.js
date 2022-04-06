const {AuthenticationError} = require('apollo-server-express');
const{ User} = require ("../models");
const {signToken} = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne(
                    { _id: context.user. _id}).select('-__v-password');

                    return userData;
            }
            throw new AuthenticationError("user not logged in")
        }
        
    },

    Mutation: {
        async createUser(parent,args,context) {
            const user = await User.create(args);

            if (!user) {
                throw new AuthentiactionError("user not logged in") 
            }
            const token = signToken(user);
           return { token, user };
        },  

    }

};





module.exports = resolvers;
