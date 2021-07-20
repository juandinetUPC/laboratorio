import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allProviders: (_) =>
			getRequest(URL, ''),
		    providerById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createProvider: (_, { provider }) =>
			generalRequest(`${URL}/`, 'POST', provider),
		updateProvider: (_, { id, provider }) =>
			generalRequest(`${URL}/${id}`, 'PUT', provider),
		deleteProvider: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;
