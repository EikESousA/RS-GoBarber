import AppError from '@shared/errors/AppError';

import ShowProfileService from '@modules/users/services/ShowProfileService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		showProfileService = new ShowProfileService(fakeUsersRepository);
	});

	it('should be able to show the profile!', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		const updatedUser = await showProfileService.execute({
			user_id: user.id,
		});

		expect(updatedUser.name).toBe('John Doe');
		expect(updatedUser.email).toBe('johndoe@example.com');
	});

	it('should not be able to show the profile from non-existing-user!', async () => {
		await expect(
			showProfileService.execute({
				user_id: 'non-existing-user-id',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
