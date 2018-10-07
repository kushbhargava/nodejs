console.log('Before');

getUser(1)
    .then(user => getRepositories(user.gitHubUserName))
    .then(repos => getCommit(repos[0]))
    .then(commits => console.log('Commits:', commits))
    .catch(result => console.log('oopss....Some error occured : ', result.message));

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting the user from Database....');
            resolve({ id: id, gitHubUserName: 'Kush' });
        }, 2000);
    });
}

function getRepositories(userName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Finding user repo...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommit(repoName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting repo commits...');
            resolve(['commit1', 'commit2', 'commit3']);
        }, 2000);
    });
}