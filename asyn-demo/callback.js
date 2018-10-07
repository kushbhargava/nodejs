console.log('Before');
getUser(1, getRepository);
console.log('After');

function getRepository(user) {
    console.log('User ', user);
    getRepository(user.gitHubUserName, getCommits);
}

function getCommits(repos) {
    console.log('Repos:', repos);
    getCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
    console.log('Commits:', commits);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Getting the user from Database....');
        callback({ id: id, gitHubUserName: 'Kush' });
    }, 2000);
}

function getRepository(userName, callback) {
    setTimeout(() => {
        console.log('Finding user repo...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

function getCommits(repoName, callback) {
    setTimeout(() => {
        console.log('Getting repo commits...');
        callback(['commit1', 'commit2', 'commit3']);
    }, 2000);
}