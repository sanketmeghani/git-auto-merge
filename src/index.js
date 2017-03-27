import simpleGit from 'simple-git';

const git = simpleGit('../test-repo');

const sourceBranch = process.env.source;
const targetBranch = process.env.target;

const checkoutSourceBranch = (error, success) => {

	if(error) {
		console.log(`Unable to checkout ${sourceBranch} branch`, error);		
	} else {
		console.log(`Checked out ${sourceBranch} branch`);
	}
};

const checkoutTargetBranch = (error, success) => {

	if(error) {
		console.log(`Unable to checkout ${targetBranch} branch`, error);
	}else {
		console.log(`Checked out ${targetBranch} branch`);
	}
};

const pullSourceBranch = (error, success) => {

	if(error) {
		console.log(`Unable to pull ${sourceBranch} branch`, error);
	} else {
		console.log('Source branch pulled successfully');
		console.log(success);
	}
};

const pullTargetBranch = (error, success) => {

	if(error) {
		console.log(`Unable to pull ${targetBranch} branch`, error);
	} else {
		console.log('Target branch pulled successfully');
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

const pushTargetBranch = (error, success) => {

	if(error) {
		console.log(`Unable to push ${targetBranch}`, error);
	} else {
		console.log(`${targetBranch} branch pushed successfully`);
		console.log(success);
	}
}

const sendMail = () => {
	console.log('Merge completed');
};

const pullAndMerge = () => {

	git.checkout(sourceBranch, checkoutSourceBranch)
		.pull('origin', sourceBranch, {}, pullSourceBranch)
		.checkout(targetBranch, checkoutTargetBranch)
		.pull('origin', targetBranch, {}, pullTargetBranch)
		.mergeFromTo(sourceBranch, targetBranch, ['--no-ff', '-m "Pulling changed from develop"'], mergeBrances)
		.push('origin', targetBranch, pushTargetBranch)
		.then(sendMail);
};

console.log('************************************');
console.log(`Merging branches @ ${new Date()}`);
console.log('************************************');
console.log('Source branch: ', process.env.source);
console.log('Target branch: ', process.env.target);
console.log();
pullAndMerge();
console.log('************************************');