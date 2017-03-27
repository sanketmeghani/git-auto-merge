import simpleGit from 'simple-git';

const git = simpleGit();

const workingDir = process.env.workingDir;
const sourceBranch = process.env.sourceBranch;
const targetBranch = process.env.targetBranch;

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

	git.cwd(workingDir)
		.checkout(sourceBranch, checkoutSourceBranch)
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
console.log(`Working directory: ${workingDir}`);
console.log(`Source branch: ${sourceBranch}`);
console.log(`Target branch: ${targetBranch}`);
console.log('------------------------------------');
console.log();
pullAndMerge();
console.log('************************************');