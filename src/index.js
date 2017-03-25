import simpleGit from 'simple-git';

let git = simpleGit('../test-repo');

let checkoutAPI = (error, response) => {

	if(error) {
		console.log('Error checking out branch', error);
		console.log('Response', response);
	}else {
		console.log('Success response', response);
	}
};

git().checkout('develop.api', checkoutAPI);