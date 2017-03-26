import simpleGit from 'simple-git';

let git = simpleGit('../test-repo');

let checkoutAPI = (error, response) => {

	if(error) {
		console.log('Unable to checkout branch develop.api', error);
		console.log('Response', response);
	}else {
		console.log('Checked out branch develop.api');
	}
};

git.checkout('develop.api', checkoutAPI);