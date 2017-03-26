import simpleGit from 'simple-git';

const git = simpleGit('../test-repo');

const checkoutDevelop = (error, success) => {

	if(error) {
		console.log('Unable to checkout develop branch', error);		
	} else {
		console.log('Checked out develop branch');
	}
};

const checkoutAPI = (error, success) => {

	if(error) {
		console.log('Unable to checkout develop.api branch', error);
	}else {
		console.log('Checked out develop.api branch');
	}
};

const pullDevelop = (error, success) => {

	if(error) {
		console.log('Unable to pull develop branch', error);
	} else {
		console.log('Develop branch pulled successfully');
		console.log(success);
	}
};

const pullAPI = (error, success) => {

	if(error) {
		console.log('Unable to pull develop.api branch', error);
	} else {
		console.log('Develop.api branch pulled successfully');
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

const pushAPI = (error, success) => {

	if(error) {
		console.log('Unable to push develop.api', error);
	} else {
		console.log('API branch pushed successfully');
		console.log(success);
	}
}

const sendMail = () => {
	console.log('Merge completed');
};

git.checkout('develop', checkoutDevelop)
	.pull('origin', 'develop', {}, pullDevelop)
	.checkout('develop.api', checkoutAPI)
	.pull('origin', 'develop.api', {}, pullAPI)
	.mergeFromTo('develop', 'develop.api', ['--no-ff', '-m "Pulling changed from develop"'], mergeBrances)
	.push('origin', 'develop.api', pushAPI)
	.then(sendMail);