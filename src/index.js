import simpleGit from 'simple-git';

const git = simpleGit('../test-repo');

const checkoutAPI = (error, success) => {

	if(error) {
		console.log('Unable to checkout branch develop.api', error);
		console.log('Response', success);
	}else {
		console.log('Checked out branch develop.api');
	}
};

const pullDevelop = (error, success) => {

	if(error) {
		console.log('Unable to pull develop', error);
	} else {
		console.log('Develop branch pulled successfully');
		console.log(success);
	}
};

const mergeBrances = (error, success) => {

	if(error) {
		console.log('Unable to merge branches', error);
	} else {
		console.log('Branches merged successfully');
		console.log(success);
	}
};

const sendMail = () => {

	console.log('Merge completed');
};

git.checkout('develop.api', checkoutAPI)
	.pull('origin', 'develop', '', pullDevelop)
	.mergeFromTo('develop', 'develop.api', ['--no-ff', '-m "Pulling changed from develop"'], mergeBrances)
	.then(sendMail);