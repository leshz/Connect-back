import { queries } from "./queries";
import { mutations } from "./mutations";
import { types } from './types';

export const resolvers = {
    Query: queries,
    Mutation: mutations,...types
};
