import AppError from '@shared/errors/AppError';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
	it('should be able to authenticate!', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const createUserService = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const authenticateUserService = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const user = await createUserService.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		const response = await authenticateUserService.execute({
			email: 'johndoe@example.com',
			password: '123456',
		});

		expect(response).toHaveProperty('token');
		expect(response.user).toEqual(user);
	});

	it('should not be able to authnticate with non existing user!', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const authenticateUserService = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		await expect(
			authenticateUserService.execute({
				email: 'johndoe@example.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to authenticate with wrong password!', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const createUserService = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const authenticateUserService = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		await createUserService.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		await expect(
			authenticateUserService.execute({
				email: 'johndoe@example.com',
				password: '123457',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
