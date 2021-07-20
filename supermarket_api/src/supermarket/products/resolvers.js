import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allProducts: (_) =>
			getRequest(URL, ''),
		    productById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createProduct: (_, { product }) =>
			generalRequest(`${URL}/`, 'POST', product),
		updateProduct: (_, { id, product }) =>
			generalRequest(`${URL}/${id}`, 'PUT', product),
		deleteProduct: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;
